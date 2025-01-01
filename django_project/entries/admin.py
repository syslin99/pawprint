from django.contrib import admin

from .models import Category, Kind, Entry, Vitals, Picture


admin.site.register(Category)

class KindAdmin(admin.ModelAdmin):
    # form customization
    search_fields = ['name']
    # list customization
    list_display = ['name', 'category']

admin.site.register(Kind, KindAdmin)

class EntryAdmin(admin.ModelAdmin):
    # form customization
    fieldsets = [
        ('General information', {'fields': ['title', 'kind', 'recorded_on']}),
        ('Caretakers and Pets', {'fields': ['caretakers', 'pets']}),
        ('Additional information', {'fields': ['notes', 'is_event']}),
    ]
    filter_horizontal = ('caretakers', 'pets')
    autocomplete_fields = ['kind']
    # list customization
    list_display = ['id', 'title', 'kind', 'recorded_on', 'get_caretakers', 'get_pets', 'notes', 'is_event']
    list_display_links = ['title']

    @admin.display(description='caretakers')
    def get_caretakers(self, obj):
        return [c.name for c in obj.caretakers.all()]

    @admin.display(description='pets')
    def get_pets(self, obj):
        return [p.name for p in obj.pets.all()]

admin.site.register(Entry, EntryAdmin)

class VitalsAdmin(admin.ModelAdmin):
    # form customization
    fieldsets = [
        (None, {'fields': ['entry']}),
        ('Vitals reading', {'fields': ['measurement', 'unit']}),
    ]
    # list customization
    list_display = ['id', 'entry', 'measurement', 'unit', 'get_pet', 'get_date']
    list_display_links = ['measurement']

    @admin.display(description='pet')
    def get_pet(self, obj):
        return obj.entry.pets.get()

    @admin.display(description='date recorded')
    def get_date(self, obj):
        return obj.entry.recorded_on

admin.site.register(Vitals, VitalsAdmin)

class PictureAdmin(admin.ModelAdmin):
    # form customization
    fieldsets = [
        (None, {'fields': ['entry']}),
        ('Picture', {'fields': ['image']}),
    ]
    # list customization
    list_display = ['id', 'entry', 'image']
    list_display_links = ['image']

admin.site.register(Picture, PictureAdmin)