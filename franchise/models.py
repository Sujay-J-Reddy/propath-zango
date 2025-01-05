import datetime
from django.db import models
import json

from zango.apps.dynamic_models.models import DynamicModelBase
from zango.apps.dynamic_models.fields import ZForeignKey, ZOneToOneField
from zango.core.storage_utils import ZFileField
from zango.apps.appauth.models import AppUserModel

class Franchisee(DynamicModelBase):
    FRANCHISEE_TYPE_CHOICES = (
        ('MF', 'MF - Master Franchisee'),
        ('DF', 'DF - District Franchisee'),
        ('DCF', 'DCF - District City Franchisee')
    )

    BLOOD_GROUP_CHOICES = (
        ('A+', 'A+'),
        ('A-', 'A-'),
        ('B+', 'B+'),
        ('B-', 'B-'),
        ('AB+', 'AB+'),
        ('AB-', 'AB-'),
        ('O+', 'O+'),
        ('O-', 'O-'),
    )

    FIND_US_CHOICES = (
        ('existing_franchisee', 'Existing Franchisee'),
        ('google', 'Google'),
        ('other', 'Other')
    )

    photo = ZFileField()
    name = models.CharField(max_length=100)
    franchisee_type = models.CharField(max_length=3, choices=FRANCHISEE_TYPE_CHOICES)
    abacus = models.BooleanField(default=False)
    vedic_maths = models.BooleanField(default=False)
    handwriting = models.BooleanField(default=False)
    calligraphy = models.BooleanField(default=False)
    robotics = models.BooleanField(default=False)
    dob = models.DateField()
    blood_group = models.CharField(max_length=3, choices=BLOOD_GROUP_CHOICES)
    locations = models.TextField(default="[]")
    communication_address = models.TextField()
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    contact_number = models.CharField(max_length=15)
    email = models.EmailField()
    educational_qualification = models.CharField(max_length=100)
    present_occupation = models.CharField(max_length=100)
    annual_income = models.DecimalField(max_digits=10, decimal_places=2)
    experience_in_franchisee_model = models.PositiveIntegerField()
    find_about_us = models.CharField(max_length=20, choices=FIND_US_CHOICES)
    user = ZOneToOneField(AppUserModel, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
    def set_locations(self, locations):
        self.locations = json.dumps(locations)

    def get_locations(self):
        return json.loads(self.locations or "[]")

class Student(DynamicModelBase):
    s_id = models.CharField(max_length=20, unique=True)
    franchise = ZForeignKey(Franchisee,on_delete=models.CASCADE)
    location = models.CharField(max_length=255)
    name = models.CharField(max_length=100)
    photo = ZFileField()
    course = models.CharField(max_length=20, choices=[('abacus', 'Abacus'), ('vedic_maths', 'Vedic Maths'),('handwriting', 'Handwriting'),], null=True)
    programme = models.CharField(max_length=10, choices=[('junior', 'Junior'), ('senior', 'Senior'),('none', 'None')], null=True, blank=True)
    level = models.IntegerField()
    dob = models.DateField()
    contact = models.CharField(max_length=20)
    sex = models.CharField(max_length=10, choices=[('male', 'Male'), ('female', 'Female')], null=True)
    father_name = models.CharField(max_length=100, null=True)
    father_occupation = models.CharField(max_length=100, null=True)
    mother_name = models.CharField(max_length=100, null=True)
    mother_occupation = models.CharField(max_length=100, null=True)
    qualification = models.CharField(max_length=100, null=True)
    reference_by = models.CharField(max_length=20, choices=[('paper_ads', 'Paper Ads'), ('parents', 'Parents'), ('social_media', 'Social Media'), ('others', 'Others')], null=True)
    residential_address = models.TextField(null=True)
    contact_number = models.CharField(max_length=20, null=True)
    email = models.EmailField(null=True)
    school_name = models.CharField(max_length=100, null=True)
    standard = models.CharField(max_length=50, null=True)
    num_siblings = models.IntegerField(null=True)
    join_date = models.DateField(auto_now_add=True)
    course_start_date = models.DateField(blank=True, null=True)
    dropped = models.BooleanField(default=False)


    def __str__(self):
        return f"{self.s_id} - {self.name}"

class LevelCertificate(DynamicModelBase):
    student = ZForeignKey(Student,on_delete=models.CASCADE)
    course = models.CharField(max_length=100)
    programme = models.CharField(max_length=100)
    level = models.CharField(max_length=100)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.s_id} - {self.student.name}"

