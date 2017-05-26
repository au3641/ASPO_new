# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-04-08 19:34
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(blank=True, null=True)),
                ('order', models.IntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='AnswerWeight',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.TextField(blank=True, null=True)),
                ('value', models.FloatField(blank=True, null=True)),
                ('answer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ASPO_new.Answer')),
            ],
        ),
        migrations.CreateModel(
            name='Disable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(blank=True, null=True)),
                ('order', models.IntegerField(blank=True, null=True)),
                ('type', models.CharField(choices=[('radio', 'radio'), ('checkbox', 'checkbox'), ('button', 'button'), ('date', 'date'), ('email', 'email'), ('number', 'number'), ('range', 'range'), ('time', 'time'), ('url', 'url'), ('text', 'text')], default='radio', max_length=16)),
            ],
        ),
        migrations.CreateModel(
            name='Questionnaire',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(unique=True, max_length=255)),
                ('introText', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answeredWith', models.ManyToManyField(to='ASPO_new.Answer')),
            ],
        ),
        migrations.AddField(
            model_name='question',
            name='questionnaire',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ASPO_new.Questionnaire'),
        ),
        migrations.AddField(
            model_name='disable',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ASPO_new.Question'),
        ),
        migrations.AddField(
            model_name='disable',
            name='requiredAnswers',
            field=models.ManyToManyField(to='ASPO_new.Answer'),
        ),
        migrations.AddField(
            model_name='answer',
            name='question',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ASPO_new.Question'),
        ),
    ]
