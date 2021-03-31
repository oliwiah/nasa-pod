import React, { ReactNode, useEffect, useReducer } from 'react';

import { PodResponseType } from './../App';
import { LocalFavouritesService } from './services/LocalFavouritesService';

type Props = {
    children: ReactNode;
};

type State = {
    pods: Array<PodResponseType> | null;
    totalPods: number;
    isLoading: boolean;
};

type PayloadProps = {
    data?: Array<Object>;
};

type FetchAction = {
    type: 'fetch';
};

type AddPodAction = {
    type: 'add-pod';
    payload: {
        pod: PodResponseType;
    };
};

type RemovePodAction = {
    type: 'remove-pod';
    payload: {
        pod: PodResponseType;
    };
};

type InitializeFavouritesAction = {
    type: 'initialize-favourites';
};

type Action = FetchAction | AddPodAction | RemovePodAction | InitializeFavouritesAction;

const initialState: State = {
    pods: null,
    totalPods: 0,
    isLoading: false,
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'fetch':
            return {
                ...state,
                isLoading: true,
            };
        case 'add-pod':
            return {
                ...state,
                pods: [action.payload.pod, ...(state.pods || [])],
                totalPods: state.totalPods + 1,
                isLoading: false,
            };
        case 'remove-pod':
            return {
                ...state,
                pods: state.pods
                    ? state.pods.filter((pod) => pod.url !== action.payload.pod.url)
                    : null,
                totalPods: state.totalPods > 0 ? state.totalPods - 1 : 0,
                isLoading: false,
            };
        case 'initialize-favourites':
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

export const FavouritesContextProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const localFavouritesService = LocalFavouritesService.getInstance();

    const fetchPods = async () => {
        dispatch({ type: 'fetch' });
    };

    const addPod = async (pod: PodResponseType) => {
        localFavouritesService.addPodUrl(pod.url);

        dispatch({ type: 'add-pod', payload: { pod } });
    };

    const removePod = async (pod: PodResponseType) => {
        localFavouritesService.removePodUrl(pod.url);

        dispatch({ type: 'remove-pod', payload: { pod } });
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

type FavouritesContextType = State & {
    addPod: Function;
    removePod: Function;
    refreshPods: Function;
};

export const FavouritesContext = React.createContext({
    addPod: (pod: PodResponseType) => Promise.resolve(),
    removePod: (pod: PodResponseType) => Promise.resolve(),
    refreshPods: () => Promise.resolve(),
    pods: null as PodResponseType[] | null,
    totalPods: 0,
    isLoading: false,
});
