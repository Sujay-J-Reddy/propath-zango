# Generated by Django 4.2.15 on 2025-01-03 08:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dynamic_models', '0032_alter_student_programme'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='franchisee',
            name='center_address',
        ),
        migrations.AddField(
            model_name='franchisee',
            name='locations',
            field=models.TextField(default='[]'),
        ),
    ]