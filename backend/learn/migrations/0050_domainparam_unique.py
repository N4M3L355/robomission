# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-05-13 15:10
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('learn', '0049_chunk_levels'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='domainparam',
            unique_together=set([('domain', 'name', 'chunk')]),
        ),
    ]