from django.urls import path
from .views import check_birthdays, EventCrudView, EnquiryDataView, CompetitionCrudView, CompetitionResultCrudView, CompetitionStudentCrudView, SchoolCrudView, SchoolStudentCrudView, StatCrudView, TestimonialCrudView
from ..franchise.views import LevelCertificateCrudView

urlpatterns = [
    path('competition/results/', CompetitionResultCrudView.as_view(), name='results_crud'),
    path('competition/registrations/', CompetitionStudentCrudView.as_view(), name='student_crud'),
    path('schools/students/', SchoolStudentCrudView.as_view(), name='school_student_crud'),
    path('schools/',SchoolCrudView.as_view(), name='school_crud'),
    path('competitions/', CompetitionCrudView.as_view(), name='competition_crud'),
    path('certificates/', LevelCertificateCrudView.as_view(), name='certificates_crud'),
    path('enquiries/', EnquiryDataView.as_view(), name="enquiry_data"),
    path('stats/', StatCrudView.as_view(), name="stat_crud"),
    path('events/', EventCrudView.as_view(), name="event_crud"),
    path('birthdays/',check_birthdays, name="birthdays"),
    path('testimonials/', TestimonialCrudView.as_view(), name="testimonial_crud")
]
