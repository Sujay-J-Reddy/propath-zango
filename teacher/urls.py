from django.urls import path
from .views import TeacherCrudView, InstructorFeedbackCrudView

urlpatterns = [
    path('feedback/', InstructorFeedbackCrudView.as_view(), name='feedback_crud'),
    path('profile/', TeacherCrudView.as_view(), name='teacher_crud'),
]