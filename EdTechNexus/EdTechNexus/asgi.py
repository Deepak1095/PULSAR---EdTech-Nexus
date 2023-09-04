from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from eduapp.routing import websocket_urlpatterns  # Import your WebSocket URL patterns
from channels.auth import AuthMiddlewareStack

application = ProtocolTypeRouter({
    "websocket": AuthMiddlewareStack(
        URLRouter(
            websocket_urlpatterns
        )
    ),
})
