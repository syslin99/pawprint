from django.shortcuts import HttpResponse

from .models import Caretaker


def index(request):
    caretaker_list = Caretaker.objects.values_list('name', flat=True)
    output = '\n'.join(caretaker_list)
    return HttpResponse(output, content_type='text/plain')
