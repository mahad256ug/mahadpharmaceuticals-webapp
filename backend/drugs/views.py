import time
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from rest_framework import permissions, generics, filters


from .models import Drug
from .serializers import DrugSerializer


class DrugsListView(generics.ListAPIView):
    """
    List all public drugs (paginated).
    Supports optional filters later.
    """

    serializer_class = DrugSerializer
    permission_classes = [permissions.AllowAny]

    # 🔍 enable DRF search filter backend
    filter_backends = [filters.SearchFilter]
    search_fields = ["name", "description"]

    search_param = "search_query"

    @method_decorator(cache_page(60 * 2, key_prefix="drugs-list"))
    def dispatch(self, *args, **kwargs):
        """
        Wrap the whole view (not just queryset) with cache_page.
        This ensures pagination, filtering, and search results are cached too.
        """
        return super().dispatch(*args, **kwargs)

    def get_queryset(self):
        return Drug.objects.filter(status=Drug.Status.PUBLIC).order_by("-created_at")


class HomeFeaturedDrugsView(generics.ListAPIView):
    """
    Return top 4 featured public drugs (for homepage).
    """

    pagination_class = None
    serializer_class = DrugSerializer
    permission_classes = [permissions.AllowAny]

    @method_decorator(cache_page(60 * 2, key_prefix="drugs-ft-home"))
    def dispatch(self, *args, **kwargs):
        """
        Wrap the whole view (not just queryset) with cache_page.
        This ensures pagination, filtering, and search results are cached too.
        """
        return super().dispatch(*args, **kwargs)

    def get_queryset(self):
        drugs = Drug.objects.filter(status=Drug.Status.PUBLIC, featured=True).order_by(
            "-created_at"
        )[:4]
        return drugs


class HomeDrugsView(generics.ListAPIView):
    """
    Return top 4 non-featured public drugs (for homepage display).
    """

    pagination_class = None
    serializer_class = DrugSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @method_decorator(cache_page(60 * 2, key_prefix="drugs-home"))
    def dispatch(self, *args, **kwargs):
        """
        Wrap the whole view (not just queryset) with cache_page.
        This ensures pagination, filtering, and search results are cached too.
        """
        return super().dispatch(*args, **kwargs)

    def get_queryset(self):
        drugs = Drug.objects.filter(status=Drug.Status.PUBLIC, featured=False).order_by(
            "-created_at"
        )[:4]
        return drugs


class DrugDetailView(generics.RetrieveAPIView):
    """
    Retrieve a single drug by Slug.
    """

    lookup_field = "slug"
    queryset = Drug.objects.all()
    serializer_class = DrugSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @method_decorator(cache_page(60 * 2, key_prefix="drugs-detail"))
    def dispatch(self, *args, **kwargs):
        """
        Wrap the whole view (not just queryset) with cache_page.
        This ensures pagination, filtering, and search results are cached too.
        """
        return super().dispatch(*args, **kwargs)
