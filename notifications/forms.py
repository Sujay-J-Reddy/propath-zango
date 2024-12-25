from ..packages.crud.forms import BaseForm
from ..packages.crud.form_fields import ModelField, CustomSchemaField
from .models import Notification

class NotificationForm(BaseForm):
    details = ModelField(placeholder="Details",required=True, required_msg="This field is required")
    franchise = ModelField(placeholder="Select a franchise for specific notification, leave blank for general",required=False, extra_ui_schema={"ui:widget": "select"})

    class Meta:
        model = Notification
        title = "Notification Form"
        order = [
            "details",
            "franchise"
        ]

    def save(self, commit=True):
        instance = super().save(commit=False)
        if commit:
            instance.notification_type = "other"
            instance.account_type = "franchise"
            instance.save()
        return instance