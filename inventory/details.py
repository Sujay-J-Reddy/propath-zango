from ..packages.crud.detail.base import BaseDetail
from ..packages.crud.table.column import ModelCol, StringCol
from .utils import json_to_html_table
    
class KitDetail(BaseDetail):
    def get_title(self, obj):
        return obj.name
    
class ItemDetail(BaseDetail):
    def get_title(self, obj, object_data):
        return obj.name

class LogDetail(BaseDetail):
    vendor = ModelCol(display_as="Vendor")
    items = ModelCol(display_as="Items")
    date = ModelCol(display_as="Date")

    class Meta:
        fields = [
            "vendor",
            "items",
            "date",
        ]

    def get_title(self, obj, object_data):
        return f"{obj.date}'s order from {obj.vendor.name}"
    
    def items_getval(self, obj):
        html = json_to_html_table(obj.items)
        return html
    
    def vendor_getval(self, obj):
        return obj.vendor.name

class SchoolOrderDetail(BaseDetail):
    id = ModelCol(display_as="Order ID")
    school = ModelCol(display_as="School")
    kits = ModelCol(display_as="Kits")
    items = ModelCol(display_as="Items")
    order_date = ModelCol(display_as="Order Date")
    delivery_date = ModelCol(display_as="Delivery Date")

    class Meta:
        # model = SchoolOrder
        fields = [
            "id",
            "school",
            "kits",
            "items",
            "order_date",
            "delivery_date",
        ]

    def school_getval(self, obj):
        return obj.school.name
    def get_title(self, obj, object_data):
        return f'Order ID : {obj.id}'
    
    def kits_getval(self, obj):
        if obj.kits != None:
            html = json_to_html_table(obj.kits)
            return html
        return "NA"
    
    def items_getval(self, obj):
        if obj.items != None:
            html = json_to_html_table(obj.items)
            return html
        return "NA"

class OrderDetail(BaseDetail):
    id = ModelCol(display_as="DC Number")
    franchise = ModelCol(display_as="Franchise")
    kits = ModelCol(display_as="Kits")
    items = ModelCol(display_as="Items")
    order_date = ModelCol(display_as="Order Date")
    delivery_date = ModelCol(display_as="Delivery Date")

    class Meta:
        fields = [
            "id",
            "franchise",
            "kits",
            "items",
            "order_date",
            "delivery_date",
        ]

    def get_title(self, obj, object_data):
        """
        Return the title for the adverse event based on the patient's first and last name.

        Parameters:
            self: the instance of the class
            obj: the object containing patient information
            object_data: additional data related to the object

        Returns:
            str: the title for the adverse event
        """
        return f'DC Number: {obj.id}'
    
    def franchise_getval(self, obj):
        return obj.franchise.name
    
    def kits_getval(self, obj):
        if obj.kits != None:
            html = json_to_html_table(obj.kits)
            return html
        return "NA"
    
    def items_getval(self, obj):
        if obj.items != None:
            html = json_to_html_table(obj.items)
            return html
        return "NA"
    