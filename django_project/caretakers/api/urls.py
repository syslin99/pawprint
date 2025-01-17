from django.urls import path, include
from rest_framework_nested import routers

from .views import CaretakerViewSet, CaretakerPetsViewSet, CaretakerContactsViewSet


router = routers.DefaultRouter()
router.register(r'caretakers', CaretakerViewSet)

caretakers_router = routers.NestedDefaultRouter(router, r'caretakers', lookup='caretaker')
caretakers_router.register(r'pets', CaretakerPetsViewSet, basename='caretaker-pets')
caretakers_router.register(r'contacts', CaretakerContactsViewSet, basename='caretaker-contacts')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(caretakers_router.urls)),
]
