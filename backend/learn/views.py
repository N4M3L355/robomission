from django.contrib.auth.models import User
from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from learn.models import Block, Toolbox, Student
from learn.permissions import IsOwnerOrStaff
from learn.serializers import BlockSerializer
from learn.serializers import StudentSerializer
from learn.serializers import ToolboxSerializer
from learn.serializers import UserSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class BlockViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Block.objects.all()
    serializer_class = BlockSerializer


class ToolboxViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Toolbox.objects.all()
    serializer_class = ToolboxSerializer


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwnerOrStaff)

    @detail_route(url_path='practice-overview')
    def practice_overview(self, request, *args, **kwargs):
        student = self.get_object()
        return Response(
            'there will be a practice overview for student {s}'.format(s=student))

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)