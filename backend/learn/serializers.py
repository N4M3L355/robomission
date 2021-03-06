import json
from django.contrib.auth import login
from django.contrib.auth.models import User
from lazysignup.utils import is_lazy_user
from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from learn.domain import get_domain
from learn.mastery import get_level
from learn.models import Block, Toolbox, Task, Instruction
from learn.models import Action, ProgramSnapshot, Student, TaskSession
from learn.models import Teacher, Classroom
from learn.models import ProblemSet, Domain
from learn.users import convert_lazy_user, is_initial_user


class UserSerializer(serializers.HyperlinkedModelSerializer):
    nickname = serializers.CharField(read_only=True, source='first_name')
    created = serializers.SerializerMethodField()
    is_lazy = serializers.SerializerMethodField()
    student = serializers.HyperlinkedRelatedField(
        view_name='student-detail',
        read_only=True)
    teacher = serializers.HyperlinkedRelatedField(
        view_name='teacher-detail',
        read_only=True)

    class Meta:
        model = User
        fields = (
            'id', 'url', 'username', 'email', 'nickname',
            'is_staff', 'is_lazy', 'created',
            'student', 'teacher')

    def get_is_lazy(self, user):
        # TODO: rename to is_anonymous
        return is_lazy_user(user) or user.is_anonymous() or is_initial_user(user)

    def get_created(self, user):
        return not is_initial_user(user)


class LazyRegisterSerializer(RegisterSerializer):
    """Extends RegisterSerializer to convert lazy users to registered users.
    """
    def custom_signup(self, request, user):
        if is_lazy_user(request.user):
            lazy_user = request.user
            convert_lazy_user(lazy_user, user)


class OrderedListSerializer(serializers.ListSerializer):
    """Infers order attribute from the position of each instance in the list.
    """
    order_start = 0

    def validate(self, data):
        for i in range(len(data)):
            data[i]['order'] = self.order_start + i
        return data


class SettableListSerializer(serializers.ListSerializer):
    """Allows to set new instances for a domain manager.
    """
    relationship_fields = None
    # TODO: add single_relationship_fields if needed

    def set(self, manager, initial_data):
        """Create or update instances of given manager according to data.
        Assumes not-validated initial_data.
        """
        data = self.validate(initial_data)
        # First set instances without relationships, then with them.
        if self.relationship_fields:
            self._set(manager, data, ignore_fields=self.relationship_fields)
        return self._set(manager, data)

    def _set(self, manager, data, ignore_fields=None):
        # Assumes validated data.
        instance_map = {
            instance.id: instance
            for instance in manager.model.objects.all()}
        current_instances = []
        for instance_data in data:
            if ignore_fields:
                # Temporarily remove relationship fields to avoid attempts to
                # create a relatihonship to an object that does not yet exist.
                # Using dict comprehension to preserve the original dictionary
                # untouched for the 2nd pass.
                instance_data = {
                    key:value for key, value in instance_data.items()
                    if key not in ignore_fields}
            instance = instance_map.get(instance_data['id'], None)
            serializer = self.child.__class__(instance=instance, data=instance_data)
            serializer.is_valid(raise_exception=True)
            instance = serializer.save()
            current_instances.append(instance)
        manager.set(current_instances)
        return current_instances


class SettableOrderedListSerializer(SettableListSerializer, OrderedListSerializer):
    pass


class BlockSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()  # defined explicitly to make it writable
    name = serializers.SlugField(validators=[])
    order = serializers.IntegerField(default=int)

    class Meta:
        model = Block
        fields = ('id', 'name', 'order')
        list_serializer_class = SettableOrderedListSerializer


class ToolboxSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()  # defined explicitly to make it writable
    # Don't check uniqueness of name is needed to allow multiple update of
    # existing toolboxes.
    name = serializers.SlugField(validators=[])
    blocks = serializers.SlugRelatedField(
        slug_field='name',
        many=True,
        queryset=Block.objects.all())

    class Meta:
        model = Toolbox
        fields = ('id', 'name', 'blocks')
        list_serializer_class = SettableListSerializer


class InstructionSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()  # defined explicitly to make it writable
    order = serializers.IntegerField(default=int)

    class Meta:
        model = Instruction
        fields = ('id', 'name', 'order')
        list_serializer_class = SettableOrderedListSerializer


class SettingSerializer(serializers.Serializer):
    toolbox = serializers.CharField(required=False)
    fields = serializers.CharField(required=False)
    energy = serializers.IntegerField(required=False)
    length = serializers.IntegerField(required=False)


class TaskSerializer(serializers.ModelSerializer):
    # Id, section, setting, and solution are defined explicitly to make them writable.
    id = serializers.IntegerField()
    section = serializers.CharField(required=False)
    setting = SettingSerializer(required=False)
    solution = serializers.CharField(required=False)
    problemset = serializers.SlugRelatedField(
        slug_field='name',
        many=False,
        required=False,
        queryset=ProblemSet.objects.all())

    class Meta:
        model = Task
        fields = (
            'id', 'name', 'section', 'levels', 'level', 'order', 'problemset',
            'setting', 'solution')
        list_serializer_class = SettableListSerializer

    # We need explicit create method to allow for nested writes (setting field).
    def create(self, validated_data):
        return Task.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.section = validated_data.get('section', instance.section)
        instance.setting = validated_data.get('setting', instance.setting)
        instance.solution = validated_data.get('solution', instance.solution)
        ps = validated_data.pop('problemset', None)  # name or instance?
        instance.problemset = ps
        instance.save()
        return instance


#class ContentSerializer(serializers.Serializer):
#    setting = SettingSerializer(required=False)
#    solution = serializers.CharField(required=False)


#class ProblemSetListSerializer(SettableOrderedListSerializer):
class ProblemSetListSerializer(SettableListSerializer):
    relationship_fields = ['parts']


class ProblemSetSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()  # defined explicitly to make it writable
    section = serializers.CharField(required=False) # defined explicitly to make it writable
    name = serializers.SlugField(validators=[])
    parent = serializers.SlugRelatedField(
        slug_field='name',
        many=False,
        required=False,
        queryset=ProblemSet.objects.all())
    #content = ContentSerializer(read_only=True, required=False)
    setting = SettingSerializer(required=False)
    parts = serializers.SlugRelatedField(
        slug_field='name',
        many=True,
        queryset=ProblemSet.objects.all(),
        default=list)
    tasks = serializers.SlugRelatedField(
        slug_field='name',
        many=True,
        queryset=Task.objects.all(),
        default=list)

    class Meta:
        model = ProblemSet
        fields = (
            'id', 'name', 'granularity', 'section', 'level', 'order',
            'setting', 'parent', 'parts', 'tasks')
        list_serializer_class = ProblemSetListSerializer

    def create(self, validated_data):
        # After validation, tasks and parts are already DB entities, not names.
        tasks = validated_data.pop('tasks', None)
        parts = validated_data.pop('parts', None)
        ps = ProblemSet.objects.create(**validated_data)
        if tasks:
            ps.set_tasks(tasks)
        if parts:
            ps.set_parts(parts)
        return ps
        #task_names = validated_data.pop('tasks', None)
        #part_names = validated_data.pop('parts', None)
        #ps = ProblemSet.objects.create(**validated_data)
        #if task_names:
        #    tasks = [Task.objects.get(name=name) for name in task_names]
        #    ps.tasks.set(tasks)
        #if part_names:
        #    parts = [ProblemSet.objects.get(name=name) for name in part_names]
        #    ps.parts.set(parts)
        #return ps

    def update(self, instance, validated_data):
        instance.refresh_from_db()
        instance.name = validated_data.get('name', instance.name)
        instance.section = validated_data.get('section', instance.section)
        instance.granularity = validated_data.get(
            'granularity', instance.granularity)
        instance.setting = validated_data.get('setting', instance.setting)
        task_names = validated_data.pop('tasks', None)
        part_names = validated_data.pop('parts', None)
        instance.save()
        if task_names:
            tasks = [Task.objects.get(name=name) for name in task_names]
            instance.set_tasks(tasks)
        if part_names:
            parts = [ProblemSet.objects.get(name=name) for name in part_names]
            # TODO: Only squeeze sections once after the complete list
            # of PS is serialized.
            instance.set_parts(parts, squeeze_sections=True)
        return instance


class DomainSerializer(serializers.ModelSerializer):
    name = serializers.SlugField()
    blocks = BlockSerializer(many=True)
    toolboxes = ToolboxSerializer(many=True)
    tasks = TaskSerializer(many=True)
    problemsets = ProblemSetSerializer(many=True)
    instructions = InstructionSerializer(many=True, default=list)

    class Meta:
        model = Domain
        fields = ('name', 'blocks', 'toolboxes', 'tasks', 'problemsets',
                  'instructions')

    def create_or_update(self, data):
        # Call directly without validation!
        domain, _created = Domain.objects.get_or_create(name=data['name'])
        BlockSerializer(many=True).set(domain.blocks, data['blocks'])
        ToolboxSerializer(many=True).set(domain.toolboxes, data['toolboxes'])
        TaskSerializer(many=True).set(domain.tasks, data['tasks'])
        ProblemSetSerializer(many=True).set(domain.problemsets, data['problemsets'])
        InstructionSerializer(many=True).set(
            domain.instructions, data.get('instructions', []))
        return domain


class TeacherSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(
        view_name='user-detail',
        read_only=True,
        required=False)
    classrooms = serializers.SlugRelatedField(
        slug_field='name',
        many=True,
        queryset=Classroom.objects.all())

    class Meta:
        model = Teacher
        fields = ('id', 'url', 'user', 'classrooms')


class StudentSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(
        view_name='user-detail',
        read_only=True,
        required=False)
    credits = serializers.IntegerField(read_only=True)
    level = serializers.SerializerMethodField()
    seen_instructions = serializers.SlugRelatedField(
        slug_field='name',
        many=True,
        read_only=True)
    classroom = serializers.SlugRelatedField(
        slug_field='name',
        queryset=Classroom.objects.all())
    practice_overview = serializers.HyperlinkedIdentityField(
        view_name='student-practice-overview')
    start_task = serializers.HyperlinkedIdentityField(
        view_name='student-start-task')
    edit_program = serializers.HyperlinkedIdentityField(
        view_name='student-edit-program')
    run_program = serializers.HyperlinkedIdentityField(
        view_name='student-run-program')
    start_task = serializers.HyperlinkedIdentityField(
        view_name='student-start-task')
    watch_instruction = serializers.HyperlinkedIdentityField(
            view_name='student-watch-instruction')

    class Meta:
        model = Student
        fields = (
            'url', 'user', 'credits', 'level', 'seen_instructions',
            'classroom', 'practice_overview',
            'start_task', 'edit_program', 'run_program', 'watch_instruction')

    def get_level(self, student):
        domain = get_domain()
        level = get_level(domain, student)
        return level


class TaskSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskSession
        fields = ('id', 'student', 'task', 'solved', 'start', 'end')
        read_only_fields = ('student', 'solved', 'start', 'end')
        # Student field is made read-only as it should be determined by the
        # current user and passed by TaskSessionsViewSet.perform_create().
        # Note that the serializer is currently not used (but will if we will
        # enable student to see history of their past attempts).


class StudentTaskSerializer(serializers.Serializer):
    name = serializers.CharField()
    attempted = serializers.BooleanField()
    solved = serializers.BooleanField()
    time = serializers.IntegerField()  # number of seconds


class StudentSkillSerializer(serializers.Serializer):
    name = serializers.CharField()
    value = serializers.FloatField()


class RecommendationSerializer(serializers.Serializer):
    available = serializers.BooleanField()
    task = serializers.CharField(required=False, allow_null=True)
    phase = serializers.CharField(required=False, allow_null=True)
    mission = serializers.CharField(required=False, allow_null=True)
    levels = serializers.ListField(child=serializers.IntegerField(), required=False)


class PracticeOverviewSerializer(serializers.Serializer):
    level = serializers.IntegerField()
    mission = serializers.CharField(required=False, allow_null=True)
    phase = serializers.CharField(required=False, allow_null=True)
    credits = serializers.IntegerField()
    tasks = StudentTaskSerializer(many=True)
    skills = StudentSkillSerializer(many=True)
    recommendation = RecommendationSerializer()


class ProgressSerializer(serializers.Serializer):
    chunk = serializers.CharField()
    skill = serializers.FloatField()


class RunProgramResponseSerializer(serializers.Serializer):
    correct = serializers.BooleanField()
    progress = ProgressSerializer(required=False, many=True)
    recommendation = RecommendationSerializer(required=False)
