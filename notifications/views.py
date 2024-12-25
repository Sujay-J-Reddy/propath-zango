from ..packages.crud.base import BaseCrudView
from zango.core.utils import get_current_role
from .tables import NotificationTable
from .forms import NotificationForm

class NotificationCrudView(BaseCrudView):
    page_title = "Notifications"
    add_btn_title = "Add Notification"
    table = NotificationTable
    form = NotificationForm

    def has_add_perm(self, request):
        return True

    def display_add_button_check(self, request):
        return get_current_role().name in ['Admin']
    
    def display_download_button_check(self, request):
        return get_current_role().name in [ 'Admin']