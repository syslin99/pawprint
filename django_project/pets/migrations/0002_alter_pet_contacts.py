# Generated by Django 4.2.17 on 2024-12-31 19:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0001_initial'),
        ('pets', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pet',
            name='contacts',
            field=models.ManyToManyField(blank=True, related_name='pets', to='contacts.contact'),
        ),
    ]
