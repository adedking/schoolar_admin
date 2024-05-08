import React from 'react';
import { Loading } from 'carbon-components-react';

const SubLoader = () => {
    return (
        <div className='flex flex-col min-h-[500px] w-full justify-center items-center gap-8 bg-background'>
            <Loading className={''} withOverlay={false} small={true} />
        </div>
    )
};

export default SubLoader;