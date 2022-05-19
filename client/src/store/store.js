import { createStore} from 'redux';
import storage from 'redux-persist/lib/storage';
import reducer from './reducers/index';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import {
    persistStore,
    persistReducer
} from 'redux-persist';

const persistConfig = {
    key : 'persist-key',
    storage
}

const persistedReducer = persistReducer(persistConfig , reducer);


export const store = createStore(persistedReducer , {} , applyMiddleware(thunk));
const persistor = persistStore(store);

export default store;
export {persistor}