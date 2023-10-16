from django.contrib.auth import logout
from django.shortcuts import render
from django.core.paginator import Paginator
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework import viewsets, status
from app.models import NewUser , Devices,Area,DeviceType,DeviceUser,DeviceBrand,Task,DevicesGroup
from rest_framework.response import Response
from app.serializers import UserSerializer ,DevicesSerializer,AreaSerializer,DeviceTypeSerializer,DeviceUserSerializer,DeviceUserNopassSerializer,DeviceBrandSerializer,TaskSerializer
from app.serializers import DevicesGroupSerializer
from django.db.models import Q
from django.http import HttpResponse,FileResponse,HttpResponseNotFound
from rest_framework import filters
from scripts.autoconfig import defautoconfig
from scripts.backupconfig import backupconfig
from scripts.findmac import findmac_main,findmac_changeinterface
import os
from django.db.models import Q


class NewPageNumberPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 1000
    # def get_paginated_response(self, data):
    #     if self.request.method == 'GET' and not self.request.GET:
    #         # 如果是 GET 请求且未传入参数，则返回所有数据
    #         return Response(data)
    #     else:
    #         # 否则，返回分页数据
    #         return super().get_paginated_response(data)
    
class UserInfoViewSet(viewsets.ViewSet):
    queryset = NewUser.objects.all().order_by('-date_joined')
    http_method_names = ['get']

    def list(self, request, *args, **kwargs):
        user_info = NewUser.objects.filter(id=request.user.id).values()[0]
        role = request.user.roles
        if role == 0:
            user_info['roles'] = ['admin']
        else:
            user_info['roles'] = ['user']

        return Response(user_info)

class UserViewSet(viewsets.ModelViewSet):
    queryset = NewUser.objects.all()
    serializer_class = UserSerializer
    def list(self, request, *args, **kwargs):
        user = request.user
        # if 'roles' in user and user.roles == 1:
        #         self.queryset = self.queryset.filter(~Q(username='admin'))
        self.queryset = self.queryset.filter(~Q(username='admin'))
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class DeviceTypeViewSet(viewsets.ModelViewSet):
    queryset = DeviceType.objects.all()
    serializer_class = DeviceTypeSerializer

class DeviceBrandViewSet(viewsets.ModelViewSet):
    queryset = DeviceBrand.objects.all()
    serializer_class = DeviceBrandSerializer

class DeviceUserViewSet(viewsets.ModelViewSet):
    queryset = DeviceUser.objects.all()
    serializer_class = DeviceUserSerializer
    def list(self, request, *args, **kwargs):
        # get隐藏password字段
        self.serializer_class = DeviceUserNopassSerializer
        return super().list(request, *args, **kwargs)

class AreaViewSet(viewsets.ModelViewSet):
    queryset = Area.objects.all()
    serializer_class = AreaSerializer

    def perform_destroy(self, instance):
        instance.delete()

class DevicesViewSet(viewsets.ModelViewSet):
    queryset = Devices.objects.all()
    serializer_class = DevicesSerializer
    pagination_class = NewPageNumberPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['ip', 'name','area__name','device_brand__name']
    
    def perform_create(self, serializer):
        """多条件查询  search用逗号隔开"""
        instance = serializer.save()
        return super().perform_create(serializer)
    
    def get_queryset(self):
        """get可带area_id参数"""
        queryset = Devices.objects.all()
        # if self.request.method == 'GET' and not self.request.GET:
        #     # 如果是 GET 请求且未传入参数，则返回所有数据
        #     print('1111')
        #     return self.queryset.all()
        # else:
        area_id = self.request.query_params.get('area_id', None) # 获取区域参数
        if area_id != None and area_id != '':
            queryset = queryset.filter(area_id=area_id)
        device_brand_id = self.request.query_params.get('device_brand_id', None) 
        if device_brand_id != None and device_brand_id != '':
            queryset = queryset.filter(device_brand_id=device_brand_id)
        device_type_id = self.request.query_params.get('device_type_id', None) 
        if device_type_id != None and device_type_id != '':
            queryset = queryset.filter(device_type_id=device_type_id)
        return queryset


def logout_view(request):
    logout(request)
    return HttpResponse({'message': '注销成功'})

class AutoconfigViewSet(APIView):
    def post(self,request):
        deviceid = request.data.get('deviceid')
        commits = request.data.get('commits').split('\n')
        results = defautoconfig(deviceid,commits)
        return Response({'status': results}, status=status.HTTP_201_CREATED)
    
class ConfBakList(APIView):
    def get(self, request, ip_address):
        log_dir = os.path.join(settings.BASE_DIR,  'data', 'backup', ip_address)

        # 检查目录是否存在
        if not os.path.isdir(log_dir):
            # return HttpResponseNotFound(f'Directory {log_dir} not found!')
            return Response({'status': f'Directory {log_dir} not found!'}, status=status.HTTP_400_BAD_REQUEST)

        # 构建文件列表
        file_list = []
        for filename in sorted(os.listdir(log_dir), reverse=True):
            filepath = os.path.join(log_dir, filename)
            if os.path.isfile(filepath):
                file_list.append({
                    'name': filename,
                    'size': os.path.getsize(filepath),
                })

        return Response(file_list)

class ConfBakDetail(APIView):
    def get(self, request, ip_address, filename):
        log_dir = os.path.join(settings.BASE_DIR, 'data', 'backup', ip_address)
        filepath = os.path.join(log_dir, filename)

        # 检查文件是否存在
        if not os.path.isfile(filepath):
            # return HttpResponseNotFound(f'File {filename} not found!')
            return Response({'status': f'File {filename} not found!'}, )

        # 返回文件内容
        return FileResponse(open(filepath, 'rb'), content_type='text/plain')

class BackupConifg(APIView):
    def post(self,request):
        deviceid = request.data.get('deviceid')
        backtype = request.data.get('backtype')
        devicegroupid = request.data.get('devicegroupid')
        if devicegroupid in [None, '']:
            result = backupconfig(backtype,deviceid=deviceid)
        if deviceid in [None, '']:
            result = backupconfig(backtype,devicegroupid=devicegroupid)
        return Response(result)
    
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class DevicesGroupViewSet(viewsets.ModelViewSet):
    queryset = DevicesGroup.objects.all()
    serializer_class = DevicesGroupSerializer

#-------------findmac-------------------

class FindMac(APIView):
    def post(self,request):
        devicegroupid = request.data.get('devicegroupid')
        mac_add = request.data.get('mac_add')
        if mac_add in [None, ''] or devicegroupid in [None, '']:
            return Response({'status':'error',
                       'message':'设备组和MAC地址不能为空'})
        result = findmac_main(devicegroupid,mac_add)
        return Response(result)
class FindMacChangeInterface(APIView):
    def post(self,request):
        deviceid = request.data.get('deviceid')
        changetype = request.data.get('changetype')
        interface = request.data.get('interface')
        if deviceid in [None, ''] or changetype in [None, ''] or interface in [None, '']:
            return Response({'status':'error',
                       'message':'请先执行MAC查找和选择接口类型'})
        result = findmac_changeinterface(deviceid,interface,changetype)
        return Response(result)

#-----------findmac_end----------------

