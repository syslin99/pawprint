import { View, Text, StyleSheet, TextStyle } from 'react-native';

import { THEME } from '@/theme';
import { useStoreContext } from './StoreContext';
import IconTextRow from './IconTextRow';


interface Props {
    id: number;
    subHeadingTextStyle: TextStyle;
}

export default function ContactInfo(props:Props) {
    const { state, dispatch } = useStoreContext();
    const contact = state.contacts.get(props.id);

    if (!contact) {
        console.error('Contact does not exist in cache.')
        return;
    }

    return (
        <View>
            <Text style={[props.subHeadingTextStyle, styles.subHeadingText]}>{contact.name}</Text>
            <View style={styles.body}>
                {contact.role && <IconTextRow
                    iconSet='FontAwesome5'
                    iconName='id-badge'
                    size={14}
                    color={THEME.COLOR_DARK_BLUE}
                    text={contact.role}
                    gap={8}
                    style={styles.bodyRow}
                />}
                {contact.phone && <IconTextRow
                    iconSet='FontAwesome5'
                    iconName='phone-alt'
                    size={14}
                    color={THEME.COLOR_DARK_BLUE}
                    text={contact.phone}
                    gap={8}
                    style={styles.bodyRow}
                />}
                {contact.email && <IconTextRow
                    iconSet='FontAwesome5'
                    iconName='envelope'
                    size={14}
                    color={THEME.COLOR_DARK_BLUE}
                    text={contact.email}
                    gap={8}
                    style={styles.bodyRow}
                />}
                {contact.address && <IconTextRow
                    iconSet='FontAwesome5'
                    iconName='map-marker-alt'
                    size={14}
                    color={THEME.COLOR_DARK_BLUE}
                    text={contact.address}
                    gap={8}
                    style={styles.bodyRow}
                />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    subHeadingText: {
        paddingBottom: 4,
    },
    body: {
        marginLeft: 24,
    },
    bodyRow: {
        paddingBottom: 4,
    }
})
