export interface Participacion{
    id:number;
    nombre:string;
    rut:string;
    email:string;
    eventoNombre:string;
    lugar:string;
    fecha:string;
}

export interface ParticipacionNueva{
    nombre:string;
    rut:string;
    email:string;
    eventoNombre:string;
    lugar:string;
    fecha:string;
}