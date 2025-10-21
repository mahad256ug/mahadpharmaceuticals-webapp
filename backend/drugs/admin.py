from django.contrib import admin
from django.utils.html import format_html
from .models import Drug


@admin.register(Drug)
class DrugAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "view_price", "created_at", "thumbnail_tag")
    search_fields = ("name", "description")
    list_filter = ("view_price", "created_at")
    readonly_fields = ("created_at", "updated_at", "thumbnail_preview")

    def thumbnail_tag(self, obj):
        if obj.thumbnail:
            return format_html(
                '<img src="{}" width="50" height="50" style="object-fit:cover; border-radius:5px;"/>',
                obj.thumbnail.url,
            )
        return "-"

    thumbnail_tag.short_description = "Image"

    def thumbnail_preview(self, obj):
        if obj.thumbnail:
            return format_html(
                '<img src="{}" width="150" style="object-fit:cover; border-radius:10px;"/>',
                obj.thumbnail.url,
            )
        return "No Image"

    thumbnail_preview.short_description = "Preview"
