import { ScrollView, View, Text, Pressable, StyleSheet} from 'react-native';

import { THEME } from '@/theme';
import { KINDS } from '@/constants';
import SecondaryHeader from '@/components/SecondaryHeader';
import KindIcon from '@/components/KindIcon';


interface Props {
    onClose: () => void;
    nextPage: (kindId:number) => void;
}

export default function AddEntryPage1({onClose, nextPage} : Props) {
    return (
        <View style={styles.screen}>
            <SecondaryHeader title='Add Entry' hasEditActions={false} onClose={onClose}/>
            <ScrollView>
                <Text style={styles.titleText}>Entry Type</Text>
                <View style={styles.sections}>
                    {/* Food and Water */}
                    <View style={styles.section}>
                        <Text style={styles.headerText}>Food and Water</Text>
                        <View style={styles.iconRow}>
                            {[2, 3, 4].map(id => (
                                <Pressable
                                    key={id}
                                    style={styles.icon}
                                    onPress={() => nextPage(id)}
                                >
                                    <KindIcon
                                        kind={KINDS[id]}
                                        font_size={36}
                                        target_size={80}
                                        border={2}
                                    />
                                    <Text style={styles.labelText}>{KINDS[id].name}</Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                    {/* Care */}
                    <View style={styles.section}>
                        <Text style={styles.headerText}>Care</Text>
                        <View style={styles.iconRow}>
                            {[5, 6, 7].map(id => (
                                <Pressable
                                    key={id}
                                    style={styles.icon}
                                    onPress={() => nextPage(id)}
                                >
                                    <KindIcon
                                        kind={KINDS[id]}
                                        font_size={36}
                                        target_size={80}
                                        border={2}
                                    />
                                    <Text style={styles.labelText}>{KINDS[id].name}</Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                    {/* Activities */}
                    <View style={styles.section}>
                        <Text style={styles.headerText}>Activities</Text>
                        <View style={styles.iconRow}>
                            {[8, 9, 10].map(id => (
                                <Pressable
                                    key={id}
                                    style={styles.icon}
                                    onPress={() => nextPage(id)}
                                >
                                    <KindIcon
                                        kind={KINDS[id]}
                                        font_size={36}
                                        target_size={80}
                                        border={2}
                                    />
                                    <Text style={styles.labelText}>{KINDS[id].name}</Text>
                                </Pressable>
                            ))}
                        </View>
                        <View style={styles.iconRow}>
                            {[11, 12].map(id => (
                                <Pressable
                                    key={id}
                                    style={styles.icon}
                                    onPress={() => nextPage(id)}
                                >
                                    <KindIcon
                                        kind={KINDS[id]}
                                        font_size={36}
                                        target_size={80}
                                        border={2}
                                    />
                                    <Text style={styles.labelText}>{KINDS[id].name}</Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                    {/* Health */}
                    <View style={styles.section}>
                        <Text style={styles.headerText}>Health</Text>
                        <View style={styles.iconRow}>
                            {[13, 14, 15].map(id => (
                                <Pressable
                                    key={id}
                                    style={styles.icon}
                                    onPress={() => nextPage(id)}
                                >
                                    <KindIcon
                                        kind={KINDS[id]}
                                        font_size={36}
                                        target_size={80}
                                        border={2}
                                    />
                                    <Text style={styles.labelText}>{KINDS[id].name}</Text>
                                </Pressable>
                            ))}
                        </View>
                        <View style={styles.iconRow}>
                            {[16, 17, 18].map(id => (
                                <Pressable
                                    key={id}
                                    style={styles.icon}
                                    onPress={() => nextPage(id)}
                                >
                                    <KindIcon
                                        kind={KINDS[id]}
                                        font_size={36}
                                        target_size={80}
                                        border={2}
                                    />
                                    <Text style={styles.labelText}>{KINDS[id].name}</Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                    {/* Other */}
                    <View style={styles.section}>
                        <Text style={styles.headerText}>Other</Text>
                        <View style={styles.iconRow}>
                            {[1].map(id => (
                                <Pressable
                                    key={id}
                                    style={styles.icon}
                                    onPress={() => nextPage(id)}
                                >
                                    <KindIcon
                                        kind={KINDS[id]}
                                        font_size={36}
                                        target_size={80}
                                        border={2}
                                    />
                                    <Text style={styles.labelText}>{KINDS[id].name}</Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                </View>
                <View style={styles.bottomSpacer}></View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: THEME.COLOR_WHITE,
    },
    sections: {
        gap: 16
    },
    section: {
        marginLeft: 32,
        marginRight: 32,
        borderBottomWidth: 1,
        borderBottomColor: THEME.COLOR_DARK_BLUE,
    },
    iconRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    icon: {
        gap: 4,
        width: `${100/3}%`,
        alignItems: 'center',
    },
    titleText: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 20,
        fontWeight: 'bold',
        padding: 16,
    },
    headerText: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 16,
        paddingBottom: 8,
    },
    labelText: {
        color: THEME.COLOR_DARK_BLUE,
        fontSize: 14,
        textAlign: 'center',
    },
    bottomSpacer: {
        height: 16,
    },
});