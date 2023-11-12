/* eslint-disable no-unused-vars */
import { Menu } from '@carbon/icons-react';
import { Accordion, AccordionItem } from 'carbon-components-react';
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
    userSelect: 'none',
    padding: grid * 2,
    paddingRight: 16,
    paddingLeft: 16,
    margin: `0 0 20px 0`,
    background: 'white',
  
    // styles we need to apply on draggables
    ...draggableStyle,
});
  
const getListStyle = () => ({
    background: 'whitesmoke',
    padding: grid,
    width: '100%',
});

const SortRankInfo = () => {
    // const navigate = useNavigate();
    const [classRanks, setClassRanks] = useState(
        [
            {}
        ]
    )
    // function onDragEnd(result) {
    //     const { source, destination } = result;
    
    //     // dropped outside the list
    //     if (!destination) {
    //       return;
    //     }
    //     const sInd = +source.droppableId;
    //     const dInd = +destination.droppableId;
    
    //     if (sInd === dInd) {
    //       const items = reorder(subWorkflow[sInd], source.index, destination.index);
    //       const newState = [...subWorkflow];
    //       newState[sInd] = items;
    //       setSubWorkflow(newState);
    //     } else {
    //       const result = move(
    //         subWorkflow[sInd],
    //         subWorkflow[dInd],
    //         source,
    //         destination,
    //       );
    //       const newState = [...subWorkflow];
    //       newState[sInd] = result[sInd];
    //       newState[dInd] = result[dInd];
    
    //       setSubWorkflow(newState.filter((group) => group.length));
    //     }
    //   }
    return (
        <React.Fragment>
            <div className='flex flex-col gap-4 w-full -mx-2'>
                {classRanks?.length > 1 && classRanks?.map(() => (
                    <div className='flex items-start justify-between min-h-[48px] w-full gap-3'>
                        <div className='flex w-[25%] items-center justify-between pt-[11px]'>
                            <span className='text-[14px]'>Rank 1</span>
                            <Menu width={20} height={20}/>
                        </div>
                        <div 
                            className='flex !bg-white min-h-full min-w-[75%] max-w-[75%] items-center rounded'
                        >
                            <Accordion>
                                <AccordionItem
                                    title="1"
                                >
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                        commodo consequat.
                                    </p>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
};

export default SortRankInfo;