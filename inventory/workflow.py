import json
from ..packages.workflow.base.engine import WorkflowBase
from datetime import datetime
from django.utils import timezone
from .forms import LogForm, OrderForm
from .models import Log, Order, Item, Kit, SchoolOrder
from ..notifications.models import Notification
from ..franchise.models import Franchisee

class OrderWorkflow(WorkflowBase):
    status_transitions = [
        {
            "name": "pending",
            "display_name": "Pending",
            "description": "Pending Orders",
            "from": "complete",
            "to": "pending",
        },
        {
            "name": "completed",
            "from": "pending",
            "to": "completed",
            "display_name": "Completed",
            "description": "Complete Order",
            "confirmation_message": "Are you sure you want to mark order as completed?",
        },
    ]

    def pending_condition(self, request, object_instance, **kwargs):
        """
        Checks if the conditions are met to execute the 'inactivate' status transition.
        Parameters:
            request (HttpRequest): The HTTP request object.
            object_instance (Patient): The instance of the Patient model.
            **kwargs: Additional keyword arguments.

        Returns:
            bool: True if the conditions are met, False otherwise.
        """
        # Implement condition logic here
        return True

    def pending_done(self, request, object_instance, transaction_obj):
        """
        Executes processing logic for the 'inactivate' status transition.

        Parameters:
            request (HttpRequest): The HTTP request object.
            object_instance (Patient): The instance of the Patient model.
            transaction_obj (TransactionModel): The associated transaction model object.
        """
        pass

    def completed_condition(self, request, object_instance, **kwargs):
        """
        Checks if the conditions are met to execute the 'activate' status transition.

        Parameters:
            request (HttpRequest): The HTTP request object.
            object_instance (Patient): The instance of the Patient model.
            **kwargs: Additional keyword arguments.

        Returns:
            bool: True if the conditions are met, False otherwise.
        """
        # Implement condition logic here
        items_info = object_instance.items
        kits_info = object_instance.kits
        items = json.loads(items_info) if items_info and items_info != "NULL" else []
        kits = json.loads(kits_info) if kits_info and kits_info != "NULL" else []

        if items:
            for item in items:
                item_id = item.get('item')
                qty = int(item.get('item_qty'))
                supply_item = Item.objects.get(id=item_id)
                new_qty = int(supply_item.qty)-qty
                if new_qty < 0:
                    return False
                
        if kits:
            for kit in kits:
                kit_no = int(kit.get('kit'))
                qty = int(kit.get('kit_qty'))
                supply_items = Item.objects.filter(kit_id=kit_no)
                for item in supply_items:
                    new_qty = item.qty - qty
                    if new_qty < 0:
                        return False
        return True

    def completed_done(self, request, object_instance, transaction_obj):
        """
        Executes processing logic for the 'activate' status transition.

        Parameters:
            request (HttpRequest): The HTTP request object.
            object_instance (Patient): The instance of the Patient model.
            transaction_obj (TransactionModel): The associated transaction model object.
        """
        # Implement processing logic here
        items_info = object_instance.items
        kits_info = object_instance.kits
        items = json.loads(items_info) if items_info and items_info != "NULL" else []
        kits = json.loads(kits_info) if kits_info and kits_info != "NULL" else []

        if items:
            for item in items:
                item_id = item.get('item')
                qty = int(item.get('item_qty'))
                supply_item = Item.objects.get(id=item_id)
                new_qty = int(supply_item.qty)-qty
                supply_item.qty = new_qty
                supply_item.save()
        
        if kits:
            for kit in kits:
                kit_no = int(kit.get('kit'))
                qty = int(kit.get('kit_qty'))
                supply_items = Item.objects.filter(kit_id=kit_no)
                for item in supply_items:
                    new_qty = item.qty - qty
                    item.qty = new_qty
                    item.save()

        object_instance.delivery_date = timezone.now()
        object_instance.save()
        Notification.objects.create(
            account_type="franchise",
            notification_type = "order",
            franchise_id = object_instance.franchise.id,
            details = f'Dear {object_instance.franchise.name} your order with DC number: {object_instance.id} has been sent out for delivery successfully.'
        )


    class Meta:
        statuses = {
            "pending": {
                "color": "#00FFFF",
                "label": "Pending",
            },
            "completed": {
                "color": "#008000",
                "label": "Completed",
            },
        }
        model = Order
        on_create_status = "pending"

class SchoolOrderWorkflow(OrderWorkflow):
    status_transitions = [
        {
            "name": "pending",
            "display_name": "Pending",
            "description": "Pending Orders",
            "from": "complete",
            "to": "pending",
        },
        {
            "name": "completed",
            "from": "pending",
            "to": "completed",
            "display_name": "Completed",
            "description": "Complete Order",
            "confirmation_message": "Are you sure you want to mark order as completed?",
        },
    ]

    def pending_condition(self, request, object_instance, **kwargs):
        """
        Checks if the conditions are met to execute the 'inactivate' status transition.
        Parameters:
            request (HttpRequest): The HTTP request object.
            object_instance (Patient): The instance of the Patient model.
            **kwargs: Additional keyword arguments.

        Returns:
            bool: True if the conditions are met, False otherwise.
        """
        # Implement condition logic here
        return True

    def pending_done(self, request, object_instance, transaction_obj):
        """
        Executes processing logic for the 'inactivate' status transition.

        Parameters:
            request (HttpRequest): The HTTP request object.
            object_instance (Patient): The instance of the Patient model.
            transaction_obj (TransactionModel): The associated transaction model object.
        """
        pass

    def completed_condition(self, request, object_instance, **kwargs):
        """
        Checks if the conditions are met to execute the 'activate' status transition.

        Parameters:
            request (HttpRequest): The HTTP request object.
            object_instance (Patient): The instance of the Patient model.
            **kwargs: Additional keyword arguments.

        Returns:
            bool: True if the conditions are met, False otherwise.
        """
        # Implement condition logic here

        items_info = object_instance.items
        kits_info = object_instance.kits
        items = json.loads(items_info) if items_info and items_info != "NULL" else []
        kits = json.loads(kits_info) if kits_info and kits_info != "NULL" else []

        if items:
            for item in items:
                item_id = item.get('item')
                qty = int(item.get('item_qty'))
                supply_item = Item.objects.get(id=item_id)
                new_qty = int(supply_item.qty)-qty
                if new_qty < 0:
                    return False
                
        if kits:
            for kit in kits:
                kit_no = int(kit.get('kit'))
                qty = int(kit.get('kit_qty'))
                supply_items = Item.objects.filter(kit_id=kit_no)
                for item in supply_items:
                    new_qty = item.qty - qty
                    if new_qty < 0:
                        return False
        return True

    def completed_done(self, request, object_instance, transaction_obj):
        """
        Executes processing logic for the 'activate' status transition.

        Parameters:
            request (HttpRequest): The HTTP request object.
            object_instance (Patient): The instance of the Patient model.
            transaction_obj (TransactionModel): The associated transaction model object.
        """
        # Implement processing logic here
        items_info = object_instance.items
        kits_info = object_instance.kits
        items = json.loads(items_info) if items_info and items_info != "NULL" else []
        kits = json.loads(kits_info) if kits_info and kits_info != "NULL" else []

        if items:
            for item in items:
                item_id = item.get('item')
                qty = int(item.get('item_qty'))
                supply_item = Item.objects.get(id=item_id)
                new_qty = int(supply_item.qty)-qty
                if new_qty < 0:
                    pass #implement low supply alert
                supply_item.qty = new_qty
                supply_item.save()
        
        if kits:
            for kit in kits:
                kit_no = int(kit.get('kit'))
                qty = int(kit.get('kit_qty'))
                supply_items = Item.objects.filter(kit_id=kit_no)
                for item in supply_items:
                    new_qty = item.qty - qty
                    if new_qty < 0:
                        pass #implement low supply alert
                    item.qty = new_qty
                    item.save()

        object_instance.delivery_date = datetime.now()
        object_instance.save()

    class Meta:
        statuses = {
            "pending": {
                "color": "#00FFFF",
                "label": "Pending",
            },
            "completed": {
                "color": "#008000",
                "label": "Completed",
            },
        }
        model = SchoolOrder
        on_create_status = "pending"