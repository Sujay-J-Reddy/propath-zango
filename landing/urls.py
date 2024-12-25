from django.urls import path
from .views import EnquiryView, LandingView, AboutUsView, CoursesView, ContactView, AbacusView, AbacusCourseView, VedicCourseView, VedicMathsView

urlpatterns = [
    path('enquire/', EnquiryView.as_view(), name='enquiry'),
    path('courses/', CoursesView.as_view(), name='courses'),
    path('contact/', ContactView.as_view(), name='contact'),
    path('about/', AboutUsView.as_view(), name='about'),
    path('abacus/', AbacusView.as_view(), name='abacus'),
    path('vedic/', VedicMathsView.as_view(), name='vedic_maths'),
    path('abacus-course/', AbacusCourseView.as_view(), name='abacus_course'),
    path('vedic-course/', VedicCourseView.as_view(), name='vedic_course'),
    path('/',LandingView.as_view(), name='landing')
]