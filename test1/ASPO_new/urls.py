
from django.conf.urls import url
from . import views

# for static files
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'home', views.home, name='home'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)