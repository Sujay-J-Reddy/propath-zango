from django.http import HttpResponse
from ..packages.frame.decorator import add_frame_context
from ..packages.crud.base import BaseCrudView
from .tables import CompetitionTable, CompetitionResultTable, CompetitionStudentTable, SchoolTable, SchoolStudentTable, EnquiryTable, EventTable, StatTable, TestimonialTable
from .forms import CompetitionForm, CompetitionResultForm, SchoolForm, SchoolStudentForm, EventForm, StatForm, TestimonialForm
from ..franchise.forms import CompetitionStudentForm
from zango.core.utils import get_current_role
from django.shortcuts import render
from django.views.generic import TemplateView, FormView
from datetime import datetime
from ..franchise.models import Franchisee, Student
from ..teacher.models import Teacher
from ..notifications.models import Notification
from ..landing.forms import EnquiryForm

    
class EnquiryDataView(BaseCrudView):
    page_title = "Enquiries"
    add_btn_title = "Add"
    table = EnquiryTable
    form = EnquiryForm

    def has_add_perm(self, request):
        return True
    
    def display_add_button_check(self, request):
        return False
    
    def display_download_button_check(self, request):
        return get_current_role().name in [ 'Admin']
    
class EventCrudView(BaseCrudView):
    page_title = "Events"
    add_btn_title = "Add Event"
    table = EventTable
    form = EventForm

    def has_add_perm(self, request):
        return True

    def display_add_button_check(self, request):
        return get_current_role().name in ['Admin']
    
    def display_download_button_check(self, request):
        return get_current_role().name in [ 'Admin']

class CompetitionCrudView(BaseCrudView):
    page_title = "Competition"
    add_btn_title = "Add New Competition"
    table = CompetitionTable
    form = CompetitionForm

    def has_add_perm(self, request):
        return True

    def display_add_button_check(self, request):
        return get_current_role().name in ['Admin']
    
    def display_download_button_check(self, request):
        return get_current_role().name in [ 'Admin']

class CompetitionResultCrudView(BaseCrudView):
    page_title = "Competition Results"
    add_btn_title = "Announce Competition Results"
    table = CompetitionResultTable
    form = CompetitionResultForm

    def has_add_perm(self, request):
        return True

    def display_add_button_check(self, request):
        return get_current_role().name in [ 'Admin']
    
    def display_download_button_check(self, request):
        return get_current_role().name in [ 'Admin', 'Franchisee']
    
class CompetitionStudentCrudView(BaseCrudView):
    page_title = "Competition Registrations"
    add_btn_title = "Add"
    table = CompetitionStudentTable
    form = CompetitionStudentForm

    def display_add_button_check(self, request):
        return get_current_role().name in [ 'Franchisee']
    
    def display_download_button_check(self, request):
        return get_current_role().name in [ 'Admin', 'Franchisee']
    
class SchoolCrudView(BaseCrudView):
    page_title = "Schools"
    add_btn_title = "Add School"
    table = SchoolTable
    form = SchoolForm

    def has_add_perm(self, request):
        return True

    def display_add_button_check(self, request):
        return get_current_role().name in [ 'Admin']
    
    def display_download_button_check(self, request):
        return get_current_role().name in [ 'Admin']
    
class SchoolStudentCrudView(BaseCrudView):
    page_title = "School Students"
    add_btn_title = "Add School Students"
    table = SchoolStudentTable
    form = SchoolStudentForm

    def has_add_perm(self, request):
        return True

    def display_add_button_check(self, request):
        return get_current_role().name in [ 'Admin']
    
    def display_download_button_check(self, request):
        return get_current_role().name in [ 'Admin']
    
class StatCrudView(BaseCrudView):
    page_title = "Stats Page"
    add_btn_title = "Add Stat"
    table = StatTable
    form = StatForm

    def has_add_perm(self, request):
        return False
    
    def display_add_button_check(self, request):
        return get_current_role().name in [ 'Admin']
    
    def display_download_button_check(self, request):
        return get_current_role().name in [ 'Admin']
    
class TestimonialCrudView(BaseCrudView):
    page_title = "Testimonials"
    add_btn_title = "Add Testimonial"
    table = TestimonialTable
    form = TestimonialForm

    def has_add_perm(self, request):
        return True

    def display_add_button_check(self, request):
        return get_current_role().name in [ 'Admin']
    
    def display_download_button_check(self, request):
        return get_current_role().name in [ 'Admin']
    
def check_birthdays(request, *args, **kwargs):
    today = datetime.now().date()

    students_birthdays = Student.objects.filter(dob__month=today.month, dob__day=today.day)
    for student in students_birthdays:
        Notification.objects.create(notification_type="birthday", account_type="franchise", franchise_id=student.franchise.id,
            details = f'Happy birthday, {student.name}! Wishing you a day filled with joy and unforgettable moments. Your dedication to learning is truly inspiring. Enjoy your special day. - Propath Academy'                 
        )

    franchise_birthdays = Franchisee.objects.filter(dob__month=today.month, dob__day=today.day)
    for franchise in franchise_birthdays:
        Notification.objects.create(notification_type="birthday", account_type="franchise", franchise_id=franchise.id,
            details = f'Happy Birthday, {franchise.name}! Your commitment to excellence and leadership is appreciated more than words can express. Here is to another year of success and growth together. Wishing you a fantastic birthday filled with joy and prosperity. - Propath Academy'
        )
    
    teacher_birthdays = Teacher.objects.filter(dob__month=today.month, dob__day=today.day)
    for teacher in teacher_birthdays:
        Notification.objects.create(notification_type="birthday", account_type="teacher", franchise_id=franchise.id,
            details = f'Happy Birthday, {teacher.name}! Your passion for education shines brightly every day. Wishing you a birthday as amazing as you are. Thank you for your invaluable contributions to Propath Academy. Enjoy your well-deserved celebration! - Propath Academy'
        )

    training_dues = Teacher.objects.filter(due_date = datetime.today())
    for teacher in training_dues:
        Notification.objects.create(notification_type = "training_due_date", account_type="teacher", franchise_id=teacher.franchise.id,
            details = f'Dear {teacher.name} your next level training is scheduled from today. Please make sure that you are attending the sessions, Thank you. -  Propath Academy'                            
        )

    

    return HttpResponse("Birthdays checked and updated successfully")
