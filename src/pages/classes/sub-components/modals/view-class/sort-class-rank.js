/* eslint-disable no-unused-vars */
import { Menu } from '@carbon/icons-react';
import { Accordion, AccordionItem } from 'carbon-components-react';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useGetClassesRanked } from '../../../../../redux/classes/hook';

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
};
  
/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
const sourceClone = Array.from(source);
const destClone = Array.from(destination);
const [removed] = sourceClone.splice(droppableSource.index, 1);

destClone.splice(droppableDestination.index, 0, removed);

const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 2;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    margin: `0 0 12px 0`,
    background: 'white',

    // styles we need to apply on draggables
    ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
background: 'none',
width: '100%',
});

const SortRankInfo = () => {
    // const navigate = useNavigate();
    const [classRanks, setClassRanks] = useState([[]])
    const { data: classes } = useGetClassesRanked(
        1000,
        1,
    );
    console.log(classes)

    useEffect(() => {
        if (classes) {
            setClassRanks([classes])
        }
    }, [classes])

    function onDragEnd(result) {
        const { source, destination } = result;
    
        // dropped outside the list
        if (!destination) {
          return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;
    
        if (sInd === dInd) {
          const items = reorder(classRanks[sInd], source.index, destination.index);
          const newState = [...classRanks];
          newState[sInd].class_level = items.class_level;
          setClassRanks(newState);
        } else {
          const result = move(
            classRanks[sInd],
            classRanks[dInd],
            source,
            destination,
          );
          const newState = [...classRanks];
          newState[sInd] = result[sInd];
          newState[dInd] = result[dInd];
    
          setClassRanks(newState.filter((group) => group.length));
        }
    }

    return (
        <React.Fragment>
            <div className='flex flex-col gap-4 w-full -mx-2'>
            <DragDropContext onDragEnd={onDragEnd}>
                {classRanks?.map((el, ind) => (
                    <Droppable  key={ind} droppableId={`${ind}`}>
                        {(provided, snapshot) => (
                            <div
                                className=''
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                            >
                                {el.map((item, index) => (
                                    
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div 
                                                className='flex items-start justify-between min-h-[48px] w-full gap-3 pl-3'
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style,
                                                )}
                                            >
                                                <div className='flex w-[25%] items-center justify-between pt-[11px]'>
                                                    <span className='text-[14px]'>Rank {item.class_level}</span>
                                                    <Menu width={20} height={20}/>
                                                </div>
                                                <div 
                                                    className='flex !bg-white min-h-full min-w-[75%] max-w-[75%] items-center rounded'
                                                >
                                                    <Accordion
                                                        className='w-full'
                                                    >
                                                        <AccordionItem
                                                            title={item.name}
                                                        >
                                                            <p className='text-justify w-full'>
                                                                There  {item.sub_classes.length === 1 ? 'is 1 sub-class' : `are ${item.sub_classes.length} sub-classes`}  in this class
                                                            </p>
                                                        </AccordionItem>
                                                    </Accordion>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </DragDropContext>
            </div>
        </React.Fragment>
    );
};

export default SortRankInfo;