from ..packages.crud.base import BaseCrudView
from .tables import TeacherTable, InstructorFeedbackTable
from .forms import TeacherForm, TeacherLevelForm, InstructorFeedbackForm
from zango.core.utils import get_current_role

class TeacherCrudView(BaseCrudView):
    page_title = "Teachers"
    add_btn_title = "Add New Teacher"
    table = TeacherTable
    form = TeacherForm

    def has_add_perm(self, request):
        return True

    def display_add_button_check(self, request):
        return get_current_role().name in ['Admin']
    
    def display_download_button_check(self, request):
        return get_current_role().name in [ 'Admin']
    
class InstructorFeedbackCrudView(BaseCrudView):
    page_title = "Instructor Feedbacks"
    add_btn_title = "Add Feedback"
    table = InstructorFeedbackTable
    form = InstructorFeedbackForm

    def has_add_perm(self, request):
        return True

    def display_add_button_check(self, request):
        return get_current_role().name in ['Teacher']
    
    def display_download_button_check(self, request):
        return get_current_role().name in [ 'Admin']