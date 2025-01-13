export interface Caretaker {
    id: number;
    email?: string;
    password?: string;
    pets?: Array<number>;
    contacts?: Array<number>;
}

export interface Pet {
    id: number;
    name?: string;
    birthdate?: Date;
    sex?: string;
    breed?: string;
    chip?: string;
    image?: string;
    contacts?: Array<number>;
}

export interface Contact {
    id: number;
    name?: string;
    role?: string;
    organization?: string;
    phone?: string;
    email?: string;
    address?: string;
}
