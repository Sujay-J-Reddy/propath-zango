# Generated by Django 4.2.15 on 2025-01-17 13:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dynamic_models', '0035_order_location'),
    ]

    operations = [
        migrations.AlterField(
            model_name='enquiry',
            name='phone_country_code',
            field=models.CharField(max_length=5),
        ),
        migrations.AlterField(
            model_name='enquiry',
            name='type',
            field=models.CharField(max_length=255),
        ),
    ]
