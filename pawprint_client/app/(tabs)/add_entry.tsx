import { useState } from 'react';

import AddEntryPage1 from '@/app/entries/add_entry_pg1';
import AddEntryPage2 from '@/app/entries/add_entry_pg2';


export default function AddEntry() {
    const [page, setPage] = useState<1|2>(1);
    const [kindId, setKindId] = useState<number>(1);

    const resetForm = () => {
        setPage(1);
    }
    const loadPage2 = (kindId:number) => {
        setKindId(kindId);
        setPage(2);
    }

    // First Page
    if (page === 1) {
        return (
            <AddEntryPage1 nextPage={loadPage2} onClose={resetForm}/>
        )
    }
    // Second Page
    return (
        <AddEntryPage2 kindId={kindId} onClose={resetForm}/>
    )
}
