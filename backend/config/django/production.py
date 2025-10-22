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
