import React, { Component } from 'react'
import {
    StyleSheet, 
    Text, 
    View, 
    ImageBackground, 
    FlatList,
    TouchableOpacity,
    Platform,
    //AsyncStorage
} from 'react-native'
import moment from 'moment'
import 'moment/locale/pt-br'
import commomStyles from '../commomStyles'
import Task from '../Components/Task'
import Icon from 'react-native-vector-icons/FontAwesome'
import ActionButton from 'react-native-action-button'
import AddTask from './AddTask'
import axios from 'axios'
import { server, showError } from '../common'

import todayImage from '../../assets/imgs/today.jpg'
import tomorrowImage from '../../assets/imgs/tomorrow.jpg'
import weekImage from '../../assets/imgs/week.jpg'
import monthImage from '../../assets/imgs/month.jpg'

export default class Agenda extends Component {

    state = {
        tasks: [],
        visibleTasks: [],
        showDoneTasks: true,
        showAddTask: false,
    }

    addTask = async task => {
        //const tasks = [...this.state.tasks]
        //tasks.push({
        //    id: Math.random(),
        //    desc: task.desc,
        //    estimateAt: task.date,
        //   doneAt: null
        //})
        //this.setState({tasks, showAddTask: false}, this.filterTasks)
        
        try {
            await axios.post(`${server}/tasks`, {
                desc: task.desc,
                estimateAt: task.date,
            })
            this.setState({showAddTask: false}, this.loadTasks)
        } catch(err) {
            showError(err)
        }
    }

    deleteTask = async id => {
        //const tasks = this.state.tasks.filter(task => task.id != id)
        //this.setState({tasks}, this.filterTasks)
        try {
            await axios.delete(`${server}/tasks/${id}`)
            await this.loadTasks()
        } catch(err) {
            showError(err)
        }
    }

    filterTasks = () => {
        let visibleTasks = null
        if(this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        } else {
            const pending = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending)
        }
        this.setState({visibleTasks})

        //AsyncStorage.setItem('tasks', JSON.stringify(this.state.tasks))

    }

    toggleFilter = () => {
        this.setState({showDoneTasks: !this.state.showDoneTasks}, this.filterTasks) //this.filterTasks tipo um callback nesse caso
    }

    componentDidMount = async() => {
        //const data = await AsyncStorage.getItem('tasks')
        //const tasks = JSON.parse(data) || []
        //this.setState({tasks}, this.filterTasks)

        this.loadTasks()
    }

    toggleTask = async id => {
        //com forEach
        //const tasks = [...this.state.tasks]
        //tasks.forEach(task => {
        //    if (task.id === id) {
        //        task.doneAt = task.doneAt ? null : new Date()
        //    }
        //})
        //this.setState({tasks})
        
        //com map
        //const tasks = this.state.tasks.map(task => {
        //    if (task.id === id) {
        //        task = {...task}
        //        task.doneAt = task.doneAt ? null : new Date()
        //    }
        //    return task                
        //})
        //this.setState({tasks}, this.filterTasks) //callback

        try {
            await axios.put(`${server}/tasks/${id}/toggle`)
            await this.loadTasks()
        } catch(err) {
            showError(err)
        }
    }

    loadTasks = async () => {
        try {
            const maxDate = moment().add({ days: this.props.daysAhead }).format('YYYY-MM-DD 23:59')
            const res = await axios.get(`${server}/tasks?date=${maxDate}`)
            this.setState({tasks: res.data}, this.filterTasks)
        } catch (err) {
            showError(err)
        }
    }

    render() {

        let styleColor = null
        let image = null

        switch (this.props.daysAhead) {
            case 0:
                styleColor = commomStyles.colors.today
                image = todayImage
                break;
            case 1:
                styleColor = commomStyles.colors.tomorrow
                image = tomorrowImage
                break;
            case 7:
                styleColor = commomStyles.colors.week
                image = weekImage
                break;
            default:
                styleColor = commomStyles.colors.month
                image = monthImage
                break;
        }

        return (
            <View style={styles.container}>

                <AddTask
                    isVisible={this.state.showAddTask}
                    onSave={this.addTask}
                    onCancel={() => this.setState({showAddTask: false})} 
                    />

                <ImageBackground 
                    source={image} 
                    style={styles.background}>

                    <View style={styles.iconBar}>

                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='bars' size={20} color={commomStyles.colors.secondary} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon 
                                name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                                size={20} 
                                color={commomStyles.colors.secondary} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.titleBar}>
                        <Text style={styles.title}>
                            {this.props.title}
                        </Text>
                        <Text style={styles.subtitle}>
                            {moment().locale('pt-br').format('ddd, D [de] MMMM')}
                        </Text>
                    </View>
                </ImageBackground>

                <View style={styles.tasksContainer}>
                    <FlatList 
                        data={this.state.visibleTasks} 
                        keyExtractor={item => `${item.id}`} 
                        renderItem={({item}) => <Task {...item} onToggleTask={this.toggleTask} onDelete={this.deleteTask} />} />
                </View>

                <ActionButton 
                    buttonColor={styleColor}
                    onPress={() => this.setState({showAddTask: true})}>
                </ActionButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: commomStyles.fontFamily,
        color: commomStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 10,
    },
    subtitle: {
        fontFamily: commomStyles.fontFamily,
        color: commomStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30,
    },
    tasksContainer: {
        flex: 7
    },
    iconBar: {
        marginTop: Platform.os === 'ios' ? 30 : 10,
        marginHorizontal: 20,
        flexDirection: 'row',
        //justifyContent: 'flex-end',
        justifyContent: 'space-between',
    }
})