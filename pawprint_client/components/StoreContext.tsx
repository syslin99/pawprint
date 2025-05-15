import React, { createContext, useContext, useReducer } from 'react';
import { Pet, Contact, Entry, Caretaker } from '@/api_interfaces';


/* ----- interfaces ----- */
interface Context {
    state: Store;
    dispatch: (action: Action) => void;
}

interface Store {
    caretakerId: number,
    pets: Map<number, Pet>;
    contacts: Map<number, Contact>;
    entrys: Map<number, Entry>;
    caretakers: Map<number, Caretaker>;
}

interface Action {
    type: string;
    payload: Pet | Contact | Entry;
}

/* ----- type guarding ----- */

function isPet(action: string, payload: Pet | Contact | Entry) : payload is Pet {
    return action.endsWith('PET');
}

function isContact(action: string, payload: Pet | Contact | Entry) : payload is Contact {
    return action.endsWith('CONTACT');
}

function isEntry(action: string, payload: Pet | Contact | Entry) : payload is Entry {
    return action.endsWith('ENTRY');
}

/* ----- context and reducer functions ----- */
const StoreContext = createContext<Context>({} as Context);

const initialState:Store = {
    caretakerId: 1,  // PLACEHOLDER, until Login screen built
    pets: new Map<number, Pet>(),
    contacts: new Map<number, Contact>(),
    entrys: new Map<number, Entry>(),
    caretakers: new Map<number, Caretaker>(),
}

const storeReducer = (state: Store, action: Action) => {
    const {payload, type} = action;

    if (isPet(type, payload)) {
        switch (type) {
            case 'ADD_PET':
                // update caretakers
                payload.caretakers?.forEach(petCaretaker => {
                    const caretaker = state.caretakers.get(petCaretaker.id)
                    if (caretaker) {
                        // if caretaker is already stored, update pets list
                        caretaker.pets.push(payload.id)
                    } else {
                        // add caretaker to store
                        state.caretakers.set(petCaretaker.id, {...petCaretaker, pets: [payload.id]})
                    }
                })
                // update state
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
    } else if (isEntry(type, payload)) {
        switch (type) {
            case 'ADD_ENTRY':
                const newEntrys = new Map<number, Entry>();
                let inserted = false
                state.entrys.forEach((value, key) => {
                    // if new entry is more recent, add in order and change flag
                    if (!inserted && payload.recorded_on >= value.recorded_on) {
                        newEntrys.set(payload.id, payload)
                        newEntrys.set(key, value)
                        inserted = true
                    }
                    // otherwise, copy over existing entries
                    else {
                        newEntrys.set(key, value)
                    }
                })
                // new entry is the oldest
                if (!inserted) {
                    newEntrys.set(payload.id, payload)
                    inserted = true
                }
                // update state
                return {
                    ...state,
                    entrys: newEntrys,
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
