from ..packages.crud.forms import BaseForm
from datetime import datetime, timedelta
from ..packages.crud.form_fields import ModelField
from .models import Teacher, InstructorFeedback
from zango.apps.appauth.models import UserRoleModel
from zango.apps.appauth.models import AppUserModel
from zango.core.utils import get_current_request

def get_current_teacher():
    req = get_current_request()
    user = req.user
    try:
        user = Teacher.objects.get(user=user)
    except Teacher.DoesNotExist:
        return None
    return user

class TeacherForm(BaseForm):
    name = ModelField(placeholder="Name", required=True, required_msg="This field is required")
    photo = ModelField(placeholder="Upload Photo", required=True, required_msg="Photo is required")
    centre_name = ModelField(placeholder="Enter Centre Name", required=True, required_msg="Centre name is required")
    franchise = ModelField(placeholder="Select Franchise", required=True, required_msg="Franchise is required")
    program_name = ModelField(placeholder="Select Program Name", required=True, required_msg="Program name is required")
    dob = ModelField(placeholder="Select Date of Birth", required=True, required_msg="Date of birth is required")
    blood_group = ModelField(placeholder="Select Blood Group", required=True, required_msg="Blood group is required")
    address = ModelField(placeholder="Enter Address", required=True, required_msg="Address is required")
    city = ModelField(placeholder="Enter City", required=True, required_msg="City is required")
    state = ModelField(placeholder="Enter State", required=True, required_msg="State is required")
    contact_no = ModelField(placeholder="Enter Contact Number", required=True, required_msg="Contact number is required")
    email = ModelField(placeholder="Enter Email", required=True, required_msg="Email is required")
    qualification = ModelField(placeholder="Enter Qualification", required=True, required_msg="Qualification is required")
    present_occupation = ModelField(placeholder="Enter Present Occupation", required=True, required_msg="Present occupation is required")
    annual_income = ModelField(placeholder="Enter Annual Income", required=True, required_msg="Annual income is required")
    how_did_you_come_to_know_us = ModelField(placeholder="Select How You Came to Know Us", required=True, required_msg="Source of knowing us is required")

    class Meta:
        model = Teacher
        title = "Teacher Details"
        order = [
            "name",
            "photo",
            "centre_name",
            "franchise",
            "program_name",
            "dob",
            "blood_group",
            "address",
            "city",
            "state",
            "contact_no",
            "email",
            "qualification",
            "present_occupation",
            "annual_income",
            "how_did_you_come_to_know_us"
        ]
    
    def save(self, commit=True):
        instance = super(TeacherForm, self).save(commit=False)
        if instance.pk is None:
            # !ToDo: Remove hard coded password, pass empty and core will set unusable password.
            password = "Propath@1234"
            user_role = UserRoleModel.objects.get(name="Teacher")

            # Creating new user for patient
            creation_result = AppUserModel.create_user(
                f"{instance.name}",
                instance.email,
                instance.contact_no,
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

class TeacherLevelForm(BaseForm):
    training_level = ModelField(placeholder="Training Level", required=True, required_msg="This field is required")

    class Meta:
        model = Teacher
        title = "Teacher Training Level Form"
        fields = [
            "training_level",
        ]

    def save(self, commit=True):
        instance = super().save(commit=False)
        if commit:
            instance.prev_level = instance.training_level
            instance.training_level = self.cleaned_data['training_level']
            instance.prev_level_date = datetime.now().date()
            instance.due_date = datetime.now().date() + timedelta(days=2*30)
            instance.save()
        return instance
            

class InstructorFeedbackForm(BaseForm):
    completed_level = ModelField(placeholder="Level Completed", required=True, required_msg="This field is required")
    current_level = ModelField(placeholder="Current Level", required=True, required_msg="This field is required")
    center_name = ModelField(placeholder="Center Name", required=True, required_msg="This field is required")
    center_address = ModelField(placeholder="Center Address", required=True, required_msg="This field is required")
    punctuality = ModelField(placeholder="Punctuality", required=True, required_msg="This field is required")
    attention_to_instructor = ModelField(placeholder="Trainer's Attentiton towards Instructor", required=True, required_msg="This field is required")
    problem_solving_skills = ModelField(placeholder="Problem Solving Skills", required=True, required_msg="This field is required")
    innovative_method = ModelField(placeholder="Innovation", required=True, required_msg="This field is required")
    teaching_method = ModelField(placeholder="Training Method", required=True, required_msg="This field is required")
    sharing_experiences = ModelField(placeholder="Trainer's Experiences Sharing", required=True, required_msg="This field is required")
    comments_suggestions = ModelField(placeholder="Any suggestions/comments", required=True, required_msg="This field is required")

    class Meta:
        model = InstructorFeedback
        title = "Instructor Feedback Form"
        order = [
            "completed_level",
            "current_level",
            "center_name",
            "center_address",
            "punctuality",
            "attention_to_instructor",
            "problem_solving_skills",
            "innovative_method",
            "teaching_method",
            "sharing_experiences",
            "comments_suggestions",
        ]

    def save(self, commit=True):
        instance = super().save(commit=False)
        if commit:
            instance.teacher = get_current_teacher()
            instance.save()
        return instance



    