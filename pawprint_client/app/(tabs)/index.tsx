import { View, ScrollView, Text, StyleSheet} from 'react-native';
import { useEffect } from 'react';

import { THEME } from '@/theme';
import { Pet, Contact, Vitals } from '@/api_interfaces';
import { useStoreContext } from '@/components/StoreContext';
import MainHeader from '@/components/MainHeader';


export default function Log() {

    /* ----- cache information -----*/
    const { state, dispatch } = useStoreContext();

    useEffect(() => {
        fetchPetData();
        fetchContactData();
    }, [])

    const fetchPetData = async() => {
        try {
            const response = await fetch(`http://192.168.86.81:8000/api/caretakers/${state.caretakerId}/pets`);
            const data:Pet[] = await response.json()
            data.forEach(pet => {
                dispatch({ type: 'ADD_PET', payload: pet});
                fetchVitalsData(pet.id);
            })
        } catch (error) {
            console.error('Error fetching pet data:', error)
        }
    }

    const fetchContactData = async() => {
        try {
            const response = await fetch(`http://192.168.86.81:8000/api/caretakers/${state.caretakerId}/contacts`);
            const data:Contact[] = await response.json()
            data.forEach(contact => {
                dispatch({ type: 'ADD_CONTACT', payload: contact});
            })
        } catch (error) {
            console.error('Error fetching contact data:', error)
        }
    }

    const fetchVitalsData = async(pet_id:number) => {
        try {
            const response = await fetch(`http://192.168.86.81:8000/api/vitals/?pets=${pet_id}`)
            const data:Vitals[] = await response.json()
            data.forEach(vitals => {
                dispatch({ type: 'ADD_VITALS', payload: vitals});
            })
        } catch (error) {
            console.error('Error fetching vitals data:', error)
        }
    }

    return (
        <View style={styles.screen}>
            <MainHeader title='Log' />
            <ScrollView style={styles.container}>
                <Text style={styles.text}>Log Screen</Text>
                <Text style={styles.exampleText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae ante in ipsum blandit sodales eget eget leo. In euismod, nisi a hendrerit tempor, sem ante vestibulum ex, vel ultrices justo ligula sed augue. Fusce gravida ligula ut molestie lacinia. Sed lobortis, nisi id mollis facilisis, nulla orci mollis ante, in fringilla risus nulla eget nisi. Donec finibus ac mi quis sagittis. Suspendisse ultricies ligula lacus, at laoreet ex fermentum sed. Proin ac luctus eros, ut venenatis lectus. Sed maximus nec mauris ut tincidunt.
                Maecenas laoreet pharetra est nec finibus. Quisque sapien ligula, vulputate sit amet lobortis et, interdum a justo. Nullam eleifend purus a sodales aliquam. Donec aliquam ultricies tortor eu placerat. Praesent sollicitudin magna lacinia, ornare nisl sed, tincidunt massa. Cras at lacinia nisl. Aenean rhoncus leo in venenatis auctor. Phasellus sagittis fermentum dolor. Cras eu aliquet nulla. Aliquam erat volutpat. Fusce erat quam, pharetra nec tortor eget, tincidunt tincidunt sem. Sed sodales nibh eros, vel malesuada libero vulputate sit amet. Proin augue quam, finibus vel mauris eu, scelerisque fringilla augue.
                </Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: THEME.COLOR_WHITE,
    },
    text: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 46,
    },
    exampleText: {
        fontSize: 24,
    }
});
