import { Alert, Platform } from 'react-native'

const iphotel = 'http://10.10.149.181:3000'
const ipevento = 'http://10.10.139.100:3000'
const icasa = 'http://192.168.0.105:3000'
const server = Platform.OS === 'ios' ? 'http://localhost:3000' : icasa
//const server = 'http://localhost:3000'

function showError(err) {
    Alert.alert('Ops! Ocorreu um problema!', `Mensagem: ${err}`)
}

export { server, showError }