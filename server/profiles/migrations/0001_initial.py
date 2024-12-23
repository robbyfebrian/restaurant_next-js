# Generated by Django 4.1.4 on 2022-12-20 00:23

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="OpeningHour",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "day",
                    models.PositiveSmallIntegerField(
                        choices=[
                            (0, "Monday"),
                            (1, "Tuesday"),
                            (2, "Wednesday"),
                            (3, "Thursday"),
                            (4, "Friday"),
                            (5, "Saturday"),
                            (6, "Sunday"),
                        ],
                        unique=True,
                    ),
                ),
                ("opening_time", models.TimeField()),
                ("closing_time", models.TimeField()),
            ],
            options={
                "ordering": ("day",),
            },
        ),
        migrations.CreateModel(
            name="RestaurantFAQ",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("question", models.CharField(max_length=128)),
                ("answer", models.TextField()),
            ],
            options={
                "verbose_name_plural": "FAQs",
            },
        ),
        migrations.CreateModel(
            name="RestaurantProfile",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(blank=True, max_length=128)),
                ("logo", models.ImageField(blank=True, upload_to="logo")),
                ("about_us", models.TextField(blank=True)),
                ("address", models.TextField(blank=True)),
                ("phone", models.CharField(blank=True, max_length=128)),
                ("email", models.EmailField(blank=True, max_length=254)),
                ("facebook", models.URLField(blank=True)),
                ("instagram", models.URLField(blank=True)),
                ("twitter", models.URLField(blank=True)),
                (
                    "opening_hours",
                    models.ManyToManyField(blank=True, to="profiles.openinghour"),
                ),
            ],
            options={
                "verbose_name_plural": "Profiles",
            },
        ),
    ]
