# enrollment/routing.py
from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/enrollment/', consumers.EnrollmentConsumer.as_asgi()),
]
