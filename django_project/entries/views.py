from django.http import HttpResponse

from .models import Entry


def index(request):
    entry_list = Entry.objects.values_list('title', flat=True)
    output = '\n'.join(entry_list)
    return HttpResponse(output, content_type='text/plain')
