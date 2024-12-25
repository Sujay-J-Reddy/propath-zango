from django.db import models
from zango.apps.dynamic_models.models import DynamicModelBase
from zango.apps.dynamic_models.fields import ZForeignKey
from zango.core.storage_utils import ZFileField
from ..franchise.models import Franchisee, Student
from ..teacher.models import Teacher

class Notification(DynamicModelBase):
    NOTIFICATION_TYPE_CHOICES = [
        ('certificate_request', 'Certificate Request'),
        ('birthday', 'Birthday'),
        ('training_due_date', 'Training Due Date'),
        ('competition_announcement', 'Competition Announcement'),
        ('order', 'Order'), 
        ('enquiry', 'Enquiry'),
        ('other', 'Other'),
    ]
    ACCOUNT_TYPE_CHOICES = [
        ('franchise', 'Franchise'),
        ('admin', 'Admin'),
        ('teacher', 'Teacher'),
    ]

    notification_type = models.CharField(max_length=50, choices=NOTIFICATION_TYPE_CHOICES)
    account_type = models.CharField(max_length=50, choices=ACCOUNT_TYPE_CHOICES)
    details = models.TextField(blank=True,default="Details Not Available")
    franchise = ZForeignKey(Franchisee, on_delete=models.DO_NOTHING, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.notification_type.replace('_', ' ').title()} Notification"