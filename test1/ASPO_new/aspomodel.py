# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.db import models


class Dependencies(models.Model):
    answer_id = models.IntegerField(primary_key=True)
    prev_question_id = models.IntegerField(primary_key=True)
    question_id = models.IntegerField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'dependencies'
        unique_together = (('answer_id', 'question_id', 'prev_question_id'),)


class QuestionAnswers(models.Model):
    answer_id = models.IntegerField(primary_key=True)
    text = models.TextField(blank=True, null=True)
    flag = models.IntegerField(blank=True, null=True)
    order_nr = models.IntegerField(blank=True, null=True)
    question_id = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'question_answers'


class Questions(models.Model):
    question_id = models.IntegerField(primary_key=True)
    text = models.TextField(blank=True, null=True)
    order_nr = models.IntegerField(unique=True, blank=True, null=True)
    type = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'questions'


class UserAnswers(models.Model):
    user_id = models.CharField(max_length=23, primary_key=True)
    question_id = models.IntegerField(blank=True, null=True)
    answer_id = models.IntegerField(blank=True, null=True)
    datetime = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_answers'
