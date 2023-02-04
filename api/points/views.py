from points.models import Point
from points.serializers import PointSerializer
from rest_framework import viewsets


class PointsViewSet(viewsets.ModelViewSet):
    queryset = Point.objects.all()
    serializer_class = PointSerializer
