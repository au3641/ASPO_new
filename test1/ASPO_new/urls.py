
from django.conf.urls import url, include
from rest_framework import routers
from . import views

# for static files
from django.conf import settings
from django.conf.urls.static import static


router = routers.DefaultRouter()
router.register(r'questionnaireASPO', views.QuestionnaireASPO)
router.register(r'questionsASPO', views.QuestionSetASPO) # get every question from ASPO questionnaire
router.register(r'answersASPO', views.AnswerSetForASPO)
router.register(r'disablesASPO', views.DisableForASPO)
router.register(r'answerWeightsASPO', views.AnswerWeightForASPO)

urlpatterns = [
    # API
    url(r'^$', views.index, name='index'),
    # url(r'home', views.home, name='home'),
    # url(r'menu', views.menu, name='menu'),
    # url(r'footer', views.footer, name='footer'),

    # REST rotuer urls
    url(r'^rest/', include(router.urls)),

    # REST views
    url(r'^api', include('rest_framework.urls', namespace='rest_framework')),

    # View for static pages
    url(r'.*', views.any, name='any'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)