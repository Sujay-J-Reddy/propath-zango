from django.db import models
from zango.apps.dynamic_models.models import DynamicModelBase
from zango.apps.dynamic_models.fields import ZForeignKey
from zango.core.storage_utils import ZFileField
from ..franchise.models import Student, Franchisee
from ..teacher.models import Teacher
from django.db.models.signals import post_init
from django.dispatch import receiver

# Create your models here.

class School(DynamicModelBase):
    name = models.CharField(max_length=255)
    contact = models.CharField(max_length=100)
    mail = models.EmailField(max_length=100)
    location = models.CharField(max_length=100)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class SchoolStudent(DynamicModelBase):
    name = models.CharField(max_length=100)
    school = ZForeignKey(School,on_delete=models.CASCADE)
    course = models.CharField(max_length=100)
    programme = models.CharField(max_length=100)
    level = models.CharField(max_length=50)
    dob = models.DateField()
    contact = models.CharField(max_length=20)

    def __str__(self):
        return self.name
    
class Competition(DynamicModelBase):
    circular_no = models.CharField(max_length=100,unique=True)
    name = models.CharField(max_length=100)
    level_cutoff_date = models.DateField()
    pdf_file = ZFileField()
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.circular_no} - {self.name}"

class CompetitionStudent(DynamicModelBase):
    competition = ZForeignKey(Competition, on_delete=models.CASCADE)
    franchise = ZForeignKey(Franchisee, on_delete=models.CASCADE)
    student = ZForeignKey(Student, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)

    class Meta(DynamicModelBase.Meta):
        unique_together = ('competition', 'franchise')

    def __str__(self):
        return f"{self.franchise.name}"

class CompetitionResult(DynamicModelBase):
    competition = ZForeignKey(Competition, on_delete=models.CASCADE)
    student = ZForeignKey(Student, on_delete=models.CASCADE)
    rank = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.student.s_id} - {self.student.name}"
    
class Enquiry(DynamicModelBase):
    name = models.CharField(max_length=255)
    mail = models.EmailField()
    type = models.CharField(max_length=255)
    phone_country_code = models.CharField(max_length=5)
    phone_number = models.CharField(max_length=15)
    city = models.CharField(max_length=255)
    pin = models.CharField(max_length=10)
    state = models.CharField(max_length=255)
    country = models.CharField(max_length=255)  
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Event(DynamicModelBase):
    name = models.CharField(max_length=255)
    date = models.DateField()
    photo = ZFileField()
    details = models.TextField()

    def __str__(self):
        return self.name

class Stat(DynamicModelBase):
    students = models.PositiveIntegerField()
    teachers = models.PositiveIntegerField()
    franchises = models.PositiveIntegerField()

class Testimonial(DynamicModelBase):
    name = models.CharField(max_length=100)
    designation = models.CharField(max_length=100)
    quote = models.TextField()
    date = models.DateField()

    def __str__(self):
        return self.name

