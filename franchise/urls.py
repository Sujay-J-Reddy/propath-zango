from django.urls import path
from .views import FranchiseeCrudView, StudentCrudView, LevelCertificateCrudView, CourseStartDateView

urlpatterns = [
    path('franchisees/', FranchiseeCrudView.as_view(), name='franchisee_crud'),
    path('students/course-start-date/',CourseStartDateView.as_view(), name='course_start_date'),
    path('students/', StudentCrudView.as_view(), name='students_crud'),
    path('certificates/', LevelCertificateCrudView.as_view(), name='certificates_crud')
]
