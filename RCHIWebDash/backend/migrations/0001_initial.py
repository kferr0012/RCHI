# Generated by Django 2.2.3 on 2019-07-02 01:51

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PracticeApp',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('row', models.IntegerField()),
                ('column', models.IntegerField()),
                ('data', models.IntegerField()),
                ('title', models.CharField(max_length=100)),
            ],
        ),
    ]
