import {createStore, combineReducers,applyMiddleware} from 'redux'
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from 'redux-persist';
import toggeReducer from './cart/cart.toggle.reducer';
const logger = createLogger();
const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    toggle: toggeReducer
})

const persistConfig = {
    key: "root",
    storage,
    whitelist: ['cart']
}
const middleWare = [logger,thunk]

 const persistedReducer = persistReducer(persistConfig, rootReducer); 
export const store= createStore(persistedReducer,applyMiddleware(...middleWare));
export const persistor = persistStore(store);
