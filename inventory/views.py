from ..packages.crud.base import BaseCrudView
from .tables import KitTable, VendorTable, ItemTable, LogTable, OrderTable, SchoolOrderTable
from .forms import KitForm, VendorForm, ItemForm, LogForm, OrderForm, SchoolOrderForm
from .workflow import OrderWorkflow, SchoolOrderWorkflow
from zango.core.utils import get_current_role

class SchoolOrderCrudView(BaseCrudView):
    page_title = "School Order"
    add_btn_title = "Add Order"
    table = SchoolOrderTable
    form = SchoolOrderForm
    workflow = SchoolOrderWorkflow

    def has_add_perm(self, request):
        return True

    def display_add_button_check(self, request):
        return get_current_role().name in ['Admin', 'AnonymousUsers']
    
    def display_download_button_check(self, request):
        return get_current_role().name in [ 'Admin']

class KitCrudView(BaseCrudView):
    page_title = "Kits"
    add_btn_title = "Add New Kit"
    table = KitTable
    form = KitForm

    def has_add_perm(self, request):
        return True

    def display_add_button_check(self, request):
        return get_current_role().name in ['Admin', 'AnonymousUsers']
    
    def display_download_button_check(self, request):
        return get_current_role().name in [ 'Admin']
    
class VendorCrudView(BaseCrudView):
    page_title = "Vendors"
    add_btn_title = "Add New Vendor"
    table = VendorTable
    form = VendorForm

    def has_add_perm(self, request):
        return True

    def display_add_button_check(self, request):
        return get_current_role().name in ['Admin', 'AnonymousUsers']
    
    def display_download_button_check(self, request):
        return get_current_role().name in [ 'Admin']
    
class ItemCrudView(BaseCrudView):
    page_title = "Items"
    add_btn_title = "Add New Item"
    table = ItemTable
    form = ItemForm

    def has_add_perm(self, request):
        return True

    def display_add_button_check(self, request):
        return get_current_role().name in ['Admin', 'AnonymousUsers']
    
    def display_download_button_check(self, request):
        return get_current_role().name in [ 'Admin']
    
class LogCrudView(BaseCrudView):
    page_title = "Logs"
    add_btn_title = "Add New Log"
    table = LogTable
    form = LogForm

    def has_add_perm(self, request):
        return True

    def display_add_button_check(self, request):
        return get_current_role().name in ['Admin', 'AnonymousUsers']
    
    def display_download_button_check(self, request):
        return get_current_role().name in [ 'Admin']
    
class OrderCrudView(BaseCrudView):
    page_title = "Orders"
    add_btn_title = "New Order"
    table = OrderTable
    form = OrderForm
    workflow = OrderWorkflow

    def has_add_perm(self, request):
        return True

    def display_add_button_check(self, request):
        return get_current_role().name in ['Franchisee']
    
    def display_download_button_check(self, request):
        return get_current_role().name in [ 'Admin']
    

