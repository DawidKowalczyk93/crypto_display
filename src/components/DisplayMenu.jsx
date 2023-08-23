import {PowerOnOff} from "./PowerOnOff.jsx";
import {useState} from "react";
import {useStore} from "easy-peasy";
import { useStoreActions, useStoreState } from 'easy-peasy';

const DisplayMenu = () => {

    const isOnPrice = useStoreState(state => state.display.isOnPrice);
    const isOnOneHour = useStoreState(state => state.display.isOnOneHour);
    const isOnDay = useStoreState(state => state.display.isOnDay);

    const setIsOnPrice = useStoreActions(actions => actions.display.setIsOnPrice);
    const setIsOnOneHour = useStoreActions(actions => actions.display.setIsOnOneHour);
    const setIsOnDay = useStoreActions(actions => actions.display.setIsOnDay);



    return <div className='menu__wrapper'>
            <button onClick={() => setIsOnPrice(!isOnPrice)} className='crypto__menu'>
                Price
                <PowerOnOff isOn={isOnPrice}/>
            </button>
            <button onClick={() => setIsOnOneHour(!isOnOneHour)} className='crypto__menu'>
                1 hr change
                <PowerOnOff isOn={isOnOneHour}/>
            </button>
            <button onClick={() => setIsOnDay(!isOnDay)} className='crypto__menu'>
                24 hr change
                <PowerOnOff isOn={isOnDay}/>
            </button>
    </div>
};

export default DisplayMenu