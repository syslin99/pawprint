from django.contrib import admin

from .models import Pet


class PetAdmin(admin.ModelAdmin):
    # form customization
    fieldsets = [
        ('Profile', {'fields': ['name', 'birthdate', 'sex', 'breed', 'chip', 'image']}),
        ('Contact relationships', {'fields': ['contacts']}),
    ]
    filter_horizontal = ('contacts',)
    # list customization
    list_display = ['id', 'name', 'birthdate', 'sex', 'breed', 'chip', 'get_caretakers', 'get_contacts']
    list_display_links = ['name']

    @admin.display(description='caretakers')
    def get_caretakers(self, obj):
        return [c.name for c in obj.caretakers.all()]

    @admin.display(description='contacts')
    def get_contacts(self, obj):
        return [c.name for c in obj.contacts.all()]

admin.site.register(Pet, PetAdmin)
