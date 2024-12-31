from django.contrib import admin

from .models import Caretaker


class CaretakerAdmin(admin.ModelAdmin):
    # form customization
    fieldsets = [
        (None, {'fields': ['name']}),
        ('Login information', {'fields': ['email', 'password']}),
        ('Pet relationships', {'fields': ['pets']}),
        ('Contact relationships', {'fields': ['contacts']}),
    ]
    filter_horizontal = ('pets', 'contacts')
    # list customization
    list_display = ['id', 'name', 'email', 'password', 'get_pets', 'get_contacts']
    list_display_links = ['name']

    @admin.display(description='pets')
    def get_pets(self, obj):
        return [p.name for p in obj.pets.all()]

    @admin.display(description='contacts')
    def get_contacts(self, obj):
        return [c.name for c in obj.contacts.all()]

admin.site.register(Caretaker, CaretakerAdmin)
