from rest_framework import serializers

from ..models import Contact


class ContactSerializer(serializers.ModelSerializer):
    address = serializers.SerializerMethodField()

    class Meta:
        model = Contact
        fields = ['id', 'name', 'role', 'organization', 'phone', 'email', 'address']

    def get_address(self, obj):
        address = obj.address
        return address.raw
