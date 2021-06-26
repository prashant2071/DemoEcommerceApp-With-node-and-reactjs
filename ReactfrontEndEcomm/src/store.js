//store configuration 
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import combineReducers from './reducers/index'
//reducer vaneko plain javascript ko function jun store vitra hunxa
// createStore vitra reducer poila ,teshpaxi Initial state,enhancer (ma applyMiddleware garera middleware rakhna milxa)
const middleware=[thunk]
//delay garna puryo vane hamle thunk use garxau
const initialState={
    product:{
        records:[],
        loading:false,
        submitting:false,
        product:{},
        pageNumber:1,
        pageSize: 5,
    },
    users:{
        record:{},
        data:[]
    }
}
export const store= createStore(combineReducers,initialState,applyMiddleware(...middleware))   
// In this state store is created from createStore  so that root reducer goes to mapStateToProps