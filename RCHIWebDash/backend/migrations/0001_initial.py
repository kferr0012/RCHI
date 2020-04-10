# Generated by Django 3.0.4 on 2020-04-10 05:12

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CityTotalsByYear2019',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('_type', models.CharField(max_length=50)),
                ('year', models.IntegerField()),
                ('district', models.IntegerField()),
                ('sheltered', models.BooleanField(default=False)),
                ('city', models.CharField(max_length=100)),
                ('total', models.IntegerField()),
                ('volunteers', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='CityTotalsByYear2020',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.IntegerField()),
                ('district', models.IntegerField()),
                ('sheltered', models.BooleanField(default=False)),
                ('city', models.CharField(max_length=100)),
                ('total', models.IntegerField()),
                ('volunteers', models.CharField(max_length=50)),
                ('_type', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='GeneralTableSubpopulations2019',
            fields=[
                ('id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('year', models.IntegerField()),
                ('category', models.CharField(max_length=100)),
                ('subpopulation', models.CharField(max_length=100)),
                ('interview', models.IntegerField()),
                ('observation', models.IntegerField()),
                ('total', models.IntegerField()),
                ('_type', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='GeneralTableSubpopulations2020',
            fields=[
                ('id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('year', models.IntegerField()),
                ('category', models.CharField(max_length=100)),
                ('subpopulation', models.CharField(max_length=100)),
                ('interview', models.IntegerField()),
                ('observation', models.IntegerField()),
                ('total', models.IntegerField()),
                ('_type', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='GeneralTableSubpopulationsSheltered2019',
            fields=[
                ('id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('category', models.CharField(max_length=100)),
                ('subpopulation', models.CharField(max_length=100)),
                ('total', models.IntegerField()),
                ('_type', models.CharField(max_length=50)),
                ('year', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='GeneralTableSubpopulationsSheltered2020',
            fields=[
                ('id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('category', models.CharField(max_length=100)),
                ('subpopulation', models.CharField(max_length=100)),
                ('total', models.IntegerField()),
                ('interview', models.IntegerField()),
                ('observation', models.IntegerField()),
                ('_type', models.CharField(max_length=50)),
                ('year', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='GeneralTableSubpopulationsTotalCounts',
            fields=[
                ('id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('category', models.CharField(max_length=100)),
                ('subpopulation', models.CharField(max_length=100)),
                ('total', models.IntegerField()),
                ('interview', models.IntegerField()),
                ('observation', models.IntegerField()),
                ('_type', models.CharField(max_length=50)),
                ('year', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='HouseholdsByCityYearInterview2019',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.IntegerField()),
                ('district', models.IntegerField()),
                ('city', models.CharField(max_length=50)),
                ('totalHouseholds', models.IntegerField()),
                ('adultsOnly', models.IntegerField()),
                ('adultsAndChildren', models.IntegerField()),
                ('childrenOnly', models.IntegerField()),
                ('_type', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='HouseholdsByCityYearInterview2020',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.IntegerField()),
                ('district', models.IntegerField()),
                ('city', models.CharField(max_length=50)),
                ('totalHouseholds', models.IntegerField()),
                ('adultsOnly', models.IntegerField()),
                ('adultsAndChildren', models.IntegerField()),
                ('childrenOnly', models.IntegerField()),
                ('_type', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='NewlyHomelessByCity',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('district', models.CharField(max_length=100)),
                ('city', models.CharField(max_length=100)),
                ('category', models.CharField(max_length=100)),
                ('subpopulation', models.CharField(max_length=100)),
                ('interview', models.IntegerField()),
                ('observation', models.IntegerField()),
                ('total', models.IntegerField()),
                ('year', models.IntegerField()),
                ('_type', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='SeniorsSubpopulationTotalCounts2020',
            fields=[
                ('id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('category', models.CharField(max_length=100)),
                ('subpopulation', models.CharField(max_length=100)),
                ('interview', models.IntegerField()),
                ('observation', models.IntegerField()),
                ('total', models.IntegerField()),
                ('year', models.IntegerField()),
                ('_type', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='SubpopulationsByCity2019',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('district', models.CharField(max_length=100)),
                ('city', models.CharField(max_length=100)),
                ('category', models.CharField(max_length=100)),
                ('subpopulation', models.CharField(max_length=100)),
                ('interview', models.IntegerField()),
                ('observation', models.IntegerField()),
                ('total', models.IntegerField()),
                ('_type', models.CharField(max_length=50)),
                ('year', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='SubpopulationsByCity2020',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('district', models.CharField(max_length=100)),
                ('city', models.CharField(max_length=100)),
                ('category', models.CharField(max_length=100)),
                ('subpopulation', models.CharField(max_length=100)),
                ('interview', models.IntegerField()),
                ('observation', models.IntegerField()),
                ('total', models.IntegerField()),
                ('_type', models.CharField(max_length=50)),
                ('year', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='SubpopulationsByYear2019',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('_type', models.CharField(max_length=50)),
                ('year', models.IntegerField()),
                ('category', models.CharField(max_length=50)),
                ('subpopulation', models.CharField(max_length=50)),
                ('interview', models.IntegerField()),
                ('observation', models.IntegerField()),
                ('sheltered', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='SubpopulationsByYear2020',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.IntegerField()),
                ('category', models.CharField(max_length=50)),
                ('subpopulation', models.CharField(max_length=50)),
                ('interview', models.IntegerField()),
                ('observation', models.IntegerField()),
                ('sheltered', models.BooleanField(default=False)),
                ('total', models.IntegerField()),
                ('_type', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Trends2019',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.IntegerField()),
                ('trend', models.CharField(max_length=50)),
                ('category', models.CharField(max_length=50)),
                ('subCategory', models.CharField(blank=True, max_length=50, null=True)),
                ('interview', models.IntegerField()),
                ('observation', models.IntegerField()),
                ('total', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='VolunteerDeployment2019',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('_type', models.CharField(max_length=50)),
                ('year', models.IntegerField()),
                ('district', models.IntegerField()),
                ('deploymentSite', models.CharField(max_length=50)),
                ('count', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='VolunteerDeployment2020',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.IntegerField()),
                ('district', models.IntegerField()),
                ('deploymentSite', models.CharField(max_length=50)),
                ('count', models.IntegerField()),
                ('_type', models.CharField(max_length=50)),
            ],
        ),
    ]
