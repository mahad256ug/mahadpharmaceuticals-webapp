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
FILE_UPLOAD_PERMISSIONS = 644


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


REST_FRAMEWORK = {
    "DEFAULT_RENDERER_CLASSES": ("rest_framework.renderers.JSONRenderer",),
    "DEFAULT_PARSER_CLASSES": ("rest_framework.parsers.JSONParser",),
    "DEFAULT_THROTTLE_CLASSES": [
        "rest_framework.throttling.AnonRateThrottle",
    ],
    "DEFAULT_THROTTLE_RATES": {
        "anon": "100/min",
        "user": "0/min",
    },
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 40,
}


SESSION_COOKIE_AGE = 900  # 15 minutes

# Optional: Reset expiry timer on each request (keep user active)
SESSION_SAVE_EVERY_REQUEST = True


DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": env("DB_NAME"),
        "USER": env("DB_USER"),
        "HOST": env("DB_HOST"),
        "PASSWORD": env("DB_PASSWORD"),
        "PORT": env("DB_PORT"),
    }
}
