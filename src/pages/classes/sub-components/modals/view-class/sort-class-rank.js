import { Menu } from '@carbon/icons-react';
import { Accordion, AccordionItem } from 'carbon-components-react';
import React from 'react';


const SortRankInfo = () => {

    // const navigate = useNavigate();
    return (
        <React.Fragment>
            <div className='flex flex-col gap-4 w-full -mx-2'>
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
            </div>
        </React.Fragment>
    );
};

export default SortRankInfo;