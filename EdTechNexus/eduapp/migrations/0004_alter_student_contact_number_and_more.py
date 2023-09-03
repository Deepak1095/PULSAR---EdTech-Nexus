# Generated by Django 4.2.4 on 2023-09-03 06:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('eduapp', '0003_student_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='contact_number',
            field=models.CharField(max_length=10),
        ),
        migrations.AlterField(
            model_name='student',
            name='student_id',
            field=models.CharField(default=1, max_length=4, unique=True),
        ),
    ]
