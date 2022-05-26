import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import { Card } from 'native-base';
import Header from '../components/header';

export default function NoteScreen({ route }) {

    const [formName, setFormName] = React.useState(null);
    const [data, setCommentData] = React.useState(null);

    React.useEffect(() => {
        const form = route ? (route.params ? route.params.formName : null) : null;
        const data = route ? (route.params ? route.params.data : null) : null;
        setFormName(form);
        setCommentData(data);
    });

    const closeScreen = () => {
        if (formName === 'serviceCareScreen') {
            route.params.props.navigation.navigate('Care Plan');
        } else {
            route.params.props.navigation.navigate('FormPdf');
        }
    };
    return (
        <View style={{ flex: 1 }}>
            <Header
                screenName={constants.CAREGIVER_SCHEDULE.COMMENT_SCREEN}
                headerType={constants.ICON_NAME.ARROW_BACK}
                setDrawerVisible={(visible) => this.setBack()}
            />
            <Card style={styles.cardDesign}>
                <View style={[styles.rowDirectionStyle, styles.commentViewHeader]}>
                    <View style={[styles.columnDirectionStyle, { flex: 1.6 }]}>
                        <Text style={styles.commentHeader}></Text>
                    </View>
                    <View style={[styles.columnDirectionStyle, { flex: 8.8 }]}>
                        <Text style={styles.commentHeader}>
                            {formName === 'commonForm'
                                ? 'NOTE'
                                : formName === 'serviceCareScreen'
                                    ? 'NOTE'
                                    : 'VISIT NOTE COMMENT'}
                        </Text>
                    </View>
                    <View style={[styles.columnDirectionStyle, { flex: 1.6 }]}>
                        <TouchableOpacity onPress={() => closeScreen()}>
                            <Text style={styles.closeButtondesign}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.rowDirectionStyle, { flex: 1, borderWidth: 1 }]}>
                    <View style={[styles.columnDirectionStyle, { flex: 1 }]}>
                        <View
                            style={[styles.rowDirectionStyle, { flex: 1, marginTop: 50 }]}>
                            <View style={[styles.columnDirectionStyle, { flex: 1 }]}>
                                <Text
                                    style={{
                                        fontSize: 22,
                                        textAlign: 'center',
                                        fontWeight: '700',
                                    }}>
                                    {data}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    cardDesign: {
        flex: 1,
        borderRadius: 15,
        borderWidth: 0.1,
        overflow: 'hidden',
        shadowColor: '#000000',
        shadowOpacity: 0.25,
        shadowRadius: 20,
        shadowOffset: {
            height: 1,
            width: 0,
        },
        elevation: 5,
    },
    textStyle: {
        color: 'black',
    },
    rowDirectionStyle: {
        flexDirection: 'row',
    },
    columnDirectionStyle: {
        flexDirection: 'column',
    },
    commentViewHeader: {
        height: 50,
        padding: 12,
        backgroundColor: '#ABF7AB',
    },
    commentHeader: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    closeButtondesign: {
        fontWeight: '600',
    },
});
