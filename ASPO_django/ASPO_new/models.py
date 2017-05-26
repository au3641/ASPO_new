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
    name = models.TextField(unique=True, max_length=255)
    introText = models.TextField(blank=True, null=True)
    consentQuestionText = models.TextField(blank=True, null=True)
    consentAcceptText = models.TextField(blank=True, null=True)
    consentRefuseText = models.TextField(blank=True, null=True)
    consentShowOrder = models.IntegerField(blank=True, null=True)


class Question(models.Model):
    def  __str__( self ):
        try:
            return "QUESTIONNAIRE: {0} | QUESTION: {1} | ORDER: {2}".format(
                self.questionnaire.name,
                self.text,
                self.order,
            )
        except:
            return "QUESTIONNAIRE: {0} | QUESTION: {1} | ORDER: {2}".format(
                "questionnaire does not exist",
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
        try:
            return "ORDER: {0} | QUESTION: {1} | ANSWER: {2}".format(
                self.order,
                self.question.text,
                self.text,
            )
        except:
            return "ORDER: {0} | QUESTION: {1} | ANSWER: {2}".format(
                self.order,
                "question does not exist",
                self.text,
            )
    question = models.ForeignKey(Question)
    text = models.TextField(blank=True, null=True)
    order = models.IntegerField(blank=True, null=True)


class Comment(models.Model):
    def __str__(self):
        try:
            return "QUESTION: {0} | TEXT: {1}".format(
                self.question.text,
                self.text,
            )
        except:
            return "QUESTION: {0} | TEXT: {1}".format(
                "question does not exist",
                self.text,
            )
    question = models.ForeignKey(Question)
    text = models.TextField(blank=True, null=True)


class Disable(models.Model):
    def  __str__( self ):
        rq_texts = ""
        ra_texts = ""

        for ra in self.requiredAnswers.all():
            try:
                rq_texts.join(ra.question.text)
            except:
                rq_texts.join("question does not exist")
            try:
                ra_texts.join(ra.text)
            except:
                ra_texts.join("answer does not exist")

        return "DISABLE: {0} | IF ON QUESTION: {1} | ANSWERED WITH: {2}".format(
            self.question.text,
            rq_texts,
            ra_texts
        )
    question = models.ForeignKey(Question)
    requiredAnswers = models.ManyToManyField(Answer)


class User(models.Model):
    def __str__(self):
        aq_texts = ""
        a_texts = ""

        for a in self.answeredWith.all():
            try:
                aq_texts.join(a.question.text)
            except:
                aq_texts.join("question does not exist")
            try:
                a_texts.join(a.text)
            except:
                a_texts.join("answer does not exist")

        return "ID: {0} | ON QUESTION: {1} | ANSWERED WITH: {2}".format(
            self.pk,
            aq_texts,
            a_texts,
        )
    answeredWith = models.ManyToManyField(Answer)


class AnswerWeight(models.Model):
    def __str__(self):

        aqt = ""
        ant = ""

        try:
            aqt = self.answer.question.text
        except:
            aqt = "question does not exist"
        try:
            ant = self.answer.text
        except:
            ant = "answer does not exist"

        return "TYPE: {0} | VALUE: {1} | QUESTION: {2} | WEIGHT FOR ANSWER: {3}".format(
            self.type,
            self.value,
            aqt,
            ant,
        )
    answer = models.ForeignKey(Answer)
    type = models.TextField(blank=True, null=True)
    value = models.FloatField(blank=True, null=True)
