# Generated by Django 4.2.11 on 2024-05-14 14:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dynamic_models', '0012_levelcertificate_level_levelcertificate_programme'),
    ]

    operations = [
        migrations.AlterField(
            model_name='levelcertificate',
            name='level',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='levelcertificate',
            name='programme',
            field=models.CharField(max_length=100),
        ),
    ]
