from rest_framework import serializers

from ..models import Kind, Entry, Vitals, Picture


class KindSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    class Meta:
        model = Kind
        fields = ['id', 'name', 'category']

class EntrySerializer(serializers.ModelSerializer):
    kind = KindSerializer()
    class Meta:
        model = Entry
        fields = ['id', 'title', 'kind', 'recorded_on', 'caretakers', 'pets', 'notes', 'is_event', 'is_completed']

class VitalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vitals
        fields = ['id', 'title', 'kind', 'measurement', 'recorded_on', 'caretakers', 'pets', 'notes', 'is_event', 'is_completed']

class PictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Picture
        fields = ['id', 'entry', 'image']
