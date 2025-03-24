import { Image, StyleSheet } from 'react-native';

import { Pet } from '@/api_interfaces';


interface Props {
    pet: Pet;
    target_size: number;
    color: string;
    border: number;
}

export default function PetIcon(props:Props) {
    return (
        <Image
            source={{uri: props.pet.image}}
            style={styles(props.target_size, props.color, props.border).target}
        />
    )
}

const styles = (target_size:number, color:string, border:number) => StyleSheet.create({
    target: {
        height: target_size,
        width: target_size,
        borderRadius: target_size / 2,
        borderWidth: border,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
