import {useMemo} from "react";
import {createDriver} from "@redux-requests/axios";
import {handleRequests} from "@redux-requests/core";
import {createStore, applyMiddleware, combineReducers, compose} from "redux";

import apiClient from "../libs/apiClient";

let store;

function initStore(preloadedState = {}) {
    const {
        requestsReducer,
        requestsMiddleware,
    } = handleRequests({driver: createDriver(apiClient), cache: true});

    const reducers = combineReducers({
        requests: requestsReducer,
    });
    const composeEnhancers =
        typeof window !== "undefined"
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            : compose;

    return createStore(
        reducers,
        preloadedState,
        composeEnhancers(applyMiddleware(...requestsMiddleware)),
    );
}

export const initializeStore = (preloadedState) => {
    let _store = store ?? initStore(preloadedState);

    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        });

        store = undefined;
    }

    // For SSG and SSR always create a new store
    if (typeof window === "undefined") return _store;
    // Create the store once in the client
    if (!store) store = _store;

    return _store;
};

export function useStore(initialState) {
    const store = useMemo(() => initializeStore(initialState), [initialState]);
    return store;
}