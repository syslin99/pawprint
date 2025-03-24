from rest_framework import serializers

from ..models import Pet


class PetSerializer(serializers.ModelSerializer):
    caretakers = serializers.SerializerMethodField()

    class Meta:
        model = Pet

        fields = ['id', 'name', 'birthdate', 'sex', 'breed', 'chip', 'image', 'contacts', 'caretakers']

    def get_caretakers(self, obj):
        return obj.caretakers.values('id', 'name')
