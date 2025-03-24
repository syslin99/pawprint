from rest_framework import serializers
from rest_polymorphic.serializers import PolymorphicSerializer

from ..models import Kind, Entry, Vitals, Picture


class KindSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    class Meta:
        model = Kind
        fields = ['id', 'name', 'category']

class EntrySerializer(serializers.ModelSerializer):
    kind = KindSerializer()
    caretakers = serializers.SerializerMethodField()
    class Meta:
        model = Entry
        fields = ['id', 'title', 'kind', 'recorded_on', 'caretakers', 'pets', 'notes', 'is_event', 'is_completed']

    def get_caretakers(self, obj):
        return obj.caretakers.values('id', 'name')

class VitalsSerializer(serializers.ModelSerializer):
    kind = KindSerializer()
    caretakers = serializers.SerializerMethodField()
    class Meta:
        model = Vitals
        fields = ['id', 'title', 'kind', 'measurement', 'recorded_on', 'caretakers', 'pets', 'notes', 'is_event', 'is_completed']

    def get_caretakers(self, obj):
        return obj.caretakers.values('id', 'name')

class EntryPolymorphicSerializer(PolymorphicSerializer):
    model_serializer_mapping = {
        Entry: EntrySerializer,
        Vitals: VitalsSerializer
    }

class PictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Picture
        fields = ['id', 'entry', 'image']
