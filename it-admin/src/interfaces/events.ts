export interface events{
    id: number;
    nombre:string;
    fecha:string;
    descripcion:string;
    lugar:string;
    imagen?:string;
    isActive:boolean
}

export interface eventNew{
    nombre:string;
    fecha:string;
    descripcion:string;
    lugar:string;
    imagen?:string;
    isActive:boolean;
}