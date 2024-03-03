import { Loading } from 'carbon-components-react';
import React from 'react';
const WidgetCard = ({cardData, loading=false}) => {
    return (
        <React.Fragment>
            {loading?
            <div className='flex flex-row p-8 px-16 h-[86px] min-w-full bg-background gap-4 justify-between items-center'>
                <Loading active={loading} className={''} withOverlay={false} small={true} />
                <Loading active={loading} className={''} withOverlay={false} small={true} />
                <Loading active={loading} className={''} withOverlay={false} small={true} />
            </div>
            :
            <div className={`grid md:grid-cols-3 grid-cols-1 gap-2 w-full md:min-h-[86px] bg-background rounded-md p-2`}>
                {cardData && cardData.items.map((item, i) => (
                    <div key={i} className=' flex flex-col justify-center p-3 gap-1 min-h-[75px]'>
                        <div className='!text-[13px] text-color-[#525252]'>{item.title}</div>
                        <div className='font-semibold'>{item.value}</div>
                    </div>
                ))}
            </div>
}
        </React.Fragment>
    );
};

export default WidgetCard;