# Generated by Django 4.2.11 on 2024-06-04 17:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dynamic_models', '0026_alter_item_last_purchase_price_alter_item_qty_stat'),
    ]

    operations = [
        migrations.AddField(
            model_name='stat',
            name='students',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='stat',
            name='teachers',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
