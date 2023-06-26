import React from 'react';
const WidgetCard = ({cardData}) => {

    // const navigate = useNavigate();
    console.log(cardData)
    return (
        <React.Fragment>
            <div className={`grid md:grid-cols-2 grid-cols-1 gap-2 w-full min-h-[86px] bg-login-background rounded-md p-2`}>
                {cardData && cardData.items.map((item, i) => (
                    <div className=' flex flex-col justify-center p-3 gap-1 min-h-[75px]'>
                        <div className='!text-[13px] text-color-[#525252]'>{item.title}</div>
                        <div className=''>{item.value}</div>
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
};

export default WidgetCard;