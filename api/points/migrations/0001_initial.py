# Generated by Django 4.1.6 on 2023-02-04 20:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Point',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(unique=True)),
                ('x', models.IntegerField()),
                ('y', models.IntegerField()),
            ],
            options={
                'db_table': 'point',
            },
        ),
        migrations.AddConstraint(
            model_name='point',
            constraint=models.UniqueConstraint(fields=('x', 'y'), name='unique_x_y'),
        ),
    ]
