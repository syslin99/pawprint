export interface Caretaker {
    id: number;
    name: string;
    email: string;
    password: string;
    pets?: Array<number>;
    contacts?: Array<number>;
}

export interface Pet {
    id: number;
    name?: string;
    birthdate?: string;
    sex?: string;
    breed?: string;
    chip?: string;
    image?: string;
    contacts?: Array<number>;
    caretakers?: Array<string>;
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
    recorded_on: string;
    caretakers: Array<number>;
    pets: Array<number>;
    notes?: string;
    is_event: boolean;
    is_completed: boolean;
}

export interface Vitals extends Entry {
    measurement: number;
}

export interface Picture {
    id: number;
    entry: number;
    image: string;
}
