from rest_framework import serializers

from ..models import Entry, Vitals, Picture


class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = ['id', 'title', 'kind', 'recorded_on', 'caretakers', 'pets', 'notes', 'is_event']

class VitalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vitals
        fields = ['id', 'entry', 'measurement', 'unit']

class PictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Picture
        fields = ['id', 'entry', 'image']
