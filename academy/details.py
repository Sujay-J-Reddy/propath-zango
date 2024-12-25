from ..packages.crud.detail.base import BaseDetail
from ..packages.crud.table.column import ModelCol, StringCol
from .models import CompetitionStudent
from django.db.models import Q

class SchoolStudentDetail(BaseDetail):
    def get_title(self, obj, object_data):
        return f"{obj.name}"

class CompetitionStudentDetail(BaseDetail):
    competition = ModelCol(display_as="Competition")
    franchise = ModelCol(display_as="Franchise")
    student = ModelCol(display_as="Student")
    date = ModelCol(display_as="Date")

    class Meta:
        fields = [
            "competition",
            "franchise",
            "student",
            "date"
        ]

    def get_title(self, obj, object_data):
        return f"{obj.competition.circular_no} registration from {obj.franchise.name}"

    def student_getval(self, obj):
        competitions = CompetitionStudent.objects.filter(franchise=obj.franchise, competition=obj.competition)
        html_table = "<table border='1' style='border-collapse: collapse;'>\n"  # Inline CSS for solid borders
        html_table += "<tr><th style='border: 1px solid black;'>ID</th><th style='border: 1px solid black;'>Name</th></tr>\n"

        for competition in competitions:
            html_table += f"<tr><td style='border: 1px solid black;'>{competition.student.s_id}</td><td style='border: 1px solid black;'>{competition.student.name}</td></tr>\n"

        html_table += "</table>"
        return html_table

class SchoolDetail(BaseDetail):
    def get_title(self, obj, object_data):
        return f"{obj.name}"

class CompetitionResultDetail(BaseDetail):
    def get_title(self, obj, object_data):
        return f"{obj.student.s_id} - {obj.student.name}'s Rank in {obj.competition.name}"

class CompetitionDetail(BaseDetail):
    def get_title(self, obj, object_data):
        return f"{obj.circular_no} - {obj.name}"

class EventDetail(BaseDetail):
    name = ModelCol(display_as="Name")
    date = ModelCol(display_as="Date")
    photo = ModelCol(display_as="Photo")
    details = ModelCol(display_as="Details")

    class Meta:
        fields = [
            "name",
            "date",
            "photo",
            "details",
        ]

    def photo_getval(self, obj):
        return f"<img src = {obj.photo.url}>"
    
    def get_title(self, obj, object_data):
        return f"{obj.name}"
    
class EnquiryDetail(BaseDetail):

    def get_title(self, obj, object_data):
        return f"{obj.name}' s Enquiry"