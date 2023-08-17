import React, {useState, useRef} from "react";


const DragAndDrop = ({data}) => {

    const [list, setList] = useState(data);
    const [dragging, setDragging] = useState(false);
    const dragItem = useRef();
    const dragNode = useRef();

    const handleDragStart = (e, params) => {
        console.log('drag start', params)
        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend', handleDragEnd)
        setDragging(true);
    };

    const handleDragEnter = (e , params) => {
        console.log('dragging enter..')
        const currentItem = dragItem.current;
        setList((oldList) => {
            let newList = JSON.parse(JSON.stringify(oldList));
            console.log(newList)
            newList[params.groupIndex].items.splice(params.itemIndex, 0 , newList[currentItem.groupIndex].items.splice(currentItem.itemIndex,1)[0]);
            dragItem.current = params;

            return newList
        });
        if(e.target !== dragNode.current) {
            console.log('TARGET IS NOT THE SAME');

        }
    };
    const handleDragEnd = () => {
        console.log('ending drag...')
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
                    className='crypto__block--wrapper'
                    key={group.title}
                    onDragEnter={dragging && !group.items.length ? (e) => {handleDragEnter(e, {groupIndex, itemIndex: 0})} : null }
                >
                    <h1>{group.title}</h1>
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