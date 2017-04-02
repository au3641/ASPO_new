
from django.conf.urls import url, include
from rest_framework import routers
from . import views

# for static files
from django.conf import settings
from django.conf.urls.static import static


router = routers.DefaultRouter()
router.register(r'questions', views.QuestionViewSet)

urlpatterns = [
    # API
    url(r'^$', views.index, name='index'),
    # url(r'home', views.home, name='home'),
    # url(r'menu', views.menu, name='menu'),
    # url(r'footer', views.footer, name='footer'),
    url(r'^', include(router.urls)),
    url(r'^api', include('rest_framework.urls', namespace='rest_framework')),

    url(r'.*', views.any, name='any'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)