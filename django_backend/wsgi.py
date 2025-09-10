import os
import sys
from django.core.wsgi import get_wsgi_application

# Add your project directory to the sys.path
sys.path.insert(0, os.path.dirname(__file__))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'abba_whispers.settings_prod')

application = get_wsgi_application()