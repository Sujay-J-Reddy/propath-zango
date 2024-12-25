from datetime import timezone
from ..packages.crud.forms import BaseForm, BaseSimpleForm
from ..packages.crud.form_fields import ModelField, CustomSchemaField
from .models import Student, Franchisee, LevelCertificate
from ..academy.models import CompetitionStudent, Competition
from ..notifications.models import Notification
from zango.apps.appauth.models import UserRoleModel
from zango.apps.appauth.models import AppUserModel
from zango.core.utils import get_current_request
from .utils import get_current_franchise
from django import forms
from django.core.exceptions import ValidationError


class StudentForm(BaseForm):
    s_id = ModelField(placeholder="Student ID", required=True, required_msg="This field is required", label="Student ID")
    name = ModelField(placeholder="Name", required=True, required_msg="This field is required")
    photo = ModelField(placeholder="Upload Photo", required=True, required_msg="This field is required")
    course = ModelField(placeholder="Course", required=True, required_msg="This field is required")
    programme = ModelField(placeholder="Programme", required=False)
    level = ModelField(placeholder="Level", required=True, required_msg="This field is required")
    dob = ModelField(placeholder="Date of Birth", required=True, required_msg="This field is required")
    contact = ModelField(placeholder="Contact", required=True, required_msg="This field is required")
    sex = ModelField(placeholder="Sex", required=True, required_msg="This field is required")
    father_name = ModelField(placeholder="Father's Name")
    father_occupation = ModelField(placeholder="Father's Occupation")
    mother_name = ModelField(placeholder="Mother's Name")
    mother_occupation = ModelField(placeholder="Mother's Occupation")
    qualification = ModelField(placeholder="Qualification")
    reference_by = ModelField(placeholder="Reference By", required=True, required_msg="This field is required")
    residential_address = ModelField(placeholder="Residential Address")
    contact_number = ModelField(placeholder="Contact Number")
    email = ModelField(placeholder="Email")
    school_name = ModelField(placeholder="School Name")
    standard = ModelField(placeholder="Standard")
    num_siblings = ModelField(placeholder="Number of Siblings")
    join_date = ModelField(placeholder="Join Date", required=True, required_msg="This field is required")
    course_start_date = ModelField(placeholder="Course Start Date")
    dropped = ModelField(placeholder="Dropped")

    class Meta:
        model = Student
        title = 'Add New Student'
        order = ['s_id', 
            'name', 
            'photo', 
            'course', 
            'programme', 
            'level', 
            'dob', 
            'contact', 
            'sex', 
            'father_name', 
            'father_occupation', 
            'mother_name', 
            'mother_occupation', 
            'qualification', 
            'reference_by', 
            'residential_address', 
            'contact_number', 
            'email', 
            'school_name', 
            'standard', 
            'num_siblings', 
            'join_date', 
            'course_start_date', 
            'dropped']
        
    def save(self, commit=True):
        instance = super().save(commit=False)
        if commit:
            instance.franchise = get_current_franchise()
            print(instance.franchise)
            instance.save()
        return instance
    

class CourseStartDateForm(BaseSimpleForm):
    course_start_date = CustomSchemaField(required=True,
        schema={
           
                    "title": "Course start date",
                    "type": "string",
                    "default": ""
                
            
        },
        ui_schema={
                    "ui:placeholder": "Course Start Date",
                    "ui:syncEnabled": "false",
                    "ui:autocomplete": {},
                    "ui:errorMessages": {},
                    "ui:widget": "DatePickerFieldWidget",
                    "ui:options": {
                        "dateFormat": "%d/%m/%Y"
                    }
                    })
    students = CustomSchemaField(required=True,
        schema={
                    "title": 'Students',
                    "type": 'array',
                    "uniqueItems":True,
                    "items": {
                        "type": 'string',
                    },
                    # "required":['service_type', 'This field is required.'],
                },
        ui_schema={
                    "ui:widget": "SelectFieldWidget",
                    "ui:options": { "multiple": "true" },
                    "ui:placeholder": "Select Student",
                    "ui:errorMessages": {
                        "required": "This field is required."
                        }
                    }
    )

    class Meta:
        title="Course Start Date Form"


    def __init__(self, *args, **kwargs):
        super(CourseStartDateForm, self).__init__(*args, **kwargs)
        self.update = False
        instance = kwargs.get("instance")
        franchise = get_current_franchise()

        # Fetch students of the current franchise
        students = Student.objects.filter(franchise=franchise)
        
        # Update the schema to include default, enum, and enumNames values
        self.custom_schema_fields["students"].schema["items"]["enum"] = [str(student.pk) for student in students]
        self.custom_schema_fields["students"].schema["items"]["enumNames"] = [student.name for student in students]
        
        if instance is not None:
            self.update = True

    def save(self, commit=True):
        students = self.data.getlist("students")
        # course_start_date = self.data.get("course_start_date")["course_start_date"]
        
        # Convert the course start date from string to date object if necessary
        # course_start_date = timezone.datetime.strptime(course_start_date, "%d/%m/%Y").date()

        # Update each selected student's course start date
        for student_id in students:
            student = Student.objects.get(pk=int(student_id))
            student.course_start_date = self.data.get("course_start_date")
            student.save()

        



  
    


class StudentLevelForm(BaseForm):
    course = ModelField(placeholder='Course', required=True, required_msg="This field is required")
    programme = ModelField(placeholder="Programme",required=True, required_msg="This is a required field")
    level = ModelField(placeholder="Level", required=True, required_msg="This field is required")
    
    class Meta:
        model = Student
        title = 'Update student level'
        order = [ 
            'course',
            'programme',
            'level', 
            ]
    
    def save(self, commit=True):
        instance = super().save(commit=False)
        prev = Student.objects.get(pk=instance.id)
        if commit:
            LevelCertificate.objects.create(
                student = instance,
                programme = prev.programme,
                level = prev.level,
                course = prev.course
            )
            Notification.objects.create(
                notification_type = "certificate_request",
                account_type = "admin",
                details = f'New Certificate Request for Student: {instance.name} from Franchise: {instance.franchise.name}. Please visit the Certificates page for more information.'
            )
            instance.save()
        return instance


class FranchiseeForm(BaseForm):
    name = ModelField(
        placeholder="Enter Name", required=True, required_msg="This field is required."
    )
    contact_number = ModelField(
        placeholder="Enter Contact Number",
        required=True,
        required_msg="This field is required.",
    )
    communication_address = ModelField(placeholder="Enter Communication Address", required=True, required_msg="This field is required.")
    center_address = ModelField(placeholder="Enter Center Address", required=True, required_msg="This field is required.")
    photo = ModelField(placeholder="Upload Photo", required=True, required_msg="This field is required")
    franchisee_type = ModelField(placeholder="Franchisee Type", required=True, required_msg="This field is required")
    abacus = ModelField(placeholder="Abacus")
    vedic_maths = ModelField(placeholder="Vedic Maths")
    handwriting = ModelField(placeholder="Handwriting")
    calligraphy = ModelField(placeholder="Calligraphy")
    robotics = ModelField(placeholder="Robotics")
    dob = ModelField(placeholder="Date of Birth", required=True, required_msg="This field is required")
    blood_group = ModelField(placeholder="Blood Group")
    center_address = ModelField(placeholder="Center Address", required=True, required_msg="This field is required")
    communication_address = ModelField(placeholder="Communication Address", required=True, required_msg="This field is required")
    city = ModelField(placeholder="City", required=True, required_msg="This field is required")
    state = ModelField(placeholder="State", required=True, required_msg="This field is required")
    contact_number = ModelField(placeholder="Contact Number", required=True, required_msg="This field is required")
    email = ModelField(placeholder="Email", required=True, required_msg="This field is required")
    educational_qualification = ModelField(placeholder="Educational Qualification",  required=True, required_msg="This field is required")
    present_occupation = ModelField(placeholder="Present Occupation", required=True, required_msg="This field is required")
    annual_income = ModelField(placeholder="Annual Income", required=True, required_msg="This field is required")
    experience_in_franchisee_model = ModelField(placeholder="Experience in Franchisee Model", required=True, required_msg="This field is required")
    find_about_us = ModelField(placeholder="How did you find us?", required=True, required_msg="This field is required")

    class Meta:
        model = Franchisee
        title = 'Add New Franchisee'
        order = ['name', 
            'contact_number', 
            'communication_address', 
            'center_address', 
            'photo', 
            'franchisee_type', 
            'abacus', 
            'vedic_maths', 
            'handwriting', 
            'calligraphy', 
            'robotics', 
            'dob', 
            'blood_group', 
            'city', 
            'state', 
            'email', 
            'educational_qualification', 
            'present_occupation', 
            'annual_income', 
            'experience_in_franchisee_model', 
            'find_about_us']
        
    def save(self, commit=True):
        instance = super(FranchiseeForm, self).save(commit=False)
        if instance.pk is None:
            # !ToDo: Remove hard coded password, pass empty and core will set unusable password.
            password = "Propath@1234"
            user_role = UserRoleModel.objects.get(name="Franchisee")

            # Creating new user for patient
            creation_result = AppUserModel.create_user(
                f"{instance.name}",
                instance.email,
                instance.contact_number,
                password,
                [user_role.id],
                False,
                False,
            )

            # Handling user mapping for patient
            instance.user = creation_result["app_user"]
            instance.consent = True
            if instance.user.app_objects is None:
                instance.user.app_objects = {}
            instance.user.app_objects.update(
                {str(user_role.id): str(instance.object_uuid)}
            )

            # Automatically remember the patient's enrolment progress so they can resume where they left off.
            # This improves convenience and reduces friction in the enrolment process.
        if commit:
            instance.save()
            instance.user.save()

        return instance   

class CompetitionStudentForm(BaseForm):
    students =  CustomSchemaField(
        required=True,
        schema={
                    "title": 'Student Registrations',
                    "type": 'array',
                    "uniqueItems":True,
                    "items": {
                        "type": 'string',
                    },
                    # "required":['service_type', 'This field is required.'],
                },
        ui_schema={
                    "ui:widget": "SelectFieldWidget",
                    "ui:options": { "multiple": "true" },
                    "ui:placeholder": "Select Student",
                    "ui:errorMessages": {
                        "required": "This field is required."
                        }
                    }
    )
    

    class Meta:
        model = Competition
        title = "Competition Registration Form"
        order = [
            "students"
        ]

    def __init__(self, *args, **kwargs):
        super(CompetitionStudentForm, self).__init__(*args, **kwargs)
        self.update = False
        instance = kwargs.get("instance")
        franchise = get_current_franchise()
        if instance is not None:
            self.update = True
            competition_students = CompetitionStudent.objects.filter(
                competition=instance
            )
            ids = [student.student.s_id for student in competition_students ]
            self.custom_schema_fields["students"].schema["default"]=[str(obj.pk)for obj in Student.objects.filter(s_id__in=ids)]
            self.custom_schema_fields["students"].schema["items"]["enum"]=[str(obj.pk) for obj in Student.objects.filter(franchise=franchise)]
            self.custom_schema_fields["students"].schema["items"]["enumNames"]=[obj.name for obj in Student.objects.filter(franchise=franchise)]

    def clean(self, *args, **kwargs):
        super().clean(*args, **kwargs)
        franchise = get_current_franchise()
        instance = super().save(commit=False)
        isRegistered = CompetitionStudent.objects.filter(competition=instance, franchise=franchise).exists()
        if isRegistered:
            raise ValidationError("This franchise is already registered for this competition")

    def save(self, commit=True):
        students = self.data.getlist("students")
        franchise = get_current_franchise()
        instance = super().save(commit=False)
        existing_competition_students = CompetitionStudent.objects.filter(competition=instance, franchise=franchise)
        for competition_student in existing_competition_students:
            if not competition_student.student in students:
                competition_student.delete()
        for student in students:
            if not CompetitionStudent.objects.filter(
                competition=instance, student_id=int(student),
                franchise=franchise
            ).exists():
               CompetitionStudent.objects.create(student_id=int(student), competition=instance, franchise=franchise)
    

        
       