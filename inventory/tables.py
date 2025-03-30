from django.db.models import Q
from ..packages.crud.table.base import ModelTable
from ..packages.crud.table.column import ModelCol, StringCol
from ..packages.workflow.base.models import WorkflowTransaction
from .forms import KitForm, VendorForm, ItemForm, LogForm, OrderForm, SchoolOrderForm
from .models import Kit, Vendor, Item, Log, Order, SchoolOrder
from .details import OrderDetail, SchoolOrderDetail, LogDetail, KitDetail, ItemDetail, OrderDetail
from .utils import json_to_html_table
from zango.core.utils import get_current_role
from ..franchise.utils import get_current_franchise

class KitTable(ModelTable):
    name = ModelCol(display_as="Kit Name", sortable=True, searchable=True)
    active =  ModelCol(display_as = "Status", sortable=True)
    table_actions = []
    row_actions = [
        {
            "name": "Edit",
            "key": "edit_kit",
            "description": "Edit Kit",
            "type": "form",
            "form": KitForm,  # Specify the form to use for editing
            "roles": [
                "Admin"
            ],  # Specify roles that can perform the action
        },
        {
            "name": "Activate/Deactivate",
            "key": "deactivate_kit",
            "description": "Activate/Deactivate Kit",
            "type": "simple",
            "confirmation_message": "Are you sure?",
            "roles": ["Admin"]
        },
    ]

    class Meta:
        model = Kit
        detail_class = KitDetail
        fields = [
                    "name",
                    "active"
                 ]
        card_primary_fields = ["name"]

    def active_getval(self, obj):
        return "Active" if obj.active else "Inactive"

    def name_Q_obj(self, search_term):
        if search_term is not None:
            return Q(name__contains=search_term)
        return Q()  
    
    def process_row_action_deactivate_kit(self, request, obj):
        obj.active = not obj.active 
        obj.save()
        success = True
        response = {
            "message": "Marked as " + ("Active" if obj.active else "Inactive")
        }

        return success, response


    
class VendorTable(ModelTable):
    name = ModelCol(display_as="Vendor Name", searchable=True, sortable=True)
    contact = ModelCol(display_as="Contact", searchable=True, sortable=True)
    location = ModelCol(display_as="Location", searchable=True ,sortable=True)
    active = ModelCol(display_as="Status", sortable=True)
    table_actions = []
    row_actions =[
        {
            "name": "Edit",
            "key": "edit_vendor",
            "description": "Edit Vendor",
            "type": "form",
            "form": VendorForm,  # Specify the form to use for editing
            "roles": [
                "Admin"
            ],  # Specify roles that can perform the action
        },
        {
            "name": "Activate/Deactivate",
            "key": "deactivate_vendor",
            "description": "Activate/Deactivate Vendor",
            "type": "simple",
            "confirmation_message": "Are you sure?",
            "roles": ["Admin"]
        }
    ]

    class Meta:
        model = Vendor
        fields = [
            "name",
            "contact",
            "location"
        ]
        card_primary_fields = [ "contact","location"]

    def active_getval(self, obj):
        return "Active" if obj.active else "Inactive"

    def id_Q_obj(self, search_term):
        try:
            modified_id = int(search_term) 
        except ValueError:
            modified_id = None  # Not an integer, ignore
        if modified_id is not None:
            return Q(id=modified_id)
        return Q()
    
    def process_row_action_deactivate_vendor(self, request, obj):
        obj.active = not obj.active
        obj.save()
        success = True
        response = {"message": "Marked as " + ("Active" if obj.active else "Inactive")}
        return success, response

class ItemTable(ModelTable):
    name = ModelCol(display_as="Item Name", searchable=True, sortable=True)
    description = ModelCol(display_as="Description", searchable=True, sortable=True)
    qty = ModelCol(display_as="Quantity", searchable=True, sortable=True)
    last_purchase_price = ModelCol(display_as="Last Purchase Price", searchable=True, sortable=True)
    kit = ModelCol(display_as="Kit Name", searchable=True, sortable=True)
    table_actions = []
    row_actions = [
        {
            "name": "Edit",
            "key": "edit_item",
            "description": "Edit Item",
            "type": "form",
            "form": ItemForm,  # Specify the form to use for editing
            "roles": [
                "Admin"
            ],  # Specify roles that can perform the action
        },
        {
            "name": "Delete",
            "key": "delete_item",
            "description": "Delete Item",
            "type": "simple",
            "confirmation_message": "Are you sure you want to delete this Item?",
            "roles": ["Admin"]
        }
    ]

    class Meta:
        model = Item
        detail_class = ItemDetail
        fields = [
            "name",
            "description",
            "qty",
            "last_purchase_price",
            "kit",
        ]
        card_primary_fields = [ "qty","kit"]

    def process_row_action_delete_item(self, request, obj):
        obj.delete()
        success = True
        response = {
            "message": "Successfully deleted Item",
        }
        return success, response
        
    
    def kit_getval(self, obj):
        if obj.kit:
            return obj.kit.name
        return "None"
    
    def name_Q_obj(self, search_term):
        if search_term is not None:
            return Q(name__contains=search_term)
        return Q()

    def contact_Q_obj(self, search_term):
        if search_term is not None:
            return Q(contact__contains=search_term)
        return Q()

    def location_Q_obj(self, search_term):
        if search_term is not None:
            return Q(location__contains=search_term)
        return Q()

class LogTable(ModelTable):
    vendor = ModelCol(display_as="Vendor Name", searchable=True, sortable=True)
    date = ModelCol(display_as="Date", searchable=True, sortable=True)
    items = ModelCol(display_as="Items", searchable=True, sortable=True)
    table_actions = []
    row_actions = [
        {
            "name": "Edit",
            "key": "edit",
            "description": "Edit Logs",
            "type": "form",
            "form": LogForm,  # Specify the form to use for editing
            "roles": [
                "Admin"
            ],  # Specify roles that can perform the action
        }
    ]

    class Meta:
        model = Log
        detail_class = LogDetail
        fields = [
            "vendor",
            "date",
            "items"
        ]
        card_primary_fields = [ "date"]

    def items_getval(self, obj):
        html = json_to_html_table(obj.items)
        return html
    
    def vendor_getval(self, obj):
        return f"{obj.vendor.name}"

    def vendor_Q_obj(self, search_term):
        if search_term is not None:
            return Q(vendor__name__contains=search_term)
        return Q()

    def date_Q_obj(self, search_term):
        if search_term is not None:
            return Q(date__contains=search_term)
        return Q()

    def items_Q_obj(self, search_term):
        if search_term is not None:
            return Q(items__contains=search_term)
        return Q()
    
class OrderTable(ModelTable):
    id = ModelCol(display_as="DC Number", searchable=True, sortable=True)
    franchise = ModelCol(display_as="Franchise", searchable=True, sortable=True, user_roles=["Admin"])
    location = ModelCol(display_as="Location", searchable=True, sortable=True)
    kits = ModelCol(display_as="Kits", searchable=True, sortable=True)
    items = ModelCol(display_as="Items", searchable=True, sortable=True)
    order_date = ModelCol(display_as="Order Date", searchable=True, sortable=True)
    status = StringCol(display_as="Status", searchable=False, sortable=False)
    table_actions = []
    row_actions = []

    class Meta:
        model = Order
        detail_class = OrderDetail
        fields = [
            "id",
            "franchise",
            "location",
            "kits",
            "items",
            "order_date",
        ]
        card_primary_fields = ["id", "order_date"]

    def id_Q_obj(self, search_term):
        try:
            modified_id = int(search_term) 
        except ValueError:
            modified_id = None  # Not an integer, ignore
        if modified_id is not None:
            return Q(id=modified_id)
        return Q()
    
    def kits_getval(self, obj):
        if obj.kits != None:
            html = json_to_html_table(obj.kits)
            return html
        return "None"
    
    def items_getval(self, obj):
        if obj.items != None:
            html = json_to_html_table(obj.items)
            return html
        return "None"
    
    def status_getval(self, obj):
        try:
            queryset = WorkflowTransaction.objects.filter(obj_uuid=obj.object_uuid).order_by('-created_at').first()
        except WorkflowTransaction.DoesNotExist:
            return "Pending"
        return queryset.to_state.title()
    
    def get_table_data_queryset(self):
        queryset = super().get_table_data_queryset()
        role = get_current_role()
        if role.name == 'Franchisee':
            return queryset.filter(franchise = get_current_franchise())
        else:
            return queryset
        
    def franchise_Q_obj(self, search_term):
        if search_term is not None:
            return Q(franchise__name__contains=search_term)
        return Q()

    def kits_Q_obj(self, search_term):
        if search_term is not None:
            return Q(kits__contains=search_term)
        return Q()

    def items_Q_obj(self, search_term):
        if search_term is not None:
            return Q(items__contains=search_term)
        return Q()

    def order_date_Q_obj(self, search_term):
        if search_term is not None:
            return Q(order_date__contains=search_term)
        return Q()
    
class SchoolOrderTable(OrderTable):
    id = ModelCol(display_as="Order ID", searchable=True, sortable=True)
    school = ModelCol(display_as="School", searchable=True, sortable=True)
    kits = ModelCol(display_as="Kits", searchable=True, sortable=True)
    items = ModelCol(display_as="Items", searchable=True, sortable=True)
    order_date = ModelCol(display_as="Order Date", searchable=True, sortable=True)
    table_actions = []
    row_actions = []

    class Meta:
        model = SchoolOrder
        detail_class = SchoolOrderDetail
        fields = [
            "id",
            "school",
            "kits",
            "items",
            "order_date",
        ]
        card_primary_fields = ["id", "order_date"]

    def kits_getval(self, obj):
        if obj.kits != None:
            html = json_to_html_table(obj.kits)
            return html
        return "None"
    
    def items_getval(self, obj):
        if obj.items != None:
            html = json_to_html_table(obj.items)
            return html
        return "None"
    
    def school_getval(self, obj):
        return obj.school.name
    
    def school_Q_obj(self, search_term):
        if search_term is not None:
            return Q(school__name__contains=search_term)
        return Q()

    def kits_Q_obj(self, search_term):
        if search_term is not None:
            return Q(kits__contains=search_term)
        return Q()

    def items_Q_obj(self, search_term):
        if search_term is not None:
            return Q(items__contains=search_term)
        return Q()

    def order_date_Q_obj(self, search_term):
        if search_term is not None:
            return Q(order_date__contains=search_term)
        return Q()

