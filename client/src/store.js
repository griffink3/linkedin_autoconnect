import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';
import Thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
  };
  
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore () {
    const store = createStore(
      persistedReducer,
      applyMiddleware(Thunk)
    );
    const persistor = persistStore(store);
    return { store, persistor };
}