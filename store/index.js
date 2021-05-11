import {createStore, applyMiddleware} from "redux";
import {reducers} from "./reducers";
import {useMemo} from "react";

import thunk from "redux-thunk";

let store;

function initStore(preloadedState = {}) {
    return createStore(
        reducers,
        preloadedState,
        applyMiddleware(thunk)
    )
}

export const initializeStore = (preloadedState) => {
    let _store = store ?? initStore(preloadedState)

    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        })

        store = undefined
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store

    return _store
}

export function useStore(initialState) {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    return store
}
