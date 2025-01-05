from datetime import datetime
from django.db.models import Q
from ..packages.crud.table.base import ModelTable
from ..packages.crud.table.column import ModelCol, StringCol
from .models import Franchisee, Student, LevelCertificate
from .forms import FranchiseeForm, StudentForm, StudentLevelForm
from .details import FranchiseDetail, LevelCertificateDetail, StudentDetail
from ..franchise.utils import get_current_franchise
from zango.core.utils import get_current_role

class FranchiseeTable(ModelTable):
    id = ModelCol(display_as="ID", sortable=True, searchable=True)
    photo = ModelCol(display_as="Photo", sortable=False, searchable=False)
    name = ModelCol(display_as="Name", sortable=True, searchable=True)
    contact_number = ModelCol(
        display_as="Contact Number", sortable=True, searchable=True
    )
    locations = ModelCol(display_as="Locations", sortable=True, searchable=True)
    country = ModelCol(display_as="Country", sortable=True, searchable=True)
    email = ModelCol(display_as="Mail", sortable=True, searchable=True)
    table_actions = []
    row_actions = [
        {
            "name": "Edit",
            "key": "edit",
            "description": "Edit Franchisee",
            "type": "form",
            "form": FranchiseeForm,  # Specify the form to use for editing
            "roles": [
                "Admin"
            ],  # Specify roles that can perform the action
        }
    ]

    class Meta:
        model = Franchisee
        detail_class = FranchiseDetail
        fields = [
            "photo",
            "id",
            "name",
            "contact_number",
            "email",
        ]
        card_primary_fields = [ "email","contact_number"]


    def can_perform_row_action_edit(self, request, obj):
        # Implement logic to check if the user can perform the Edit action
        # Example: Check if the user has the necessary permissions to edit records
        return True
    
    
    
    def locations_getval(self, obj):
        location_html = """
        <table style='width: 100%; border-collapse: collapse;'>
            <thead>
                <tr>
                    <th style='border: 1px solid #ddd; padding: 8px; text-align: left;'>City</th>
                    <th style='border: 1px solid #ddd; padding: 8px; text-align: left;'>Address</th>
                </tr>
            </thead>
            <tbody>
        """
        
        for loc in obj.get_locations():
            city = loc.get('city', 'N/A')  
            address = loc.get('address', 'N/A')  
            location_html += f"""
                <tr>
                    <td style='border: 1px solid #ddd; padding: 8px;'>{city}</td>
                    <td style='border: 1px solid #ddd; padding: 8px;'>{address}</td>
                </tr>
            """
        
        location_html += "</tbody></table>"
        return location_html

    def id_Q_obj(self, search_term):
        if search_term is not None:
            return Q(id__contains=search_term)
        return Q()

    def name_Q_obj(self, search_term):
        if search_term is not None:
            return Q(name__contains=search_term)
        return Q()

    def contact_number_Q_obj(self, search_term):
        if search_term is not None:
            return Q(contact_number__contains=search_term)
        return Q()

    def locations_Q_obj(self, search_term):
        if search_term is not None:
            return Q(location__contains=search_term)    
        return Q()

    def email_Q_obj(self, search_term):
        if search_term is not None:
            return Q(email__contains=search_term)
        return Q()
    
    
    
class StudentTable(ModelTable):
    location = ModelCol(display_as="Location", sortable=True, searchable=True, choices=[(1, "smg"),(2,"bdvt")])
    s_id = ModelCol(display_as="ID", sortable=True, searchable=True)
    photo = ModelCol(display_as="Photo", sortable=False, searchable=False)
    name = ModelCol(display_as="Name", sortable=True, searchable=True)
    course = ModelCol(display_as="Course", sortable=True, searchable=True)
    programme = ModelCol(display_as="Programme", sortable=True, searchable=True)
    level = ModelCol(display_as="Level", sortable=True, searchable=True)
    franchise = ModelCol(display_as="Franchise", sortable=True, searchable=True, user_roles=["Admin"])
    course_start_date = ModelCol(display_as="Course Start Date", sortable=True, searchable=True)
    contact_number = ModelCol(
        display_as="Contact Number", sortable=True, searchable=True
    )
    age = StringCol(display_as="Age",sortable=True, searchable=True)
    residential_address = ModelCol(display_as="Address", sortable=False, searchable=True)
    email = ModelCol(display_as="Mail", sortable=True, searchable=True)
    dropped = ModelCol(display_as="Dropped", sortable=True, searchable=False)

    table_actions = []
    row_actions = [
        {
            "name": "Edit",
            "key": "edit",
            "description": "Edit Student",
            "type": "form",
            "form": StudentForm,  # Specify the form to use for editing
            "roles": [
                "Franchisee"
            ],  # Specify roles that can perform the action
        },
        {
        "name": "Update Level",
        "key": "update_student_level",
        "description": "Update Student Level",
        "type": "form",
        "form": StudentLevelForm,
        "roles": ["Franchisee"]
    },
    ]

    class Meta:
        model = Student
        detail_class = StudentDetail
        fields = [
            "location",
            "photo",
            "s_id",
            "franchise",
            "name",
            "course",
            "programme",
            "level",
            "course_start_date",
            "contact_number",
            "residential_address",
            "email",
            "dropped"
        ]
        # row_selector = {"enabled": True, "multi": False}
        card_primary_fields = ["course","franchise", "contact_number"]
   
    def dropped_getval(self, obj):
        if obj.dropped:
            return "Dropped"
        return "Active"
    
    def age_getval(self, obj):
        today = datetime.now().date()
        dob = obj.dob
        age = today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
        return age

    def can_perform_row_action_edit(self, request, obj):
        # Implement logic to check if the user can perform the Edit action
        # Example: Check if the user has the necessary permissions to edit records
        return True
    
    def can_perform_row_action_update_student_level(self, request, obj):
        # Implement logic to check if the user can perform the Edit action
        # Example: Check if the user has the necessary permissions to edit records
        return True

    def id_Q_obj(self, search_term):
        try:
            modified_id = int(search_term) 
        except ValueError:
            modified_id = None  # Not an integer, ignore
        if modified_id is not None:
            return Q(id=modified_id)
        return Q()
    
    def get_table_data_queryset(self):
        """
        Retrieves and annotates the queryset to enable progressive search in ID field.
        """
        queryset = super().get_table_data_queryset()
        role = get_current_role()
        if role.name == 'Franchisee':
            return queryset.filter(franchise=get_current_franchise()).order_by("dropped")
        else:
            return queryset.order_by("dropped")

class LevelCertificateTable(ModelTable):
    student = ModelCol(display_as="Student", searchable=True, sortable=True)
    s_id = StringCol(display_as="Student ID", searchable=True, sortable=True)
    franchise = StringCol(display_as="Franchise", searchable=True, sortable=True)
    course = ModelCol(display_as="Course", searchable=True, sortable=True)
    programme = ModelCol(display_as="Programme", searchable=True, sortable=True)
    level = ModelCol(display_as="Level", searchable=True, sortable=True)
    date = ModelCol(display_="Date", searchable=True, sortable=True)
    table_actions=[]
    row_actions = []

    class Meta:
        model = LevelCertificate
        detail_class = LevelCertificateDetail
        fields = [
            'student',
            'course',
            'programme',
            'level',
            'date'
        ]
        card_primary_fields = [ "course", "programme", "level"]

    def id_Q_obj(self, search_term):
        try:
            modified_id = int(search_term) 
        except ValueError:
            modified_id = None  # Not an integer, ignore
        if modified_id is not None:
            return Q(id=modified_id)
        return Q()

    def student_getval(self, obj):
        return obj.student.name
    
    def s_id_getval(self, obj):
        return obj.student.s_id
    
    def franchise_getval(self, obj):
        return obj.student.franchise.name
    
    def s_id_Q_obj(self, search_term):
        if search_term is not None:
            return Q(s_id__contains=search_term)
        return Q()

    def franchise_Q_obj(self, search_term):
        if search_term is not None:
            return Q(franchise__name__contains=search_term)
        return Q()

    def name_Q_obj(self, search_term):
        if search_term is not None:
            return Q(name__contains=search_term)
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

    def contact_number_Q_obj(self, search_term):
        if search_term is not None:
            return Q(contact_number__contains=search_term)
        return Q()

    def residential_address_Q_obj(self, search_term):
        if search_term is not None:
            return Q(residential_address__contains=search_term)
        return Q()

    def email_Q_obj(self, search_term):
        if search_term is not None:
            return Q(email__contains=search_term)
        return Q()
    
    def get_table_data_queryset(self):
        queryset = super().get_table_data_queryset()
        role = get_current_role()
        if role.name == 'franchise':
            return queryset.filter(franchise=get_current_franchise())
        return queryset




    
    
