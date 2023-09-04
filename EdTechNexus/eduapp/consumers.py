import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Enrollment

class EnrollmentConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        data = json.loads(text_data)
        action = data.get('action')

        if action == 'approve_enrollment':
            enrollment_id = data.get('enrollment_id')
            await self.approve_enrollment(enrollment_id)

        elif action == 'reject_enrollment':
            enrollment_id = data.get('enrollment_id')
            await self.reject_enrollment(enrollment_id)

    async def approve_enrollment(self, enrollment_id):
        try:
            enrollment = Enrollment.objects.get(pk=enrollment_id)
            enrollment.status = 'approved'
            enrollment.save()
            await self.send(json.dumps({'action': 'enrollment_approved', 'enrollment_id': enrollment_id}))
        except Enrollment.DoesNotExist:
            pass  # Handle the case where the enrollment does not exist

    async def reject_enrollment(self, enrollment_id):
        try:
            enrollment = Enrollment.objects.get(pk=enrollment_id)
            enrollment.status = 'rejected'
            enrollment.save()
            await self.send(json.dumps({'action': 'enrollment_rejected', 'enrollment_id': enrollment_id}))
        except Enrollment.DoesNotExist:
            pass  # Handle the case where the enrollment does not exist
