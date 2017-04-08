# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals
from django.db import models



class Questionnaire(models.Model):
    name = models.TextField(unique=True)
    introText = models.TextField(blank=True, null=True)


class Question(models.Model):
    def  __str__( self ):
        return "{0}".format(
            self.text,
        )

    QUESTION_TYPES = (
        ('radio', 'radio'),
        ('checkbox', 'checkbox'),
        ('button', 'button'),
        ('date', 'date'),
        ('email', 'email'),
        ('number', 'number'),
        ('range', 'range'),
        ('time', 'time'),
        ('url', 'url'),
        ('text', 'text'),
    )
    questionnaire = models.ForeignKey(Questionnaire)
    text = models.TextField(blank=True, null=True)
    order = models.IntegerField(blank=True, null=True)
    type = models.CharField(
        max_length = 16, 
        choices=QUESTION_TYPES,
        default='radio',
    )


class Answer(models.Model):
    def  __str__( self ):
        return "{0}".format(
            self.text,
        )
    question = models.ForeignKey(Question)
    text = models.TextField(blank=True, null=True)
    order = models.IntegerField(blank=True, null=True)


class Disable(models.Model):
    def  __str__( self ):
        return "{0} {1}".format(
            self.question,
            ", ".join(self.requiredAnswers.all())
        )
    question = models.ForeignKey(Question)
    requiredAnswers = models.ManyToManyField(Answer)


class User(models.Model):
    answeredWith = models.ManyToManyField(Answer)


class AnswerWeight(models.Model):
    answer = models.ForeignKey(Answer)
    type = models.TextField(blank=True, null=True)
    value = models.FloatField(blank=True, null=True)
