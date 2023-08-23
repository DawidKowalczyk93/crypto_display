import React, {useState, useRef} from "react";
import DisplayMenu from "./DisplayMenu.jsx";

const DragAndDrop = ({data, toDisplay, setToDisplay}) => {

    const [list, setList] = useState(data);
    const currentDisplay= useRef();
    const listLength = useRef();
    const [dragging, setDragging] = useState(false);
    const dragItem = useRef();
    const dragNode = useRef();

    const handleDragStart = (e, params) => {
        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend', handleDragEnd)
        setDragging(true);
    };

    const handleDragEnter = (e , params) => {

        const currentItem = dragItem.current;
        setList((oldList) => {
            let newList = JSON.parse(JSON.stringify(oldList));
            let deleteFromOldList = newList[currentItem.groupIndex].items.splice(currentItem.itemIndex,1)[0];
            dragItem.current = params;
            currentDisplay.current = oldList[0].items[0];
            console.log(currentDisplay.current);
            if(newList[0].items.length > 0 && params.groupIndex === 0) {
                newList[0].items.splice(0, 1 );
                newList[0].items.splice(0, 0 , deleteFromOldList);
                newList[1].items.splice(0,0, currentDisplay.current);
                currentDisplay.current = deleteFromOldList;
            }else {
                newList[params.groupIndex].items.splice(params.itemIndex, 0 , deleteFromOldList);
            }

            listLength.current = newList[0].items.length;
            return newList;
        });

    };
    const handleDragEnd = () => {
        console.log(currentDisplay.current);
        console.log(listLength);
        if(listLength.current === 0) {
            setToDisplay('')
        } else {
            setToDisplay(currentDisplay.current);
        }



        setDragging(false);
        dragNode.current.removeEventListener('dragend', handleDragEnd);
        dragItem.current = null;
        dragNode.current = null;

    };

    const getStyles = (params) => {
        const currentItem = dragItem.current;
        if(currentItem.groupIndex === params.groupIndex && currentItem.itemIndex === params.itemIndex) {
            return 'current crypto__block'
        }else {
            return 'crypto__block'
        }
    };

    return (<>
        {list.map( (group, groupIndex) => (
            <div
                className={groupIndex === 1 ? 'crypto__block--list' : 'crypto__block--display'}
                key={group.title}
                onDragEnter={dragging && !group.items.length ? (e) => {handleDragEnter(e, {groupIndex, itemIndex: 0})} : null }
            >
                <h1>{group.title} {groupIndex}</h1>

                {group.items.map( (item, itemIndex) => (
                    <div
                        draggable
                        onDragStart={event => handleDragStart(event, {groupIndex, itemIndex})}
                        onDragEnter={dragging ? (e) => handleDragEnter(e, {groupIndex, itemIndex}) : null}
                        key={itemIndex}
                        className={dragging ? getStyles({groupIndex, itemIndex}) : 'crypto__block'}
                    >
                        {item}
                    </div>

                )  )}
                {groupIndex === 0 && listLength.current > 0 ? <DisplayMenu /> : null}
            </div>

        ) )}
    </>)
};

export default DragAndDrop