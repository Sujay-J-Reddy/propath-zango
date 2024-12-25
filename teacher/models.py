from zango.apps.dynamic_models.models import DynamicModelBase
from zango.apps.dynamic_models.fields import ZForeignKey, ZOneToOneField
from zango.core.storage_utils import ZFileField
from zango.apps.appauth.models import AppUserModel
from django.db import models
from  ..franchise.models import Franchisee

class Teacher(DynamicModelBase):
    PROGRAM_CHOICES = [
        ('abacus', 'Abacus'),
        ('vedic_maths', 'Vedic Maths'),
        ('handwriting', 'Handwriting'),
        ('calligraphy', 'Calligraphy'),
    ]

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

    SOURCE_CHOICES = [
        ('existing', 'Existing'),
        ('franchise', 'Franchise'),
        ('google', 'Google'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=255)
    photo = ZFileField()
    centre_name = models.CharField(max_length=255)
    franchise = ZForeignKey(Franchisee,on_delete=models.CASCADE)
    program_name = models.CharField(max_length=20, choices=PROGRAM_CHOICES)
    training_level = models.IntegerField(null=True)
    prev_level = models.IntegerField(null=True)
    prev_level_date = models.DateField(null=True)
    due_date = models.DateField(null=True)
    dob = models.DateField()
    blood_group = models.CharField(max_length=3, choices=BLOOD_GROUP_CHOICES)
    address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    contact_no = models.CharField(max_length=15)
    email = models.EmailField()
    qualification = models.CharField(max_length=255)
    present_occupation = models.CharField(max_length=255)
    annual_income = models.DecimalField(max_digits=10, decimal_places=2)
    how_did_you_come_to_know_us = models.CharField(max_length=20, choices=SOURCE_CHOICES)
    date = models.DateField(auto_now_add=True)
    user = ZOneToOneField(AppUserModel, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class InstructorFeedback(DynamicModelBase):
    SATISFACTORY = 'Satisfactory'
    UNSATISFACTORY = 'Unsatisfactory'

    FEEDBACK_CHOICES = [
        (SATISFACTORY, 'Satisfactory'),
        (UNSATISFACTORY, 'Unsatisfactory'),
    ]

    teacher = ZForeignKey(Teacher, on_delete=models.DO_NOTHING)
    completed_level = models.CharField(max_length=255)
    current_level = models.CharField(max_length=255)
    center_name = models.CharField(max_length=255)
    center_address = models.TextField()
    punctuality = models.CharField(choices=FEEDBACK_CHOICES, max_length=15)
    attention_to_instructor = models.CharField(choices=FEEDBACK_CHOICES, max_length=15)
    problem_solving_skills = models.CharField(choices=FEEDBACK_CHOICES, max_length=15)
    innovative_method = models.CharField(choices=FEEDBACK_CHOICES, max_length=15)
    teaching_method = models.CharField(choices=FEEDBACK_CHOICES, max_length=15)
    sharing_experiences = models.CharField(choices=FEEDBACK_CHOICES, max_length=15)
    comments_suggestions = models.TextField(null=True)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.teacher.name}"