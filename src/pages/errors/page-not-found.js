import React, { useEffect } from 'react'

function PageNotFound() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []); 

  return (
    <div className='flex items-center flex-col px-5 md:px-0 '>
      Page not found
    </div>
  )
}

export default PageNotFound;