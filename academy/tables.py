from django.db.models import Q
from ..packages.crud.table.base import ModelTable
from ..packages.crud.table.column import ModelCol, StringCol
from .models import Competition, CompetitionResult, CompetitionStudent, School, SchoolStudent, Enquiry, Event, Stat, Testimonial
from .forms import CompetitionForm, CompetitionResultForm, SchoolForm, SchoolStudentForm, EventForm, StatForm, TestimonialForm
from ..franchise.forms import CompetitionStudentForm
from . details import EventDetail, EnquiryDetail, CompetitionDetail, CompetitionResultDetail, SchoolDetail, SchoolStudentDetail,CompetitionStudentDetail
from django.db.models import F, Value, CharField
from django.db.models.functions import Concat
from zango.core.utils import get_current_role
from ..franchise.utils import get_current_franchise

class EventTable(ModelTable):
    name = ModelCol(display_as="Name", sortable=True, searchable=True)
    date = ModelCol(display_as="Date", sortable=True, searchable=True)
    photo = ModelCol(display_as="Photo", sortable=False, searchable=False)
    details = ModelCol(display_as="Details", sortable=True, searchable=True)
    table_actions = []
    row_actions = [
        {
            "name": "Edit",
            "key": "edit",
            "description": "Edit Event",
            "type": "form",
            "form": EventForm,  # Specify the form to use for editing
            "roles": [
                "Admin"
            ],  # Specify roles that can perform the action
        }
    ]

    class Meta:
        model = Event
        detail_class = EventDetail
        fields = [
            "name",
            "date",
            "photo",
            "details"
        ]
        card_primary_fields = [ "details","date"]

    def name_Q_obj(self, search_term):
        if search_term is not None:
            return Q(name__contains = search_term)
        return Q()
    
    def details_Q_obj(self, search_term):
        if search_term is not None:
            return Q(details__contains = search_term)
        return Q()
    
    

class EnquiryTable(ModelTable):
    name = ModelCol(display_as="Name", sortable=True, searchable=True)
    mail = ModelCol(display_as="Mail", sortable=True, searchable=True)
    type = ModelCol(display_as="Type", sortable=True, searchable=True)
    phone_country_code = ModelCol(display_as="Phone Country Code", sortable=True, searchable=True)
    phone_number = ModelCol(display_as="Phone Number", sortable=True, searchable=True)
    city = ModelCol(display_as="City", sortable=True, searchable=True)
    pin = ModelCol(display_as="Pin", sortable=True, searchable=True)
    state = ModelCol(display_as="State", sortable=True, searchable=True)
    country = ModelCol(display_as="Country", sortable=True, searchable=True)
    date = ModelCol(display_as="Date", sortable=True, searchable=True)
    table_actions = []
    row_actions = []

    class Meta:
        model = Enquiry
        detail_class = EnquiryDetail
        fields = [
            "name",
            "mail",
            "type",
            "phone_country_code",
            "phone_number",
            "city",
            "pin",
            "state",
            "country",
            "date",
        ]
        card_primary_fields = ["mail","date"]

    def name_Q_obj(self, search_term):
        if search_term is not None:
            return Q(name__contains = search_term)
        return Q()
    
    def mail_Q_obj(self, search_term):
        if search_term is not None:
            return Q(mail__contains = search_term)
        return Q()
    
    def city_Q_obj(self, search_term):
        if search_term is not None:
            return Q(city__contains = search_term)
        return Q()
    
    def country_Q_obj(self, search_term):
        if search_term is not None:
            return Q(country__contains = search_term)
        return Q()
    
    def state_Q_obj(self, search_term):
        if search_term is not None:
            return Q(state__contains = search_term)
        return Q()
    
    def phone_number_Q_obj(self, search_term):
        if search_term is not None:
            return Q(phone_number__contains = search_term)
        return Q()
    
    def pin_Q_obj(self, search_term):
        if search_term is not None:
            return Q(pin__contains = search_term)
        return Q()

class CompetitionTable(ModelTable):
    circular_no = ModelCol(display_as="Circular Number", sortable=True, searchable=True)
    name = ModelCol(display_as="Name", sortable=True, searchable=True)
    level_cutoff_date = ModelCol(display_as="Level Cut off Date", sortable=True, searchable=True)
    pdf_file = ModelCol(display_as="PDF File", sortable=False, searchable=False)
    table_actions = []
    row_actions = [
        {
            "name": "Edit",
            "key": "edit",
            "description": "Edit Competition",
            "type": "form",
            "form": CompetitionForm,  # Specify the form to use for editing
            "roles": [
                "Admin"
            ],  # Specify roles that can perform the action
        },
        {
            "name": "Register",
            "key": "register_students",
            "description": "Register students for competition",
            "type": "form",
            "form": CompetitionStudentForm,  # Specify the form to use for editing
            "roles": [
                "Franchisee"
            ],  # Specify roles that can perform the action
        }
    ]

    class Meta:
        model = Competition
        detail_class = CompetitionDetail
        fields = [
            "circular_no",
            "name",
            "level_cutoff_date",
            "pdf_file",
        ]
        # row_selector = {"enabled": True, "multi": False}
        card_primary_fields = ["level_cutoff_date"]

    def can_perform_row_action_edit(self, request, obj):
        # Implement logic to check if the user can perform the Edit action
        # Example: Check if the user has the necessary permissions to edit records
        return True
    
    def circular_no_Q_obj(self, search_term):
        if search_term is not None:
            return Q(circular_no__contains=search_term)
        return Q()

    def name_Q_obj(self, search_term):
        if search_term is not None:
            return Q(name__contains=search_term)
        return Q()

class CompetitionResultTable(ModelTable):
    competition = ModelCol(display_as="Competition", sortable=True, searchable=True)
    student  = ModelCol(display_as="Student", sortable=True, searchable=True)
    franchise = StringCol(display_as="Franchise", sortable=True, searchable=True, user_roles = ["Admin"])
    rank = ModelCol(display_as="Rank", sortable=True, searchable=True)

    table_actions = []
    row_actions = [
        {
            "name": "Edit",
            "key": "edit",
            "description": "Edit Competition Results",
            "type": "form",
            "form": CompetitionResultForm,  # Specify the form to use for editing
            "roles": [
                "Admin"
            ],  # Specify roles that can perform the action
        }
    ]

    class Meta:
        model = CompetitionResult
        detail_class = CompetitionResultDetail
        fields = [
            "competition",
            "student",
            "rank",
        ]
        # row_selector = {"enabled": True, "multi": False}
        card_primary_fields = ["competition","rank"]
    
    def competition_getval(self, obj):
        return f"{obj.competition.circular_no} - {obj.competition.name}"
    def student_getval(self, obj):
        return f"{obj.student.s_id} - {obj.student.name}"
    def franchise_getval(self, obj):
        return obj.student.franchise.name
    def can_perform_row_action_edit(self, request, obj):
        # Implement logic to check if the user can perform the Edit action
        # Example: Check if the user has the necessary permissions to edit records
        return True
    
    def get_table_data_queryset(self):
        queryset= super().get_table_data_queryset()
        role = get_current_role()
        if role.name == 'Admin':
            return queryset
        else:
            return queryset.filter(student__franchise_id=get_current_franchise())
    def id_Q_obj(self, search_term):
        try:
            modified_id = int(search_term) 
        except ValueError:
            modified_id = None  # Not an integer, ignore
        if modified_id is not None:
            return Q(id=modified_id)
        return Q()    
    
class CompetitionStudentTable(ModelTable):
    circular_no = StringCol(display_as="Circular Number", sortable=False, searchable=True)
    franchise = StringCol(display_as="Franchise", sortable=True, searchable=True)
    # student = StringCol(display_as="Students", sortable=True, searchable=True)
    date = ModelCol(display_as="Date", sortable=True, searchable=True)
    table_actions = []
    row_actions = []    
    class Meta:
        model = CompetitionStudent
        detail_class = CompetitionStudentDetail
        fields = [
            "franchise",
            "date"

        ]
        # row_selector = {"enabled": True, "multi": False}
        card_primary_fields = ["date"]

    def circular_no_getval(self, obj):
        return obj.competition.circular_no
    
    def franchise_getval(self, obj):
        return obj.franchise.name
    
    def student_getval(self, obj):
        return f'{obj.student.s_id} - {obj.student.name}'
    

    def get_table_data_queryset(self):
        queryset= super().get_table_data_queryset()
        distinct_combinations =  queryset.order_by('franchise', 'competition').distinct('franchise','competition')
        return distinct_combinations
           

    def competition_Q_obj(self, search_term):
        if search_term is not None:
            return Q(competition__name__contains=search_term)
        return Q()


    def circular_no_Q_obj(self, search_term):
        if search_term is not None:
            return Q(circular_no__name__contains=search_term)
        return Q()


class SchoolTable(ModelTable):
    name = ModelCol(display_as="Name", searchable=True, sortable=True)
    contact = ModelCol(display_as="Contact", searchable=True, sortable=True)
    mail = ModelCol(display_as="Mail", searchable=True, sortable=True)
    location = ModelCol(display_as="Location", searchable=True, sortable=True)
    table_actions = []
    row_actions =[
        {
            "name": "Edit",
            "key": "edit",
            "description": "Edit School Details",
            "type": "form",
            "form": SchoolForm,  # Specify the form to use for editing
            "roles": [
                "Admin"
            ],  # Specify roles that can perform the action
        }
    ]

    class Meta:
        model = School
        detail_class = SchoolDetail
        fields = [
            "name",
            "contact",
            "mail",
            "location"
        ]
        card_primary_fields = ["contact", "mail"]

    def name_Q_obj(self, search_term):
        if search_term is not None:
            return Q(name__contains=search_term)
        return Q()

    def contact_Q_obj(self, search_term):
        if search_term is not None:
            return Q(contact__contains=search_term)
        return Q()

    def mail_Q_obj(self, search_term):
        if search_term is not None:
            return Q(mail__contains=search_term)
        return Q()

    def location_Q_obj(self, search_term):
        if search_term is not None:
            return Q(location__contains=search_term)
        return Q()

    
    
    def can_perform_row_action_edit(self, request, obj):
        # Implement logic to check if the user can perform the Edit action
        # Example: Check if the user has the necessary permissions to edit records
        return True
    
class SchoolStudentTable(ModelTable):
    name = ModelCol(display_as="Name", searchable=True, sortable=True)
    school = ModelCol(display_as="School", searchable=True, sortable=True)
    course = ModelCol(display_as="Course", searchable=True, sortable=True)
    programme = ModelCol(display_as="Programme", searchable=True, sortable=True)
    level = ModelCol(display_as="Level", searchable=True, sortable=True)
    dob = ModelCol(display_as="Dob", searchable=True, sortable=True)
    contact = ModelCol(display_as="Contact", searchable=True, sortable=True)
    table_actions = []
    row_actions =[
        {
            "name": "Edit",
            "key": "edit",
            "description": "Edit School Details",
            "type": "form",
            "form": SchoolStudentForm,  # Specify the form to use for editing
            "roles": [
                "Admin"
            ],  # Specify roles that can perform the action
        }
    ]

    class Meta:
        model = SchoolStudent
        detail_class = SchoolStudentDetail
        fields = [
            "name",
            "school",
            "course",
            "programme",
            "level",
            "dob",
            "contact",
        ]
        card_primary_fields = ["school", "course", "programme", "level"]

    
    def can_perform_row_action_edit(self, request, obj):
        # Implement logic to check if the user can perform the Edit action
        # Example: Check if the user has the necessary permissions to edit records
        return True
    
    def school_getval(self, obj):
        return f"{obj.school.name}"
    
    def name_Q_obj(self, search_term):
        if search_term is not None:
            return Q(name__contains=search_term)
        return Q()

    def school_Q_obj(self, search_term):
        if search_term is not None:
            return Q(school__name__contains=search_term)
        return Q()

    def course_Q_obj(self, search_term):
        if search_term is not None:
            return Q(course__contains=search_term)
        return Q()

    def programme_Q_obj(self, search_term):
        if search_term is not None:
            return Q(programme__contains=search_term)
        return Q()

    def level_Q_obj(self, search_term):
        if search_term is not None:
            return Q(level__contains=search_term)
        return Q()

    def dob_Q_obj(self, search_term):
        if search_term is not None:
            return Q(dob__contains=search_term)
        return Q()

    def contact_Q_obj(self, search_term):
        if search_term is not None:
            return Q(contact__contains=search_term)
        return Q()

class StatTable(ModelTable):
    students = ModelCol(display_as="Students",searchable=False,sortable=False)
    teachers = ModelCol(display_as="Teachers",searchable=False,sortable=False)
    franchises = ModelCol(display_as="Franchises",searchable=False,sortable=False)
    table_actions = []
    row_actions = [
        {
            "name": "Edit",
            "key": "edit",
            "description": "Edit Stats",
            "type": "form",
            "form": StatForm, 
            "roles": [
                "Admin"
            ],  
        }
    ]

    class Meta:
        model = Stat
        fields = [
            "students",
            "teachers",
            "franchises"
        ]
        card_primary_fields = ["students", "teachers", "franchises"]

class TestimonialTable(ModelTable):
    name = ModelCol(display_as="Name",searchable=True,sortable=True)
    designation = ModelCol(display_as="Designation",searchable=True,sortable=True)
    quote = ModelCol(display_as="Quote",searchable=True,sortable=True)
    table_actions = []
    row_actions = [
        {
            "name": "Edit",
            "key": "edit",
            "description": "Edit Testimonial",
            "type": "form",
            "form": TestimonialForm,  
            "roles": [
                "Admin"
            ],  
        }
    ]

    class Meta:
        model = Testimonial
        fields = [
            "name",
            "designation",
            "quote",
            "date"
        ]
        card_primary_fields = ["designation", "quote"]