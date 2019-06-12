//import React from 'react'
import { createSwitchNavigator } from 'react-navigation'
import Agenda from './screens/Agenda'
import Auth from './screens/Auth'

const MainRoutes = {
    Auth: {
        name: 'Auth',
        screnn: Auth,
    },
    Home: {
        name: 'Home',
        screnn: Agenda,
    },
}

const MainNavigator = createSwitchNavigator(MainRoutes, {initialRouteName: 'Auth'})

export default MainNavigator