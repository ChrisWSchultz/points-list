from django.db import models


class Point(models.Model):
    name = models.TextField(blank=False)
    x = models.IntegerField(blank=False)
    y = models.IntegerField(blank=False)
