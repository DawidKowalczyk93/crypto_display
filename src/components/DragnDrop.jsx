import React, {useState, useRef} from "react";


const DragAndDrop = ({data, toDisplay, setToDisplay}) => {

    const [list, setList] = useState(data);
    const currentDisplay= useRef();
    const [dragging, setDragging] = useState(false);
    const dragItem = useRef();
    const dragNode = useRef();

    const handleDragStart = (e, params) => {
        console.log('drag start', params)
        dragItem.current = params;
        dragNode.current = e.target;
        console.log('dragItem.current: ', dragItem.current, 'dragNode.current: ', dragNode.current);
        dragNode.current.addEventListener('dragend', handleDragEnd)
        setDragging(true);
    };

    const handleDragEnter = (e , params) => {
        console.log('dragging enter..')
        const currentItem = dragItem.current;
        console.log('currentItem:  ', currentItem);
        setList((oldList) => {
            let newList = JSON.parse(JSON.stringify(oldList));
            let deleteFromOldList = newList[currentItem.groupIndex].items.splice(currentItem.itemIndex,1)[0];
            console.log('deleteFromOldList ', deleteFromOldList );

            dragItem.current = params;
            currentDisplay.current = list[0].items[0];

            if(newList[0].items.length > 0 && params.groupIndex === 0) {
                console.log('w tablicy diplay jest już item');
                newList[0].items.splice(0, 1 );
                newList[0].items.splice(0, 0 , deleteFromOldList);
                newList[1].items.splice(0,0, currentDisplay.current);
            }else {
                newList[params.groupIndex].items.splice(params.itemIndex, 0 , deleteFromOldList);
            }



            return newList;
        });

    };
    const handleDragEnd = () => {
        console.log('ending drag...');
        setToDisplay(currentDisplay.current);
        console.log('curentDisplay----------:',currentDisplay.current);
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
            </div>

        ) )}
    </>)
};

export default DragAndDrop