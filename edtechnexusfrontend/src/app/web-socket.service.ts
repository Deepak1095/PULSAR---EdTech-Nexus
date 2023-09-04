// web-socket.service.ts
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  constructor(private socket: Socket) {}

  connect() {
    this.socket.connect(); // Connect to the WebSocket server
  }

  receiveEnrollmentUpdates() {
    return this.socket.fromEvent('enrollment_update'); // Listen for enrollment updates
  }

  sendEnrollmentApproval(enrollmentId: number) {
    this.socket.emit('approve_enrollment', enrollmentId); // Send enrollment approval
  }
}
