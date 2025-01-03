import { Text, ScrollView, StyleSheet} from 'react-native';

import { theme } from '@/theme';


export default function Events() {
  return (
    <ScrollView style={styles.container}>
        <Text style={styles.text}>Events Screen</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colorMediumBlue,
    },
    text: {
        color: theme.colorDarkBlue,
        fontSize: 46,
    },
});