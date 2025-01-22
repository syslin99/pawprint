import React, { createContext, useContext, useReducer } from 'react';
import { Pet, Contact, Vitals } from '@/api_interfaces';


/* ----- interfaces ----- */
interface Context {
    state: Store;
    dispatch: (action: Action) => void;
}

interface Store {
    caretakerId: number,
    pets: Map<number, Pet>;
    contacts: Map<number, Contact>;
    vitals: Map<number, Vitals>;
}

interface Action {
    type: string;
    payload: Pet | Contact | Vitals;
}

/* ----- type guarding ----- */

function isPet(action: string, payload: Pet | Contact | Vitals) : payload is Pet {
    return action.endsWith('PET');
}

function isContact(action: string, payload: Pet | Contact | Vitals) : payload is Contact {
    return action.endsWith('CONTACT');
}

function isVitals(action: string, payload: Pet | Contact | Vitals) : payload is Vitals {
    return action.endsWith('VITALS');
}

/* ----- context and reducer functions ----- */
const StoreContext = createContext<Context>({} as Context);

const initialState:Store = {
    caretakerId: 1,  // PLACEHOLDER, until Login screen built
    pets: new Map<number, Pet>(),
    contacts: new Map<number, Contact>(),
    vitals: new Map<number, Vitals>(),
}

const storeReducer = (state: Store, action: Action) => {
    const {payload, type} = action;

    if (isPet(type, payload)) {
        switch (type) {
            case 'ADD_PET':
                return {
                    ...state,
                    pets: new Map<number,Pet>([...state.pets.entries(), [payload.id, payload]]),
                }
            default:
                return state;
        }
    } else if (isContact(type, payload)) {
        switch (type) {
            case 'ADD_CONTACT':
                return {
                    ...state,
                    contacts: new Map<number, Contact>([...state.contacts.entries(), [payload.id, payload]]),
                }
            default:
                return state;
        }
    } else if (isVitals(type, payload)) {
        switch (type) {
            case 'ADD_VITALS':
                return {
                    ...state,
                    vitals: new Map<number, Vitals>([...state.vitals.entries(), [payload.id, payload]]),
                }
            default:
                return state;
        }
    }

    return state;
}

export const StoreProvider = ({children} : {children:React.ReactNode}) => {
    const [state, dispatch] = useReducer(storeReducer, initialState);

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStoreContext = () => useContext(StoreContext);
