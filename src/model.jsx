import { action, createStore } from 'easy-peasy';

const storeModel = {
    cryptos: {},
    display: {
        isOnPrice: false,
        isOnOneHour: false,
        isOnDay: false,
        setIsOnPrice: action((state, payload) => {
            state.isOnPrice = payload;
        }),
        setIsOnOneHour: action((state, payload) => {
            state.isOnOneHour = payload;
        }),
        setIsOnDay: action((state, payload) => {
            state.isOnDay = payload;
        }),
    },
};

const store = createStore(storeModel);

export default store;