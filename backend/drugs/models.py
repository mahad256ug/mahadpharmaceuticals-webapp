import os
import uuid
from django.db import models

from django.utils.text import slugify
import random
import string
from django.core.exceptions import ValidationError


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
    keywords = models.CharField(max_length=1500, null=True, blank=True)
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
        # Generate slug only if missing
        if self.name:
            base_slug = slugify(self.name)
            slug = base_slug
            count = 0

            # Ensure unique slug
            while Drug.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                count += 1
                random_suffix = "".join(
                    random.choices(string.ascii_lowercase + string.digits, k=4)
                )
                slug = f"{base_slug}-{random_suffix}"

                # Safety net: if something goes wrong, break after 10 attempts
                if count > 10:
                    raise ValidationError(
                        "Unable to generate a unique slug for this drug."
                    )

            self.slug = slug

        super().save(*args, **kwargs)
