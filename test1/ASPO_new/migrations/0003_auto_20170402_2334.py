# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-04-02 21:34
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ASPO_new', '0002_auto_20170402_2329'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='dependencies',
            table='dependencies',
        ),
        migrations.AlterModelTable(
            name='questionanswers',
            table='questionAnswers',
        ),
        migrations.AlterModelTable(
            name='questions',
            table='questions',
        ),
        migrations.AlterModelTable(
            name='useranswers',
            table='userAnswers',
        ),
    ]
