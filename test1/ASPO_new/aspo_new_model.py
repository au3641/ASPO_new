# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.db import models

class Question(models.Model):
    idQuestion = models.IntegerField(primary_key=True)
    text = models.TextField(blank=True, null=True)
    questionType = models.TextField(blank=True, null=True)
    idGroup = models.IntegerField(blank=True, null=True)


class Answer(models.Model):
    idAnswer = models.IntegerField(primary_key=True)
    text = models.TextField(blank=True, null=True)
    answerColor = models.TextField(blank=True, null=True)
    idQuestion = models.ForeignKey(Question, on_delete=models.SET_NULL)


class Disable(models.Model):
    idDisable = models.IntegerField(primary_key=True)
    idOfQuestionToDisable = models.IntegerField(blank=True, null=True)
    idAnswer = models.ForeignKey(Answer, on_delete=models.SET_NULL)


class User(models.Model):
    idUser = models.IntegerField(primary_key=True)


class UserAnswers(models.Model):
    idAnswer = models.ForeignKey(Answer, on_delete=models.PROTECT)
    idQuestion = models.ForeignKey(Answer, on_delete=models.PROTECT)
    idUser = models.ForeignKey(User, on_delete=models.PROTECT)