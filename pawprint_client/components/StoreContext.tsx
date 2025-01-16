import React, { createContext, useContext, useReducer } from 'react';
import { Pet, Contact } from '@/api_interfaces';


/* ----- interfaces ----- */
interface Context {
    state: Store;
    dispatch: (action: Action) => void;
}

interface Store {
    pets: Map<number, Pet>;
    contacts: Map<number, Contact>;
}

interface Action {
    type: string;
    payload: Pet | Contact;
}

/* ----- type guarding ----- */

function isPet(action: string, payload: Pet | Contact) : payload is Pet {
    return action.endsWith('PET');
}

function isContact(action: string, payload: Pet | Contact) : payload is Contact {
    return action.endsWith('CONTACT');
}

/* ----- context and reducer functions ----- */
const StoreContext = createContext<Context>({} as Context);

const initialState:Store = {
    pets: new Map<number, Pet>(),
    contacts: new Map<number, Contact>(),
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
