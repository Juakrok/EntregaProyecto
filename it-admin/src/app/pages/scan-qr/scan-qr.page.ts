import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType,CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQrPage implements OnInit {

  constructor() { }

  ngOnInit() {
    Camera.requestPermissions();
  }

  async leerQr(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });
  };

}
