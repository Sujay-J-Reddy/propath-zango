# Generated by Django 4.2.11 on 2024-06-04 17:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dynamic_models', '0027_stat_students_stat_teachers'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stat',
            name='students',
            field=models.PositiveIntegerField(),
        ),
        migrations.AlterField(
            model_name='stat',
            name='teachers',
            field=models.PositiveIntegerField(),
        ),
    ]
