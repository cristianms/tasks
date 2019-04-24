import React from 'react'
import {
    StyleSheet, 
    Text, 
    View, 
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'
import commonStyles from '../commomStyles'
import Swipeable from 'react-native-swipeable'
import commomStyles from '../commomStyles';

export default props => {
    //teste
    let check = null
    let descStyle = {}
    if (props.doneAt !== null) {
        check = (
            <View style={styles.done}>
                <Icon name='check' size={20} color={commonStyles.colors.secondary} />
            </View>
        )
        descStyle = {textDecorationLine: 'line-through'}
    } else {
        check = <View style={styles.pending}></View>
    }

    //const descStyle = props.doneAt !== null ? {textDecorationLine: 'line-through', color: 'red'} : {}

    const leftContent = (
        <View style={styles.exclude}>
            <Icon name='trash' size={20} color='#fff' />
            <Text style={styles.excludeText}>Excluir</Text>
        </View>
    )

    const rightContent = [
        <TouchableOpacity 
            style={[styles.exclude, {justifyContent: 'flex-start', paddingLeft: 20}]}
            onPress={() => props.onDelete(props.id)}>
            <Icon name='trash' size={30} color='#fff' />
        </TouchableOpacity>
    ]

    return (
        <Swipeable
            onLeftActionActivate={() => props.onDelete(props.id)}
            leftContent={leftContent}
            rightButtons={rightContent}>
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => props.onToggleTask(props.id)}>
                    <View style={styles.checkContainer}>
                        {check}
                    </View>
                </TouchableWithoutFeedback>

                <View style={styles.teste}>
                    <Text style={[styles.description, descStyle]}>
                        {props.desc}
                    </Text>

                    <Text style={styles.date}>
                        {moment(props.estimatedAt).locale('pt-br').format('ddd, D [de] MMMM [de] YYYY')}
                    </Text>
                </View>
            </View>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    teste: {
        flexDirection: 'column'
    },
    container: {
        paddingVertical: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#aaa',
    },
    checkContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '20%',
    },
    pending: {
        borderWidth: 1,
        height: 25,
        width: 25,
        borderRadius: 15,
        borderColor: '#555',
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 15,
        backgroundColor: '#4d7031',
        alignItems: 'center',
        justifyContent: 'center',
    },
    description: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 15,
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12
    },
    exclude: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    excludeText: {
        fontFamily: commomStyles.fontFamily,
        color: '#fff',
        fontSize: 20,
        margin: 10
    }
})