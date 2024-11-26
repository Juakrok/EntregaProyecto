import { CanActivateFn, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AutorizadoGuard{
  constructor(
    private auth:AuthService,
    private router:Router,
    private toast:ToastController
  ){}

  canActivate():

  | Observable<boolean| UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree{
    if(!this.auth.IsLoggenIn()){
      this.showToast('Debe iniciar sesion..');
      this.router.navigateByUrl('/login');
      return false;
    }else{
      this.auth.IsLoggenIn();
      return true;
    }
  }

  async showToast(msg:any){
    const toasted = await this.toast.create({
      message:msg,
      duration:3000
    });
    toasted.present();
  }
}
