from rest_framework import serializers
from .models import Drug


class DrugSerializer(serializers.ModelSerializer):
    thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = Drug
        fields = "__all__"

    def get_thumbnail(self, obj):
        request = self.context.get("request")

        if obj.thumbnail:
            thumbnail_url = obj.thumbnail.url
            if request is not None:
                return request.build_absolute_uri(thumbnail_url)
            return thumbnail_url

        return None
