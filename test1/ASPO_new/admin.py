from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Questionnaire)
admin.site.register(Question)
admin.site.register(Answer)
admin.site.register(Disable)
admin.site.register(User)
admin.site.register(AnswerWeight)
