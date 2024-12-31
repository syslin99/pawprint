from django.http import HttpResponse

from .models import Contact


def index(request):
    contact_list = Contact.objects.values_list('name', flat=True)
    output = '\n'.join(contact_list)
    return HttpResponse(output, content_type='text/plain')
