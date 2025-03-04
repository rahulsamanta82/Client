import { legacy_createStore as createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createLogger } from 'redux-logger';
import { thunk } from "redux-thunk";
import rootReducer from "./reducers";

const loggerMiddleware: any = createLogger();
const persistConfig = {
    key: "root",
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
);
export const appPersist = persistStore(store);
