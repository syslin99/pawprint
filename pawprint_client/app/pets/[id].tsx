import { View, ScrollView, Text, Image, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { THEME } from '@/theme';
import { useStoreContext } from '@/components/StoreContext';
import SecondaryHeader from '@/components/SecondaryHeader';
import IconTextRow from '@/components/IconTextRow';
import ContactInfo from '@/components/ContactInfo';


function calculateAge(birthdate:string) {
    const target = new Date(birthdate)
    const today = new Date();
    const totalDiffMonths = (today.getFullYear() * 12 + today.getMonth()) - (target.getFullYear() * 12 + target.getMonth());
    const years = Math.floor(totalDiffMonths / 12);
    const months = Math.floor(totalDiffMonths % 12);
    return {years, months}
}

export default function PetProfile() {
    const { id } = useLocalSearchParams();
    const { state, dispatch } = useStoreContext();
    const pet = state.pets.get(Number(id));

    if (!pet) {
        console.error('Pet does not exist in cache.')
        return;
    }

    var age_text = '';
    if (pet.birthdate) {
        const { years, months } = calculateAge(pet.birthdate)
        age_text = `${years} years ${months} months old`
    }

    return (
        <View style={styles.screen}>
            <SecondaryHeader title='Profile' hasEditActions={true} />
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ alignItems: 'center'}}
            >
                {/* General information */}
                <View style={styles.backdrop}></View>
                <Image
                    source={{uri: pet.image}}
                    style={styles.petImage}
                />
                <Text style={styles.titleText}>{pet.name}</Text>
                <View style={styles.generalInfo}>
                    {pet.birthdate && <IconTextRow
                        iconSet='FontAwesome5'
                        iconName='birthday-cake'
                        size={16}
                        color={THEME.COLOR_DARK_BLUE}
                        text={age_text}
                        gap={8}
                        style={styles.subtitleRow}
                    />}
                    {pet.sex === 'F' && <IconTextRow
                        iconSet='FontAwesome5'
                        iconName='venus'
                        size={16}
                        color={THEME.COLOR_DARK_BLUE}
                        text='Female'
                        gap={8}
                        style={styles.subtitleRow}
                    />}
                    {pet.sex === 'M' && <IconTextRow
                        iconSet='FontAwesome5'
                        iconName='mars'
                        size={16}
                        color={THEME.COLOR_DARK_BLUE}
                        text='Male'
                        gap={8}
                        style={styles.subtitleRow}
                    />}
                    {pet.breed && <IconTextRow
                        iconSet='FontAwesome5'
                        iconName='dog'
                        size={16}
                        color={THEME.COLOR_DARK_BLUE}
                        text={pet.breed}
                        gap={8}
                        style={styles.subtitleRow}
                    />}
                    {pet.chip && <IconTextRow
                        iconSet='FontAwesome5'
                        iconName='hashtag'
                        size={16}
                        color={THEME.COLOR_DARK_BLUE}
                        text={pet.chip}
                        gap={8}
                        style={styles.subtitleRow}
                    />}
                </View>
                {/* Caretaker information */}
                <View style={styles.card}>
                    <Text style={styles.headingText}>Caretakers</Text>
                    {pet.caretakers?.map(caretaker => {
                        return <Text
                            key={caretaker}
                            style={styles.subHeadingText}
                        >{caretaker}</Text>
                    })}
                </View>
                {/* Contact information */}
                <View style={styles.card}>
                    <Text style={styles.headingText}>Contacts</Text>
                    {pet.contacts?.map(contact_id => {
                        return <ContactInfo
                            key={contact_id}
                            id={contact_id}
                            subHeadingTextStyle={styles.subHeadingText}
                        />
                    })}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: THEME.COLOR_WHITE,
    },
    backdrop: {
        backgroundColor: THEME.COLOR_MEDIUM_GREY,
        height: 180,
        width: '100%',
        borderBottomColor: THEME.COLOR_DARK_BLUE,
        borderBottomWidth: 2,
    },
    petImage: {
        height: 200,
        width: 200,
        borderRadius: 200 / 2,
        borderWidth: 2,
        borderColor: THEME.COLOR_DARK_BLUE,
        marginTop: -150,
    },
    generalInfo: {
        marginBottom: 12
    },
    titleText: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 24,
        paddingTop: 16,
        paddingBottom: 8,
    },
    subtitleRow: {
        paddingBottom: 4,
    },
    card: {
        width: 380,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: THEME.COLOR_MEDIUM_GREY,
        marginBottom: 12,
    },
    headingText: {
        color: THEME.COLOR_MEDIUM_GREY,
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 8,
    },
    subHeadingText: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 8,
    }
})
