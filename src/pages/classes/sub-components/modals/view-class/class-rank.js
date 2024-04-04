/* eslint-disable no-unused-vars */
import { Menu } from '@carbon/icons-react';
import { Accordion, AccordionItem } from 'carbon-components-react';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useGetClassesRanked } from '../../../../../redux/classes/hook';

const RankInfo = () => {
    // const navigate = useNavigate();
    const { data: classRanks } = useGetClassesRanked(
        1000,
        1,
    );

    return (
        <React.Fragment>
            <div className='flex flex-col gap-4 w-full -mx-2'>
                {classRanks?.map((item, index) => (
                <div 
                    className='flex items-start justify-between min-h-[48px] w-full gap-3 pl-3'
                >
                    <div className='flex w-[20%] items-center justify-between pt-[11px]'>
                        <span className='text-[14px]'>Rank {item.class_level}</span>
                        {/* <Menu width={20} height={20}/> */}
                    </div>
                    <div 
                        className='flex !bg-white min-h-full min-w-[80%] max-w-[80%] items-center rounded'
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
                ))}
            </div>
        </React.Fragment>
    );
};

export default RankInfo;