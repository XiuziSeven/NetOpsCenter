from django.contrib.auth.models import User
from app.models import NewUser , Devices,Area,DeviceType,DeviceUser,DeviceBrand,Task,DevicesGroup
from rest_framework import serializers
# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = NewUser
        fields = [ 'username', 'email', 'is_staff']

class DevicesSerializer(serializers.HyperlinkedModelSerializer):
    area_id = serializers.PrimaryKeyRelatedField(queryset=Area.objects.all(), source='area')
    device_brand_id = serializers.PrimaryKeyRelatedField(queryset=DeviceBrand.objects.all(), source='device_brand',required=False)
    device_user_id = serializers.PrimaryKeyRelatedField(queryset=DeviceUser.objects.all(), source='device_user',allow_null=True,required=False)
    device_type_id = serializers.PrimaryKeyRelatedField(queryset=DeviceType.objects.all(), source='device_type')
    class Meta:
        model = Devices
        fields = ['id','name', 'ip','area_id','area_name','device_type_id','device_type_name','device_user_id','device_user_name','device_brand_id','device_brand_name']
        # fields = '__all__'
        
class AreaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Area
        fields = ['id','name',]
        
class DeviceTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = DeviceType
        fields = ['id','name',]
        
class DeviceUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = DeviceUser
        fields = ['id','name','username','password','ssh_port']

class DeviceUserNopassSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = DeviceUser
        fields = ['id','name','username','ssh_port']
        
class DeviceBrandSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = DeviceBrand
        fields = ['id','name','netmikotype']
        
class TaskSerializer(serializers.HyperlinkedModelSerializer):
    devices = serializers.PrimaryKeyRelatedField(many=True, queryset=Devices.objects.all())

    class Meta:
        model = Task
        fields = ['id', 'name', 'devices', ]

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        devices = []
        for device in instance.devices.all():
            device_info = {
                "id": device.id,
                "device_name": device.name
            }
            devices.append(device_info)
        ret['devices_info'] = devices
        return ret

    def create(self, validated_data):
        devices_data = validated_data.pop('devices', [])
        task = Task.objects.create(**validated_data)

        for device in devices_data:
            task.devices.add(device)

        return task

class DevicesGroupSerializer(serializers.HyperlinkedModelSerializer):
    devices = serializers.PrimaryKeyRelatedField(many=True,queryset=Devices.objects.all(), )
    class Meta:
        model = DevicesGroup
        fields = ['id','name','devices',]
    
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        devices = []
        for device in instance.devices.all():
            device_info = {
                "id": device.id,
                "device_name": device.name
            }
            devices.append(device_info)
        ret['devices_info'] = devices
        return ret
    
    def create(self, validated_data):
        devices_data = validated_data.pop('devices', [])
        devices_group = DevicesGroup.objects.create(**validated_data)

        for device in devices_data:
            devices_group.devices.add(device)
        return devices_group