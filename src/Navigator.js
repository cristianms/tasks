import React from 'react'
import { createSwitchNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation'
import Agenda from './screens/Agenda'
import Auth from './screens/Auth'
import AuthOrApp from './screens/AuthOrApp'
import commomStyles from './commomStyles'
import Menu from './screens/Menu'

//rotas do drawer navigator (menu lateral)
const MenuRoutes = {
    Today: {
        name: 'Today',
        screen: props => <Agenda title="Hoje" daysAhead={0} {...props} />,
        navigationOptions: {
            title: 'Hoje :P'
        }
    },
    Tomorrow: {
        name: 'Tomorrow',
        screen: props => <Agenda title="Amanhã" daysAhead={1} {...props} />,
        navigationOptions: {
            title: 'Amanhã :)'
        }
    },
    Week: {
        name: 'Week',
        screen: props => <Agenda title="Semana" daysAhead={7} {...props} />,
        navigationOptions: {
            title: 'Semana :D'
        }
    },
    Month: {
        name: 'Month',
        screen: props => <Agenda title="Mês" daysAhead={30} {...props} />,
        navigationOptions: {
            title: 'Mês ;p'
        }
    },
}

const MenuConfig = {
    initialRouteName: 'Today',
    contentComponent: Menu,
    contentOptions: {
        labelStyle: {
            fontFamily: commomStyles.fontFamily,
            fontWeight: 'normal',
            fontSize: 20,
        },
        activeLabelStyle: {
            color: '#080',
        }
    }
}

const MenuNavigator = createDrawerNavigator( MenuRoutes, MenuConfig )




//rotas do switch navigator (navegacao sem menu)
const MainRoutes = {
    Loading: {
        name: 'Loading',
        screen: AuthOrApp,
    },
    Auth: {
        name: 'Auth',
        screen: Auth,
    },
    Home: {
        name: 'Home',
        //screen: Agenda,
        screen: MenuNavigator,
    },
}

const MainNavigator = createAppContainer(createSwitchNavigator(MainRoutes, { initialRouteName: 'Loading' }))



export default MainNavigator