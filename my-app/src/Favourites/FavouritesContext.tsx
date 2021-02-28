import React, { useEffect, useReducer, useContext } from 'react';
import get from 'lodash/get';

import { LocalFavouritesService } from './services/LocalFavouritesService';

type Props = {
    children: React$Node;
};

type ReducerProps = {
    pods: Array<Object> | null;
    totalPods: number;
    isLoading: boolean;
};

type PayloadProps = {
    data?: Array<Object>;
};

type ActionProps = {
    type: string;
    payload?: PayloadProps;
    pod?: Object;
    reduced?: Object;
};

const initialState: ReducerProps = {
    pods: null,
    totalPods: 0,
    isLoading: false,
};

const reducer = (state: ReducerProps, action: ActionProps) => {
    switch (action.type) {
        case 'fetch':
            return {
                ...state,
                isLoading: true,
            };
        case 'add-pod':
            return {
                ...state,
                pods: [action.pod, ...(state.pods || [])],
                totalPods: state.totalPods + 1,
                isLoading: false,
            };
        case 'remove-pod':
            return {
                ...state,
                pods: action.reduced,
                totalPods: state.totalPods > 0 ? state.totalPods - 1 : 0,
                isLoading: false,
            };
        case 'initialize-favourites':
            return {
                ...initialState,
            };
        default:
            return {};
    }
};

export const FavouritesContextProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const localFavouritesService = LocalFavouritesService.getInstance();

    const fetchPods = async () => {
        dispatch({ type: 'fetch' });
    };

    const addPod = async (pod) => {
        localFavouritesService.addPodUrl(pod.url);

        dispatch({ type: 'add-pod', pod });
    };

    const removePod = async (pod) => {
        const reduced = state.pods
            ? state.pods.reduce((acc, current) => {
                  if (current.url !== pod.url) {
                      acc.push(current);
                  }
                  return acc;
              }, [])
            : [];
        localFavouritesService.removePodUrl(pod.url);

        dispatch({ type: 'remove-pod', reduced });
    };

    const initialize = () => {
        dispatch({
            type: 'initialize-favourites',
        });
        fetchPods();
    };

    useEffect(() => {
        initialize();
    }, []);

    return (
        <FavouritesContext.Provider
            value={{
                pods: state.pods,
                totalPods: state.totalPods,
                addPod,
                removePod,
                refreshPods: fetchPods,
                isLoading: state.isLoading,
            }}
        >
            {children}
        </FavouritesContext.Provider>
    );
};

export type ObservedContextType = {
    pods: ?Array<T>;
    totalPods: number;
    addPod: Function;
    removePod: Function;
    refreshPods: Function;
    isLoading: boolean;
};

export const FavouritesContext: React$Context<FavouritesContextType> = React.createContext({
    pods: [],
    totalPods: 0,
    addPod: () => null,
    removePod: () => null,
    refreshPods: () => null,
    isLoading: false,
});