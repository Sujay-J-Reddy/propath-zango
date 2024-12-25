from django.urls import path
from .views import NotificationCrudView

urlpatterns = [
    path('inbox/', NotificationCrudView.as_view(), name='notification_crud')
]