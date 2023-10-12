import React from 'react';
import { HeaderPanel} from 'carbon-components-react';
import classNames from 'classnames';
import { Close } from '@carbon/icons-react';
import { useDispatch } from 'react-redux';
import { IsTogglingRightPanel } from '../redux/components/components-slice';

const RightView = ({isRightPanelOpen, children, viewTitle}) => {

    const dispatch = useDispatch();

    const handleRightPanelToggle = () => {
        dispatch(IsTogglingRightPanel());
    };
    return (
        <React.Fragment>
            <HeaderPanel
                expanded={isRightPanelOpen} 
                className={classNames('',{'md:min-w-[451px] min-w-full -mt-[48px] backdrop-blur-sm bg-black' : isRightPanelOpen})}
            >
                <div className='h-[48px] flex justify-between items-center px-4'>
                    <div className=' text-lg'>{viewTitle}</div>
                    <Close 
                        width={25} 
                        height={25} 
                        onClick={() => {
                            handleRightPanelToggle()
                        }}
                        className='cursor-pointer'
                    />
                </div>
                <div className='px-4'>
                    {children}
                </div>
                
            </HeaderPanel>
        </React.Fragment>
    );
};

export default RightView;
