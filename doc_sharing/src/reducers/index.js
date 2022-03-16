import currentUser from './currentUser'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    currentUser,
})

export default rootReducer