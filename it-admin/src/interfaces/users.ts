
export interface administradores{
    fotoPerfil?: string; 
    id:number;
    nombre:string;
    email:string;
    password:string;
    rut:string;
    imagen:string;
    isActive: boolean;
}

export interface adminNuevo{
    nombre:string;
    email:string;
    password:string;
    imagen:string;
    rut:string;
    isActive: boolean;
}



export interface Users{
    fotoPerfil?: string; 
    id:number;
    nombre:string;
    email:string;
    password:string;
    rut:string;
    imagen:string;
    isActive: boolean;
}

export interface UserNuevo{
    nombre:string;
    email:string;
    password:string;
    imagen:string;
    rut:string;
    isActive: boolean;
}