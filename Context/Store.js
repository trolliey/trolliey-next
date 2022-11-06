import { createContext, useReducer } from 'react'
import Cookies from 'js-cookie'

const initialState = {
    darkMode: false,
    cart: {
        cartItems: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : []
    },
    userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null,
    search_query: '',
    currency: Cookies.get('trolliey_currency') ? Cookies.get('trolliey_currency') : 'USD'
}

export const Store = createContext();

function reducer(state={search_category:''}, action) {
    switch (action.type) {
        case 'DARK_MODE_ON':
            return { ...state, darkMode: true }
        case 'DARK_MODE_OFF':
            return { ...state, darkMode: false }
        case 'ADD_TO_CART':
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find(item => item._id === newItem._id)
            const cartItems = existItem ? state.cart.cartItems.map((item) => item._id === existItem._id ? newItem : item) : [...state.cart.cartItems, newItem];
            Cookies.set('cartItems', JSON.stringify(cartItems))
            return { ...state, cart: { ...state.cart, cartItems } }
        case 'CHANGE_CURRENCY':
            Cookies.set('trolliey_currency', action.payload)
            return {...state, currency: action.payload}
        case 'REMOVE_FROM_CART':
            const NewcartItems = state.cart.cartItems.filter(item => item._id !== action.payload._id)
            Cookies.set('cartItems', JSON.stringify(NewcartItems))
            return { ...state, cart: { ...state.cart, cartItems : NewcartItems } }
        case 'CLEAR_CART':
            return {...state, cart: {cartItems: []}}
        case 'USER_LOGIN':
            Cookies.set('userInfo', JSON.stringify(action.payload), { expires: 7 })
            return { ...state, userInfo: action.payload }
        case 'USER_LOGOUT':
            Cookies.remove('userInfo')
            return { ...state, userInfo: null, cart: { cartItems: [] } }
        case 'SET_SEARCH_QUERY':
            return { ...state, search_query: action.payload }
        case 'SET_SEARCH_CATEGORY':
            return { ...state, search_category: action.payload }
        case 'SET_SORT_VALUE':
            return { ...state, sort_value: action.payload }
        case 'SET_SORT_ORDER':
            return { ...state, sort_order: action.payload }
        case 'SET_POLL_URL':
            return {...state, poll_url: action.payload}
        default:
            return state
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}