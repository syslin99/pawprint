# Generated by Django 4.2.17 on 2025-01-14 08:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('entries', '0004_alter_vitals_unit'),
    ]

    operations = [
        migrations.AlterField(
            model_name='picture',
            name='image',
            field=models.ImageField(upload_to='entrys/'),
        ),
    ]
