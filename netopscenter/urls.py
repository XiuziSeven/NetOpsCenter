"""djangotest URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework import routers
from app.views import UserInfoViewSet,UserViewSet,DevicesViewSet,logout_view,AreaViewSet,DeviceTypeViewSet,DeviceUserViewSet,DeviceBrandViewSet,AutoconfigViewSet,ConfBakDetail,ConfBakList,BackupConifg,TaskViewSet
from app.views import FindMac,DevicesGroupViewSet,FindMacChangeInterface
from django.views.generic import TemplateView
router_V1 = routers.DefaultRouter()
router_V1.register('info', UserInfoViewSet)
router_V1.register('users', UserViewSet)
router_V1.register('devices', DevicesViewSet)
router_V1.register('area', AreaViewSet)
router_V1.register('devicetype', DeviceTypeViewSet)
router_V1.register('deviceuser', DeviceUserViewSet)
router_V1.register('devicebrand', DeviceBrandViewSet)
router_V1.register('task', TaskViewSet)
router_V1.register('devicesgroup', DevicesGroupViewSet)
urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
    path('api/', include(router_V1.urls)),
    path('admin/', admin.site.urls),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/logout/', logout_view),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/autoconfig/', AutoconfigViewSet.as_view()),
    path('api/confbak/', BackupConifg.as_view(),),
    path('api/confbak/<str:ip_address>/', ConfBakList.as_view(), name='confbak_list'),
    path('api/confbak/<str:ip_address>/<str:filename>/', ConfBakDetail.as_view(), name='confbak_detail'),
    path('api/findmac/', FindMac.as_view(),),
    path('api/findmacchangeinterface/', FindMacChangeInterface.as_view(),),
]
