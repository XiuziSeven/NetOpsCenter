from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import UserManager
from django.utils.translation import gettext_lazy as _


# Create your models here.

class NewUser(AbstractUser):

    role_type = [
        [0, 'admin'],
        [1, 'user'],
    ]

    roles = models.IntegerField(verbose_name='角色', choices=role_type, default=1)
    last_login = models.DateTimeField(_('last login'), blank=True, null=True, auto_now=True)
    #code = models.UUIDField(verbose_name='uuid', default=uuid.uuid4, editable=False)

    objects = UserManager()

    class Meta(AbstractUser.Meta):
        swappable = 'AUTH_USER_MODEL'
        pass
class Area(models.Model):
    name = models.CharField(max_length=50,unique=True)
    def delete(self, *args, **kwargs):
        if self.area.exists():
            # 如果该区域下有设备，则不进行删除操作，直接返回
            return False
        else:
            return super(Area, self).delete(*args, **kwargs)
        
class DeviceType(models.Model):
    name = models.CharField(max_length=50,unique=True)
    def delete(self, *args, **kwargs):
        if self.device_type.exists():
            return False
        else:
            return super(DeviceType, self).delete(*args, **kwargs)
class DeviceBrand(models.Model):
    name = models.CharField(max_length=50,unique=True)
    netmikotype=models.CharField(max_length=50,blank=True,null=True)
    def delete(self, *args, **kwargs):
        if self.device_brand.exists():
            return False
        else:
            return super(DeviceBrand, self).delete(*args, **kwargs)
class DeviceUser(models.Model):
    name = models.CharField(max_length=50,unique=True)
    username = models.CharField(max_length=50,blank=True,null=True,)
    password = models.CharField(max_length=50,blank=True,null=True,)
    def delete(self, *args, **kwargs):
        # 如果该用户被其他模型关联，则将关联的字段置为空
        for related_model in self._meta.related_objects:
            related_name = related_model.get_accessor_name()
            if hasattr(self, related_name):
                related_queryset = getattr(self, related_name).all()
                for related_obj in related_queryset:
                    for field in related_obj._meta.fields:
                        if field.is_relation and field.related_model == DeviceUser:
                            setattr(related_obj, field.name, None)
                            related_obj.save()
        return super(DeviceUser, self).delete(*args, **kwargs)

class Devices(models.Model):
    name = models.CharField(max_length=50)
    ip = models.CharField(max_length=20,unique=True)
    area = models.ForeignKey(Area, on_delete=models.CASCADE,default=5,related_name='area')
    device_type = models.ForeignKey(DeviceType, on_delete=models.CASCADE,default=1,related_name='device_type')
    device_brand = models.ForeignKey(DeviceBrand, on_delete=models.CASCADE,default=1,related_name='device_brand')
    device_user = models.ForeignKey(DeviceUser, on_delete=models.CASCADE,blank=True,null=True,related_name='device_user')
    
    @property
    def area_name(self):
        return self.area.name
    def device_type_name(self):
        return self.device_type.name
    def device_user_name(self):
        try:
          return self.device_user.name
        except AttributeError:
            return None
    def device_brand_name(self):
        return self.device_brand.name
    
class Task(models.Model):
    name = models.CharField(max_length=100, unique=True)
    schedule = models.CharField(max_length=100)
    devices = models.ManyToManyField(Devices)
    def devices_name(self):
        return self.devices.name

class DevicesGroup(models.Model):
    name = models.CharField(max_length=100, unique=True)
    devices = models.ManyToManyField(Devices)
    def devices_name(self):
        return self.devices.name