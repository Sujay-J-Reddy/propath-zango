from zango.core.utils import get_current_request
from .models import Franchisee
def get_current_franchise():

    req = get_current_request()
    user = req.user
    try:
        user = Franchisee.objects.get(user=user)
    except Franchisee.DoesNotExist:
        return None
    return user