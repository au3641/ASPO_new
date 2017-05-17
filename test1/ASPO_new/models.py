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
    def __str__(self):
        return "{0} - {1}".format(
            self.name,
            self.introText,
        )
    name = models.TextField(unique=True)
    introText = models.TextField(blank=True, null=True)
    consentQuestionText = models.TextField(blank=True, null=True)
    consentAcceptText = models.TextField(blank=True, null=True)
    consentRefuseText = models.TextField(blank=True, null=True)
    consentShowOrder = models.IntegerField(blank=True, null=True)


class Question(models.Model):
    def  __str__( self ):
        return "QUESTIONNAIRE: {0} | QUESTION: {1} | ORDER: {2}".format(
            self.questionnaire.name,
            self.text,
            self.order,
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
        return "ORDER: {0} | QUESTION: {1} | ANSWER: {2}".format(
            self.order,
            self.question.text,
            self.text,
        )
    question = models.ForeignKey(Question)
    text = models.TextField(blank=True, null=True)
    order = models.IntegerField(blank=True, null=True)


class Comment(models.Model):
    def __str__(self):
        return "QUESTION: {0} | TEXT: {1}".format(
            self.question.text,
            self.text,
        )
    question = models.ForeignKey(Question)
    text = models.TextField(blank=True, null=True)


class Disable(models.Model):
    def  __str__( self ):
        return "DISABLE: {0} | IF ON QUESTION: {1} | ANSWERED WITH: {2}".format(
            self.question.text,
            "".join(ra.question.text for ra in self.requiredAnswers.all()),
            "".join(ra.text for ra in self.requiredAnswers.all())
        )
    question = models.ForeignKey(Question)
    requiredAnswers = models.ManyToManyField(Answer)


class User(models.Model):
    def __str__(self):
        return "ID: {0} | ON QUESTION: {1} | ANSWERED WITH: {2}".format(
            self.pk,
            "".join(a.question.text for a in self.answeredWith.all()),
            "".join(a.text for a in self.answeredWith.all()),
        )
    answeredWith = models.ManyToManyField(Answer)


class AnswerWeight(models.Model):
    def __str__(self):
        return "TYPE: {0} | VALUE: {1} | QUESTION: {2} | WEIGHT FOR ANSWER: {3}".format(
            self.type,
            self.value,
            self.answer.question.text,
            self.answer.text,
        )
    answer = models.ForeignKey(Answer)
    type = models.TextField(blank=True, null=True)
    value = models.FloatField(blank=True, null=True)
