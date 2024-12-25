from django.db import models
from zango.apps.dynamic_models.models import DynamicModelBase
from zango.apps.dynamic_models.fields import ZForeignKey
from zango.core.storage_utils import ZFileField
from ..franchise.models import Franchisee
from ..academy.models import School

class Order(DynamicModelBase):
    franchise = ZForeignKey(Franchisee, on_delete=models.CASCADE)
    kits = models.JSONField(null=True)  
    items = models.JSONField(null=True) 
    order_date = models.DateTimeField(auto_now_add=True)
    delivery_date = models.DateTimeField(null=True)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.franchise.name}"

class Vendor(DynamicModelBase):
    name = models.CharField(max_length=100)
    contact = models.CharField(max_length=100)
    location = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Kit(DynamicModelBase):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Item(DynamicModelBase):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    qty = models.PositiveIntegerField()
    last_purchase_price = models.PositiveIntegerField()
    kit = ZForeignKey(Kit, on_delete=models.SET_NULL, null=True,blank=True, related_name='kit_name')

    def __str__(self):  
        return self.name

class Log(DynamicModelBase):
    vendor = ZForeignKey(Vendor,on_delete=models.DO_NOTHING, related_name='vendor')
    items = models.JSONField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.vendor.name}"

class SchoolOrder(DynamicModelBase):
    school = ZForeignKey(School, on_delete=models.DO_NOTHING)
    kits = models.JSONField(null=True) 
    items = models.JSONField(null=True)  
    order_date = models.DateTimeField(auto_now_add=True)
    delivery_date = models.DateTimeField(null=True)

    def __str__(self):
        return f"{self.school.name}"

