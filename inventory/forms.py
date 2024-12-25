import json

from ..franchise.utils import get_current_franchise
from zango.core.utils import get_current_request
from ..packages.crud.forms import BaseForm
from ..packages.crud.form_fields import ModelField, CustomSchemaField
from .models import Vendor, Item, Kit, Log, Order, SchoolOrder
from ..notifications.models import Notification
from ..franchise.models import Franchisee
class VendorForm(BaseForm):
    name = ModelField(placeholder='Vendor Name',required=True, required_msg="This field is required")
    contact = ModelField(placeholder='Contact',required=True, required_msg="This field is required")
    location = ModelField(placeholder='Location',required=True, required_msg="This field is required")

    class Meta:
        model = Vendor
        title = "Vendor Form"
        order = [
            "name",
            "contact",
            "location"
        ]

class KitForm(BaseForm):
    name = ModelField(placeholder="Kit name", required=True, required_msg="This field is required")

    class Meta:
        model = Kit
        title = "Kit form"
        order = [
            "name"
        ]

class ItemForm(BaseForm):
    name = ModelField(placeholder="Item Name", required=True, required_msg="This field is required")
    description = ModelField(placeholder="Description", required=True, required_msg="This field is required")
    qty = ModelField(placeholder="Quantity", required=True, required_msg="This field is required")
    last_purchase_price = ModelField(placeholder="Last Purchase Price", required=True, required_msg="This field is required")
    kit = ModelField(placeholder="Kit", extra_ui_schema={"ui:widget": "select"})

    class Meta:
        model = Item
        title = "Item Form"
        order = [
            "name",
            "description",
            "qty",
            "last_purchase_price",
            "kit"
        ]

    def __init__(self, *args, **kwargs):
        super(ItemForm, self).__init__(*args, **kwargs)
        self.fields['kit'].choices=[(str(x.id), x.__str__()) for x in Kit.objects.all()]



class LogForm(BaseForm):
    vendor = ModelField(placeholder="Vendor", required=True, required_msg="This field is required")
    supply_items = CustomSchemaField(
        required=True,
        schema={
            "type": "array",
            "title": "Menu",
            "items": {
                "type": "object",
                "required": [
                    "item",
                    "qty"
                ],
                "properties": {
                    "item": {
                        "type": "string",
                        "title": "Name"
                    },
                    "qty": {
                        "type": "string",
                        "title": "Quantity",
                    
                    },
            }
        }
                },
        ui_schema={
            "items": {
        "item": {
          "ui:tooltip": "Item Name",
          "ui:classNames": "col-span-12 sm:col-span-6",
          "ui:widget": "select",
          "ui:placeholder": "Choose an Item",
          "ui:errorMessages": {
            "required": "This field is required."
          }
        },
        "qty": {
          "ui:tooltip": "Item Quantity",
          "ui:classNames": "col-span-12 sm:col-span-6",
          "ui:widget": "TextFieldWidget",
          "ui:placeholder": "Enter Item quantity",
          "ui:errorMessages": {
            "required": "This field is required."
          }
        },
      }
        }
    )

    class Meta:
        model = Log
        title = "Logs Form"
        order = [
            "vendor",
            "supply_items"
        ]

    def __init__(self, *args, **kwargs):
        super(LogForm, self).__init__(*args, **kwargs)
        instance = kwargs.get("instance")
        items = [str(item.pk) for item in  Item.objects.all()]
        self.custom_schema_fields["supply_items"].schema["items"]["properties"]["item"]["enum"] = items
        self.custom_schema_fields["supply_items"].schema["items"]["properties"]["item"]["enumNames"] = [obj.name for obj in Item.objects.all()]
        if instance is not None:
            self.update = True
            items = Item.objects.all().values_list("id")
            self.custom_schema_fields["supply_items"]["items"]["properties"]["item"]["enum"] = items
            self.custom_schema_fields["supply_items"]["items"]["properties"]["item"]["enumOptions"] = [obj.name for obj in Item.objects.all().values_list("name")]

    
    def save(self, commit=True):
        instance = super().save(commit=False)
        vendor = self.data.get("vendor")
        supply_items = self.data.get("supply_items")
        if commit:
            if supply_items is None:
                return instance
            instance.vendor_id = int(vendor)
            instance.items = supply_items
            item_info = json.loads(supply_items)
            for item in item_info:
                item_id = item["item"]
                quantity = int(item["qty"])
                log_item = Item.objects.get(id=item_id)
                new_qty = log_item.qty + quantity
                log_item.qty = new_qty
                log_item.save()
            instance.save()
        return instance
    
class OrderForm(BaseForm):
    order_items = CustomSchemaField(
        required=False,
        schema={
            "type": "array",
            "title": "Items",
            "items": {
                "type": "object",
                "required": [
                    "item",
                    "item_qty"
                ],
                "properties": {
                    "item": {
                        "type": "string",
                        "title": "Item"
                    },
                    "item_qty": {
                        "type": "string",
                        "title": "Quantity",
                        
                    }
                }
            }
        },
        ui_schema={
            "items": {
                "item": {
                    "ui:tooltip": "Item Name",
                    "ui:classNames": "col-span-12 sm:col-span-6",
                    "ui:widget": "select",
                    "ui:placeholder": "Choose an Item",
                    "ui:errorMessages": {
                        "required": "This field is required."
                    }
                },
                "item_qty": {
                    "ui:tooltip": "Item Quantity",
                    "ui:classNames": "col-span-12 sm:col-span-6",
                    "ui:widget": "TextFieldWidget",
                    "ui:placeholder": "Enter Item quantity",
                    "ui:errorMessages": {
                        "required": "This field is required."
                    }
                }
            }
        }
    )

    kits = CustomSchemaField(
        required=False,
        schema={
            "type": "array",
            "title": "Kits",
            "items": {
                "type": "object",
                "required": [
                    "kit",
                    "kit_qty"
                ],
                "properties": {
                    "kit": {
                        "type": "string",
                        "title": "Kit"
                    },
                    "kit_qty": {
                        "type": "string",
                        "title": "Quantity",
                    
                    }
                }
            }
        },
        ui_schema={
            "items": {
                "kit": {
                    "ui:tooltip": "Kit Name",
                    "ui:classNames": "col-span-12 sm:col-span-6",
                    "ui:widget": "select",
                    "ui:placeholder": "Choose a Kit",
                    "ui:errorMessages": {
                        "required": "This field is required."
                    }
                },
                "kit_qty": {
                    "ui:tooltip": "Kit Quantity",
                    "ui:classNames": "col-span-12 sm:col-span-6",
                    "ui:widget": "TextFieldWidget",
                    "ui:placeholder": "Enter Kit quantity",
                    "ui:errorMessages": {
                        "required": "This field is required."
                    }
                }
            }
        }
    )

    class Meta:
        model = Order
        title = "Order"
        order = [
            "order_items",
            "kits"
        ]

    def __init__(self, *args, **kwargs):
        super(OrderForm, self).__init__(*args, **kwargs)
        instance = kwargs.get("instance")
        items = [str(item.pk) for item in Item.objects.filter(kit=None)]
        kits = [str(kit.pk) for kit in Kit.objects.all()]
        self.custom_schema_fields["order_items"].schema["items"]["properties"]["item"]["enum"] = items
        self.custom_schema_fields["order_items"].schema["items"]["properties"]["item"]["enumNames"] = [obj.name for obj in Item.objects.filter(kit=None)]
        self.custom_schema_fields["kits"].schema["items"]["properties"]["kit"]["enum"] = kits
        self.custom_schema_fields["kits"].schema["items"]["properties"]["kit"]["enumNames"] = [obj.name for obj in Kit.objects.all()]
        if instance is not None:
            self.update = True
            items = Item.objects.filter(kit=None).values_list("id")
            kits = Kit.objects.all().values_list("id")
            self.custom_schema_fields["order_items"].schema["items"]["properties"]["item"]["enum"] = items
        self.custom_schema_fields["order_items"].schema["items"]["properties"]["item"]["enumNames"] = [obj.name for obj in Item.objects.filter(kit=None)]
        self.custom_schema_fields["kits"].schema["items"]["properties"]["kit"]["enum"] = kits
        self.custom_schema_fields["kits"].schema["items"]["properties"]["kit"]["enumNames"] = [obj.name for obj in Kit.objects.all()]

    def save(self, commit=True):
        instance = super().save(commit=False)
        order_items = self.data.get("order_items")
        franchise = get_current_franchise()
        kits = self.data.get("kits")
        if commit:
            if order_items is None and kits is None:
                return instance
            instance.items = order_items
            instance.kits = kits
            instance.franchise_id=franchise.id
            instance.save()
            franchise = Franchisee.objects.get(pk=instance.franchise_id)
            Notification.objects.create(
                notification_type = 'order',
                account_type = 'admin',
                details = f'Recieved a new order from {franchise.name}. Please visit the Orders page for more details.'
            )
        return instance
    
class SchoolOrderForm(OrderForm):
    school = ModelField(placeholder="School", required=True, required_msg="This field is required")

    class Meta:
        model = SchoolOrder
        title = "School Order"
        order = [
            "school",
            "order_items",
            "kits"
        ]