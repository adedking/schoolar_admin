import React, { useEffect } from 'react'
  
function UnauthorizedPage() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []); 

  return (
    <div className='flex items-center justify-center flex-col min-h-[91vh] -mt-20 md:-mb-20 -pb-30'>
        
      Not authorised
    </div>
  )
}

export default UnauthorizedPage;