from django.http import HttpResponse

from .models import Pet


def index(request):
    pet_list = Pet.objects.values_list('name', flat=True)
    output = '\n'.join(pet_list)
    return HttpResponse(output, content_type='text/plain')
