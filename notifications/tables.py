from django.db.models import Q
from ..packages.crud.table.base import ModelTable
from ..packages.crud.table.column import ModelCol, StringCol
from .forms import NotificationForm
from .models import Notification
from zango.core.utils import get_current_role
from ..franchise.utils import get_current_franchise

class NotificationTable(ModelTable):
    date = ModelCol(display_as="Date", searchable=True, sortable=True)
    notification_type = ModelCol(display_as="Type", searchable=True, sortable=True)
    details = ModelCol(display_as="Details", searchable=True, sortable=True)
    table_actions = []
    row_actions = [
        # {
        #     "name": "Edit",
        #     "key": "edit",
        #     "description": "Edit Notification",
        #     "type": "form",
        #     "form": NotificationForm,  # Specify the form to use for editing
        #     "roles": [
        #         "Admin", "AnonymousUsers"
        #     ],  # Specify roles that can perform the action
        # },
        {
            "name": "Add",
            "key": "add_notification",
            "description": "Add a notification",
            "type": "form",
            "form": NotificationForm,  # Specify the form to use for editing
            "roles": [
                "Admin"
            ],  # Specify roles that can perform the action
        }
    ]


    class Meta:
        model = Notification
        fields =[
            "date",
            "notification_type",
            "details"
        ]
        card_primary_fields = ["date"]

    def id_Q_obj(self, search_term):
        try:
            modified_id = int(search_term) 
        except ValueError:
            modified_id = None  # Not an integer, ignore
        if modified_id is not None:
            return Q(id=modified_id)
        return Q()
    
    def get_table_data_queryset(self):
        role = get_current_role()
        queryset = super().get_table_data_queryset()
        if role.name ==  'Admin':
            return queryset.filter(account_type='admin')
        elif role.name == 'Teacher':
            return queryset.filter(account_type='teacher')
        else:
            return  queryset.filter(Q(account_type__in=['franchise', 'teacher']) & (Q(franchise=get_current_franchise()) | Q(franchise=None)))
        

    