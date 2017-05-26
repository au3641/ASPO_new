from .settings_common import *
try:
    from ASPO_django.settings_secret import *
except Exception, e:
    import traceback
    traceback.print_exc()
    print("Remember to copy settings_secret-example.py into settings_secret.py and change the secret key!")
    exit(1)

