import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { UserPageRoutingModule } from './user-routing.module';
import { UserPage } from './user.page'; // Importa la clase exportada de user.page.ts

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPageRoutingModule, // Ruta configurada correctamente
  ],
  declarations: [UserPage], // Declara la página
})
export class UserPageModule {}
