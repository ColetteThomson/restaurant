# set the API endpoints
# routers are used with ViewSets in DRF to autoconfig the urls

from rest_framework import routers
from menu.viewsets import MenuViewSet
router = routers.SimpleRouter()
router.register(r'menu', MenuViewSet, basename='menu')
