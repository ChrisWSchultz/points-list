from django.db import models


class Point(models.Model):
    name = models.TextField(blank=False, unique=True)
    x = models.IntegerField(blank=False)
    y = models.IntegerField(blank=False)

    class Meta:
        db_table = "point"
        constraints = [
            models.UniqueConstraint(fields=('x', 'y'), name='unique_x_y'),
        ]
