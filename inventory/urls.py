from django.urls import path
from .views import KitCrudView, VendorCrudView, ItemCrudView, LogCrudView, OrderCrudView, SchoolOrderCrudView

urlpatterns = [
    path('kits/', KitCrudView.as_view(), name='kit_crud'),
    path('vendors/', VendorCrudView.as_view(), name='vendor_crud'),
    path('items/', ItemCrudView.as_view(), name ="item_crud"),
    path('logs/', LogCrudView.as_view(), name="log_crud"),
    path('orders/', OrderCrudView.as_view(), name="order_crud"),
    path('school-orders/', SchoolOrderCrudView.as_view(), name="school_crud")
]