import './App.css'
import './styles/normalize.css'
import Header from "./Header.jsx";
import CryptoList from "./CryptoList.jsx";
import React, {useState} from "react";
import DragAndDrop from "./components/DragnDrop.jsx";


const data = [
    {title: 'group 1', items: []},
    {title: 'group 2', items: ['4', '5', '6', '7']},
];

function App() {
    const [isDragging, setIsDragging] = useState(false);
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
                    <DragAndDrop data={data}/>
                </div>
                <div className='crypto__block--wrapper'></div>

            </div>
        </div>


    </>
  )
}

export default App
