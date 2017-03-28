from django.db import models

# Create your models here.
class Testis(models.Model):
    velikost = models.IntegerField(default=0)

class Questions(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    text = models.TextField()
    sequence = models.IntegerField()
    type = models.IntegerField()

class Question_answers(models.Model):
    answer_id = models.IntegerField(primary_key=True)
    text = models.TextField()
    flag = models.IntegerField()
    order_nr = models.IntegerField()
    question_id = models.IntegerField()

class depend(models.Model):
    answer_id = models.ForeignKey(Question_answers, on_delete=models.CASCADE)
