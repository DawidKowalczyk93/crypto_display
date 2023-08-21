import './App.css'
import './styles/normalize.css'
import Header from "./Header.jsx";
import CryptoList from "./CryptoList.jsx";
import React, {useState, useEffect} from "react";
import DragAndDrop from "./components/DragnDrop.jsx";


const data = [
    {title: 'Display', items: []},
    {title: 'List of crypto', items: ['BCA', 'ACB', 'ADB', 'DBA', 'ABC']},
];

function App() {
    const [toDisplay, setToDisplay] = useState('');
    const [dataApi, setDataApi] = useState('');

    useEffect( () => {
        fetch(new Request("https://api.livecoinwatch.com/coins/single"), {
            method: "POST",
            headers: new Headers({
                "content-type": "application/json",
                "x-api-key": "ed53d5ba-4ed1-48d0-90ae-a1dc225a4c81",
            }),
            body: JSON.stringify({
                currency: "USD",
                code: "ETH",
                meta: true,
            }),
        }).then(response => response.json())
          .then(data => {
              console.log(data);
              setDataApi(data.rate)});
    },[toDisplay])



  return (
    <>
        <div className='container'>
            <Header/>
            <div className='main'>
                <div className='main__col'>
                    <DragAndDrop data={data} toDisplay={toDisplay} setToDisplay={setToDisplay}/>
                </div>
                <div className='lcd__wrapper'>
                    <div className='lcd-container'>
                        <div className='lcd-line'>
                            {toDisplay} {dataApi}
                        </div>

                    </div>
                </div>

            </div>
        </div>


    </>
  )
}

export default App
