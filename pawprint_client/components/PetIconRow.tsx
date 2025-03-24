import { View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { THEME } from '@/theme';
import { Pet } from '@/api_interfaces';
import PetIcon from '@/components/PetIcon';


interface Props {
    pets: Pet[];
}

export default function PetIconRow(props:Props) {
    // truncate to 2 pets if more than 3 are involved
    if (props.pets.length > 3) {
        const pets = props.pets.slice(0, 2);
        return (
            <View style={styles.petIconRow}>
                {pets.map(pet => {
                    return (
                        <View key={pet.id} style={styles.petIcon}>
                            <PetIcon
                            pet={pet}
                            target_size={20}
                            color={THEME.COLOR_WHITE}
                            border={1}
                            />
                        </View>
                    )
                })}
                <View style={styles.etcIcon}>
                    <Ionicons
                        name='ellipsis-horizontal'
                        color={THEME.COLOR_DARK_BLUE}
                        size={12}
                    />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.petIconRow}>
            {props.pets.map(pet =>  {
                return (
                    <View key={pet.id} style={styles.petIcon}>
                        <PetIcon
                            pet={pet}
                            target_size={20}
                            color={THEME.COLOR_WHITE}
                            border={1}
                        />
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    petIconRow: {
        flexDirection: 'row',
    },
    petIcon: {
        marginRight: -4,
    },
    etcIcon: {
        backgroundColor: THEME.COLOR_LIGHT_GREY,
        height: 20,
        width: 20,
        borderRadius: 20 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: -4,
    },
})
