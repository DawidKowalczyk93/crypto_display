import './App.css'
import './styles/normalize.css'
import Header from "./Header.jsx";
import CryptoList from "./CryptoList.jsx";
import React, {useState} from "react";
import DragAndDrop from "./components/DragnDrop.jsx";


const data = [
    {title: 'Display', items: []},
    {title: 'List of crypto', items: ['BCA', 'ACB', 'ADB', 'DBA', 'ABC']},
];

function App() {
    const [isDragging, setIsDragging] = useState(false);
    const [toDisplay, setToDisplay] = useState('');
    const handleDragStart = () => {
        console.log('drag started');
        setIsDragging(true);
    };



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
                            {toDisplay}
                        </div>

                    </div>
                </div>

            </div>
        </div>


    </>
  )
}

export default App
