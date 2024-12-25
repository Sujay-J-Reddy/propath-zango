from ..packages.crud.detail.base import BaseDetail
from ..packages.crud.table.column import ModelCol, StringCol

class TeacherDetail(BaseDetail):

    def get_title(self, obj, object_data):
        return f"{obj.name}"
    

class InstructorFeedbackDetail(BaseDetail):

    def get_title(self, obj, object_data):
        return f"{obj.teacher.name}'s feedback"