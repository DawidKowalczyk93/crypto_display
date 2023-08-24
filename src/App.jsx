import './styles/normalize.css'
import store from "./model.jsx";
import {StoreProvider, createStore} from "easy-peasy";
import Header from "./Header.jsx";
import React, {useState, useEffect} from "react";
import DragAndDrop from "./components/DragnDrop.jsx";
import LcdDisplay from "./components/LcdDisplay.jsx";

const data = [
    {
        title: 'Display',
        items: []
    },
    {
        title: 'List of crypto',
        items: ['BTC', 'ETH', 'XRP', 'ADA', 'MATIC', 'BNB', 'ARB']
    },
];



function App() {
    const [toDisplay, setToDisplay] = useState('');
    const [dataApi, setDataApi] = useState('');

  return (
    <>
        <StoreProvider store={store}>
        <div className='container'>
            <Header/>
            <div className='main'>
                <div className='main__col'>
                    <DragAndDrop data={data} toDisplay={toDisplay} setToDisplay={setToDisplay}/>
                </div>
                <LcdDisplay toDisplay={toDisplay} />
            </div>
        </div>
        </StoreProvider>
    </>
  )
}

export default App
