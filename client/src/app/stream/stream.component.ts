import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {
  @ViewChild('remoteVideo') remoteVideoRef: any;
  @ViewChild('localVideo') localVideoRef: any;

  private peer: any;
  private userid = '';
  private localStream: any;
  private playing = false;
  constructor() { }

  ngOnInit() {
  }
  call() {
    this.playing = true;
    this.socketService.call(this.userid);
    const localVideo = this.localVideoRef.nativeElement;
    const n = <any>navigator;
    const self = this;
    n.getUserMedia = (n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia);
    n.mediaDevices.getUserMedia({ video: true, audio: true }).then(function (stream) {
        // ref to close
        self.localStream = stream;
        localVideo.srcObject = stream;
        localVideo.play();
    });
}

}
