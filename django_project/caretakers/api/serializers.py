from rest_framework import serializers

from ..models import Caretaker


class CaretakerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Caretaker
        fields = ['id', 'name', 'email', 'password', 'pets', 'contacts']
