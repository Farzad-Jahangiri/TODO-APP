# Generated by Django 4.2.1 on 2023-05-17 20:24

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("members", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="member",
            name="title",
            field=models.CharField(default=django.utils.timezone.now, max_length=100),
        ),
    ]
