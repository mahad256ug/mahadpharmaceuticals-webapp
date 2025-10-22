from .base import *

from config.django.base import env


DEBUG = False

ALLOWED_HOSTS = [
    "mahadpharmaceuticals.com",
    "www.mahadpharmaceuticals.com",
    "127.0.0.1",
    "localhost",
]

CORS_ALLOWED_ORIGINS = [
    "https://mahadpharmaceuticals.com",
    "https://www.mahadpharmaceuticals.com",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# ------------------------
# ALLOWED FILE UPLOADS (optional)
# ------------------------
DATA_UPLOAD_MAX_MEMORY_SIZE = 5242880  # 5MB
FILE_UPLOAD_PERMISSIONS = 0o644


# ------------------------
# SECURITY HEADERS
# ------------------------
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECURE_HSTS_SECONDS = 31536000  # 1 year
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

SECURE_SSL_REDIRECT = True  # redirect HTTP → HTTPS
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
X_FRAME_OPTIONS = "DENY"
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
