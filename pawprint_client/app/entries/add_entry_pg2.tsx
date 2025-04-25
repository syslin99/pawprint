import { View, Text } from 'react-native';

import SecondaryHeader from '@/components/SecondaryHeader';


interface Props {
    kindId: number;
    onClose: () => void;
}

export default function AddEntryPage2({kindId, onClose} : Props) {

    return (
        <View>
            <SecondaryHeader title='Add Entry' hasEditActions={false} onClose={onClose}/>
            <Text>SECOND PAGE - KIND: {kindId}</Text>
        </View>
    )
}
