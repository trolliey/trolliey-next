import { createContext, useEffect, useReducer } from 'react'
import Cookies from 'js-cookie'
import Amount, { convertAmounts } from '../components/Amount/Amount'
import { data } from './../utils/data'
import { apiUrl } from '../utils/apiUrl'




const initialState = {
  darkMode: false,
  cart: {
    cartItems: Cookies.get('cartItems')
      ? JSON.parse(Cookies.get('cartItems'))
      : [],
  },
  userInfo: Cookies.get('userInfo')
    ? JSON.parse(Cookies.get('userInfo'))
    : null,
  search_query: '',
  currency: Cookies.get('trolliey_currency')
    ? Cookies.get('trolliey_currency')
    : 'USD',
}

export const Store = createContext()
const selectedCurrency = initialState.currency
const getRate = async () => {
  let user = JSON.parse(Cookies.get('userInfo'));
  
  const res = await fetch(`${apiUrl}/api/v2/settings`, {


    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: ` ${user.token}`,
    },
  })
  const data = await res.json()
 
  return data
}





function reducer(state = { search_category: '', exchangeRate: 1 }, action) {
  switch (action.type) {
    case 'DARK_MODE_ON':
      return { ...state, darkMode: true }
    case 'DARK_MODE_OFF':
      return { ...state, darkMode: false }
    case 'SET_EXCHANGE_RATE':
      return { ...state, exchangeRate: action.payload };
    case 'ADD_TO_CART':
      const newItem = action.payload
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      )
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem]
      const convertedCartItems = cartItems.map((item) => ({
        ...item,
        id: item._id,
        // ovewrite the price with the converted price
        rtgs_price: item.price * state.exchangeRate,
      }))

      console.log(state.currency, ',,,,,,')

      Cookies.set('cartItems', JSON.stringify(convertedCartItems))
      console.log(convertedCartItems)

      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: convertedCartItems,
        },
      }
    case 'CHANGE_CURRENCY':
      Cookies.set('trolliey_currency', action.payload)
      return { ...state, currency: action.payload }
    case 'REMOVE_FROM_CART':
      const NewcartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      )
      Cookies.set('cartItems', JSON.stringify(NewcartItems))
      return { ...state, cart: { ...state.cart, cartItems: NewcartItems } }
    case 'CLEAR_CART':
      return { ...state, cart: { cartItems: [] } }
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
      return { ...state, poll_url: action.payload }
    default:
      return state
  }
}

export function StoreProvider(props) {
 const [state, dispatch] = useReducer(reducer, initialState);

useEffect(() => {
  getRate()
    .then((exchangeRateData) => {
      const exchangeRate = exchangeRateData?.settings?.exchange_rate;

      // Dispatch an action to set the exchange rate in the state
      dispatch({
        type: 'SET_EXCHANGE_RATE',
        payload: exchangeRate,
      });

      // Change the currency to trigger re-render with the updated exchange rate
      dispatch({
        type: 'CHANGE_CURRENCY',
        payload: selectedCurrency,
      });
    })
    .catch((error) => {
      console.error('Error fetching exchange rate:', error);
    });
}, [selectedCurrency]);

  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;


}
