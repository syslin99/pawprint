from rest_framework import serializers
from rest_polymorphic.serializers import PolymorphicSerializer

from ..models import Kind, Entry, Vitals, Picture
from caretakers.models import Caretaker
from pets.models import Pet


class KindSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    class Meta:
        model = Kind
        fields = ['id', 'name', 'category']
        read_only_fields = ['id']

class EntryListRetrieveSerializer(serializers.ModelSerializer):
    kind = KindSerializer(read_only=True)
    caretakers = serializers.SerializerMethodField()
    pets = serializers.SerializerMethodField()
    pictures = serializers.SerializerMethodField()
    class Meta:
        model = Entry
        fields = ['id', 'title', 'kind', 'recorded_on', 'caretakers', 'pets', 'notes', 'is_event', 'is_completed', 'pictures']
        read_only_fields = ['id']

    def get_caretakers(self, obj):
        return obj.caretakers.values('id', 'name')
    def get_pets(self, obj):
        return obj.pets.values('id', 'name')
    def get_pictures(self, obj):
        picture = obj.pictures.all()
        pictures = PictureSerializer(instance=picture, many=True, context=self.context).data
        return [p['image'] for p in pictures]

class EntryCreateUpdateSerializer(serializers.ModelSerializer):
    kind = serializers.PrimaryKeyRelatedField(queryset=Kind.objects.all())
    caretakers = serializers.PrimaryKeyRelatedField(queryset=Caretaker.objects.all(), many=True)
    pets = serializers.PrimaryKeyRelatedField(queryset=Pet.objects.all(), many=True)
    class Meta:
        model = Entry
        fields = ['id', 'title', 'kind', 'recorded_on', 'caretakers', 'pets', 'notes', 'is_event', 'is_completed', 'pictures']
        read_only_fields = ['id']

class VitalsListRetrieveSerializer(serializers.ModelSerializer):
    kind = KindSerializer()
    caretakers = serializers.SerializerMethodField()
    pets = serializers.SerializerMethodField()
    pictures = serializers.SerializerMethodField()
    class Meta:
        model = Vitals
        fields = ['id', 'title', 'kind', 'measurement', 'recorded_on', 'caretakers', 'pets', 'notes', 'is_event', 'is_completed', 'pictures']
        read_only_fields = ['id']

    def get_caretakers(self, obj):
        return obj.caretakers.values('id', 'name')
    def get_pets(self, obj):
        return obj.pets.values('id', 'name')
    def get_pictures(self, obj):
        picture = obj.pictures.all()
        pictures = PictureSerializer(instance=picture, many=True, context=self.context).data
        return [p['image'] for p in pictures]

class VitalsCreateUpdateSerializer(serializers.ModelSerializer):
    kind = serializers.PrimaryKeyRelatedField(queryset=Kind.objects.all())
    caretakers = serializers.PrimaryKeyRelatedField(queryset=Caretaker.objects.all(), many=True)
    pets = serializers.PrimaryKeyRelatedField(queryset=Pet.objects.all(), many=True)
    class Meta:
        model = Vitals
        fields = ['id', 'title', 'kind', 'measurement', 'recorded_on', 'caretakers', 'pets', 'notes', 'is_event', 'is_completed', 'pictures']
        read_only_fields = ['id']

class EntryListRetrievePolymorphicSerializer(PolymorphicSerializer):
    model_serializer_mapping = {
        Entry: EntryListRetrieveSerializer,
        Vitals: VitalsListRetrieveSerializer,
    }

class EntryCreateUpdatePolymorphicSerializer(PolymorphicSerializer):
    model_serializer_mapping = {
        Entry: EntryCreateUpdateSerializer,
        Vitals: VitalsCreateUpdateSerializer,
    }

class PictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Picture
        fields = ['id', 'entry', 'image']
