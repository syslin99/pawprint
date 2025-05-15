export interface Caretaker {
    id: number;
    name: string;
    pets: Array<number>;
}

export interface Pet {
    id: number;
    name: string;
    birthdate?: Date;
    sex?: string;
    breed?: string;
    chip?: string;
    image: string;
    contacts?: Array<number>;
    caretakers?: Array<{id:number, name:string}>;
}

export interface Contact {
    id: number;
    name: string;
    role?: string;
    organization?: string;
    phone?: string;
    email?: string;
    address?: string;
}

export interface Kind {
    id: number;
    name: string;
    category: string;
}

export interface Entry {
    id: number;
    title: string;
    kind: Kind;
    measurement?: number;
    recorded_on: Date;
    caretakers: Array<{id:number, name:string}>;
    pets: Array<{id:number, name:string}>;
    notes?: string;
    is_event: boolean;
    is_completed: boolean;
    pictures: Array<string>;
}

export interface Vitals {
    id: number;
    kind: Kind;
    recorded_on: Date;
    value: number;
}
