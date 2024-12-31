from django.contrib import admin

from .models import Contact


class ContactAdmin(admin.ModelAdmin):
    # form customization
    fieldsets = [
        ('Identity', {'fields': ['name', 'role', 'organization']}),
        ('Contact Information', {'fields': ['phone', 'email', 'address']}),
    ]
    # list customization
    list_display = ['id', 'name', 'role', 'organization', 'phone', 'email', 'address']
    list_display_links = ['name']

admin.site.register(Contact, ContactAdmin)
