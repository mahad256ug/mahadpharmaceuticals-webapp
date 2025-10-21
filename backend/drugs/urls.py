from . import views
from django.urls import path

urlpatterns = [
    path("drugs/", views.DrugsListView.as_view(), name="drug-list"),
    path(
        "drugs/home-featured/",
        views.HomeFeaturedDrugsView.as_view(),
        name="home-featured-drugs",
    ),
    path("drugs/home/", views.HomeDrugsView.as_view(), name="home-drugs"),
    path("drugs/<slug:slug>/", views.DrugDetailView.as_view(), name="drug-detail"),
]
