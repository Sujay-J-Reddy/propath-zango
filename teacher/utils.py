from zango.core.utils import get_current_request
from .models import Teacher
def get_current_teacher():

    req = get_current_request()
    user = req.user
    try:
        user = Teacher.objects.get(user=user)
    except Teacher.DoesNotExist:
        return None
    return user