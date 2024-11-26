import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  editForm: FormGroup;
  imagePreview: string | ArrayBuffer = '';  // Inicializando la propiedad

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.editForm.valid) {
      console.log(this.editForm.value);
    }
  }

  regresar(){
    this.router.navigate(['/user']);
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files) {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          // Aseguramos que imagePreview no sea null
          this.imagePreview = reader.result as string || '';
        };
        reader.readAsDataURL(file);
      }
    }
  }
}
