import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validarRut(control: AbstractControl): ValidationErrors | null {
  const rut = control.value;

  if (!rut) {
    return { rutInvalido: true };
  }

  // Quitar puntos, espacios y convertir a mayúsculas
  const cleanRut = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();

  // Validar formato básico (números + dígito verificador)
  if (!/^\d{7,8}[0-9K]$/.test(cleanRut)) {
    return { rutInvalido: true };
  }

  // Separar cuerpo del RUT y dígito verificador
  const cuerpo = cleanRut.slice(0, -1);
  const digitoVerificador = cleanRut.slice(-1);

  // Calcular el dígito verificador esperado
  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i], 10) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = suma % 11;
  const dvCalculado = resto === 0 ? '0' : resto === 1 ? 'K' : (11 - resto).toString();

  // Comparar con el dígito verificador proporcionado
  return dvCalculado === digitoVerificador ? null : { rutInvalido: true };
}
