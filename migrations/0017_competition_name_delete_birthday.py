# Generated by Django 4.2.11 on 2024-05-15 17:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dynamic_models', '0016_alter_notification_notification_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='competition',
            name='name',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.DeleteModel(
            name='Birthday',
        ),
    ]