from ..packages.crud.base import BaseForm
from ..notifications.models import Notification
from ..academy.models import Enquiry
from ..packages.crud.form_fields import ModelField

class EnquiryForm(BaseForm):
    name = ModelField(placeholder="Name", required=True, required_msg="This field is required")
    mail = ModelField(placeholder="Mail", required=True, required_msg="This field is required")
    type = ModelField(placeholder="Type", required=True, required_msg="This field is required")
    phone_country_code = ModelField(placeholder="Phone Country Code", required=True, required_msg="This field is required")
    phone_number = ModelField(placeholder="Phone Number", required=True, required_msg="This field is required")
    city = ModelField(placeholder="City", required=True, required_msg="This field is required")
    pin = ModelField(placeholder="Pin", required=True, required_msg="This field is required")
    state = ModelField(placeholder="State", required=True, required_msg="This field is required")
    country = ModelField(placeholder="Country", required=True, required_msg="This field is required")
    date = ModelField(placeholder="Date", required=True, required_msg="This field is required")

    class Meta:
        model = Enquiry
        title = "Enquiry Form"
        order = [
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

    def save(self, commit=True):
        instance = super().save(commit=False)
        if commit:
            Notification.objects.create(
                notification_type = "enquiry",
                account_type = "admin",
                details = "New enquiry made, please visit Enquiries page for more information."
            )
            instance.save()
        return instance
    
