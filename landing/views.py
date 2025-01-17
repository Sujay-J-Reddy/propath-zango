from datetime import timedelta
from django.shortcuts import render
from ..packages.crud.base import BaseFormOnlyView
from django.views.generic import TemplateView, FormView
from .forms import EnquiryForm
from ..academy.models import Event, Stat, Testimonial
from django.utils.timezone import now
from zango.apps.shared.tenancy.templatetags.zstatic import zstatic
from .forms import PostForm
from ..academy.models import Enquiry
from django.contrib import messages
from django.shortcuts import redirect


class LandingView(TemplateView):
    template_name = 'landing/home.html'

    def post(self, request, *args, **kwargs):

        enquiry = Enquiry(
            name=request.POST.get('name'),
            mail=request.POST.get('email'),
            phone_country_code=request.POST.get('countryCode'),
            phone_number=request.POST.get('phone_number'),
            city=request.POST.get('city'),
            pin=request.POST.get('pin'),
            state=request.POST.get('state'),
            country=request.POST.get('country'),
            type=request.POST.get('type')
        )

        enquiry.save()  # Save to database

            
        # Add a success message
        messages.success(request, 'Enquiry submitted successfully.')
        
        # Redirect with a success flag
        return redirect(f"{request.path}?success=true")
        

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        default_photo = zstatic({"request": self.request},'packages/styles/images/landing/hero1.jpg')
        context['default_photo_url'] = default_photo
        events_queryset = Event.objects.all().order_by('-date')[:3]
        sample_events = [
            Event(name="Sample Event 1", date=now().date() - timedelta(days=1), details="Details of Sample Event 1"),
            Event(name="Sample Event 2", date=now().date() - timedelta(days=2), details="Details of Sample Event 2"),
            Event(name="Sample Event 3", date=now().date() - timedelta(days=3), details="Details of Sample Event 3"),
        ]
        testimonials_queryset = Testimonial.objects.all().order_by('-date')[:2]
        sample_testimonials = [
            Testimonial(name="Sample Testimonial 1", date=now().date() - timedelta(days=1), designation="Sample Designation 1", quote="Sample Quote 1"),
            Testimonial(name="Sample Testimonial 2", date=now().date() - timedelta(days=2), designation="Sample Designation 2", quote="Sample Quote 2"),
        ]

        actual_testimonials = list(testimonials_queryset)
 

        actual_events = list(events_queryset)
        for i in range(3):
            if i < len(actual_events):
                context[f'event{i+1}'] = actual_events[i]
            else:
                context[f'event{i+1}'] = sample_events[i]

        try:
            numbers = Stat.objects.latest('created_at')
        except Stat.DoesNotExist:
            numbers = Stat(students=0, teachers=0, franchises=0)  

        context['numbers'] = numbers
        try:
            context['testimonial1'] = actual_testimonials[0]
        except IndexError:
            context['testimonial1'] = sample_testimonials[0]

        try:
            context['testimonial2'] = actual_testimonials[1]
        except IndexError:
            context['testimonial2'] = sample_testimonials[1]


        return context


class CoursesView(TemplateView):
    template_name = 'landing/courses.html'

class ContactView(TemplateView):
    template_name = 'landing/contact.html'

class AbacusView(TemplateView):
    template_name = 'landing/abacus.html'

class AbacusCourseView(TemplateView):
    template_name = 'landing/abacuscourse.html'

class VedicMathsView(TemplateView):
    template_name = 'landing/vedicmaths.html'

class VedicCourseView(TemplateView):
    template_name = 'landing/vediccourse.html'
class AboutUsView(TemplateView):
    template_name = 'landing/about_us.html'

class HandwritingView(TemplateView):
    template_name = 'landing/handwriting.html'

class HandwritingCourseView(TemplateView):
    template_name = 'landing/handwritingcourse.html'

class EnquiryView(BaseFormOnlyView):
    form = EnquiryForm
    success_url = '/'
    page_title = "Enquiry Form"



