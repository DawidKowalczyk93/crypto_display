import React, {useEffect, useState} from "react";
import {useStoreState} from "easy-peasy";
import {ArrowUp, ArrowDown} from "./Icons.jsx";

const LcdDisplay = ({toDisplay}) => {

    const isOnPrice = useStoreState(state => state.display.isOnPrice);
    const isOnOneHour = useStoreState(state => state.display.isOnOneHour);
    const isOnDay = useStoreState(state => state.display.isOnDay);
    const [price, setPrice] = useState();
    const [symbol, setSymbol] = useState();
    const [hourChange, setHourChange] = useState();
    const [dayChange, setDayChange] = useState();

    console.log(isOnPrice);
    useEffect( () => {
        fetch(new Request("https://api.livecoinwatch.com/coins/single"), {
            method: "POST",
            headers: new Headers({
                "content-type": "application/json",
                "x-api-key": "ed53d5ba-4ed1-48d0-90ae-a1dc225a4c81",
            }),
            body: JSON.stringify({
                currency: "USD",
                code: `${toDisplay}`,
                meta: true,
            }),
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                setPrice(data.rate.toFixed(2));
                setSymbol(data.symbol);
                setDayChange(data.delta.day);
                setHourChange(data.delta.hour)
            });
    },[isOnPrice, toDisplay]);

    console.log(dayChange);

    const fixData = (data) => {
        data = ((data - 1) * 100).toFixed(2);
        return data
    };


    return (
        <div className='lcd__wrapper'>
            <div className='lcd-container'>
                <div className='lcd-line'>
                    {toDisplay} {isOnPrice && toDisplay  !== '' ? `$${price}` : null}
                </div>
                <div className='lcd-line'>
                    {isOnDay && toDisplay  !== ''
                        ? <div>
                            24h {fixData(dayChange)}% {fixData(dayChange) >= 0 ? <ArrowUp /> : <ArrowDown />}
                        </div>
                        : null}
                    {isOnOneHour && toDisplay  !== ''
                        ? <div> 1h {((hourChange - 1) * 100).toFixed(2)}% </div>
                        : null}
                </div>
            </div>
        </div>
    )
};

export default LcdDisplay