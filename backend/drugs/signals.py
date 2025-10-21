from django.core.cache import cache
from django.dispatch import receiver
from django.db.models.signals import post_save, post_delete

from .models import Drug


@receiver([post_delete, post_save], sender=Drug)
def invalidate_drugs_cache(sender, instance, **kwargs):
    """
    Invalidate all the cache in memoery
    """
    cache.delete_pattern("*drug*")
