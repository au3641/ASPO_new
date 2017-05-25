from django.contrib import admin
from .models import *
from nested_inline.admin import NestedStackedInline, NestedModelAdmin
import nested_inline
# Register your models here.

class DisableInline(NestedStackedInline):
    model = Disable
    filter_horizontal = ('requiredAnswers',)

class AnswerInline(NestedStackedInline):
    model = Answer

class QuestionInline(NestedStackedInline):
    model = Question
    inlines = [AnswerInline,
               DisableInline]

class QuestionAdmin(NestedModelAdmin):
    inlines = [
        AnswerInline
    ]

class QuestionnaireAdmin(NestedModelAdmin):
    inlines = [
        QuestionInline
    ]


admin.site.register(Questionnaire, QuestionnaireAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Answer)
admin.site.register(Disable)
admin.site.register(User)
admin.site.register(AnswerWeight)

