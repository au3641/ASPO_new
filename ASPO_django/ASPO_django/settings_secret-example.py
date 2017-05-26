import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Database
# https://docs.djangoproject.com/en/1.10/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.10/howto/static-files/

STATIC_URL = '/static/'

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'mm07l5xpt=1mvbq(0tgazuk$7aw-$*=h$9a)dmxbo8i0pb3zx3'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True