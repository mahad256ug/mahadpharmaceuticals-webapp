import os
from typing import Iterable
import uuid
from django.db import models

from django.utils.text import slugify


def upload_thumbnail(instance, filename):
    # generate unique filename
    ext = filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join("drugs", "thumbnails", filename)


class Drug(models.Model):
    class Status(models.TextChoices):
        DRAFT = "draft", "Draft"
        PUBLIC = "public", "Public"

    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)

    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    view_price = models.BooleanField(default=False)
    featured = models.BooleanField(default=False)
    thumbnail = models.ImageField(upload_to=upload_thumbnail, null=True, blank=True)
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.DRAFT,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.name and not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
