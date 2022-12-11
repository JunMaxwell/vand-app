import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';
import { useEffect, useReducer } from 'react';
import { data } from './dummyData';

export const useAPI = makeUseAxios({
    axios: axios.create({
        baseURL: process.env.REACT_APP_API_PATH,
        headers: {
            'X-Access-Token': process.env.REACT_APP_API_ACCESS_TOKEN,
        },
    }),
});

export const useAPIFallback = () => {
    const [state, dispatch] = useReducer(
        (state, action) => {
            switch (action.type) {
                case 'reject':
                    return {
                        ...state,
                        loading: false,
                        error: {
                            message: 'Error loading data',
                        },
                    };
                case 'resolve':
                default:
                    return {
                        ...state,
                        loading: false,
                        data: data,
                    };
            }
        },
        { loading: true },
    );

    useEffect(() => {
        delay(2000).then(() => {
            dispatch({ type: 'resolve' });
        });
    }, []);

    return [state];
};

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), ms);
    });
}
