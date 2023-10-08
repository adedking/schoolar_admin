import React, { useEffect } from 'react';
import MenuSVG from '../assets/svg/menu.svg';
import CloseSVG from '../assets/svg/close.svg';
import { useDispatch } from 'react-redux';
import { IsTogglingSidebar } from '../redux/components/components-slice';
import classNames from 'classnames';

const NavBar = ({profile=false, isSidebarOpen}) => {

  const dispatch = useDispatch();
  const handleSidebarToggle = () => {
    dispatch(IsTogglingSidebar());
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600 && isSidebarOpen === true ) {
        handleSidebarToggle()
      } else if (window.innerWidth > 600 && isSidebarOpen === false) {
        handleSidebarToggle()
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSidebarOpen])
    return (
      <div className='flex justify-between min-h-[48px] max-h-[48px] min-w-full max-w-full items-center px-3 !border-b border-gray-400'>
          <div className='flex flex-row items-center pl-4 md:pl-0'>
            {window.innerWidth < 600?
            <React.Fragment>
              <button onClick={() => handleSidebarToggle()}>
                <img src={CloseSVG} alt='menu' 
                className={classNames('mr-3', {
                  'flex': isSidebarOpen,
                  'hidden': !isSidebarOpen
                })}
                  />
              </button>
              <button onClick={() => handleSidebarToggle()}>
                <img src={MenuSVG} alt='menu' className={classNames('mr-3', {
                  'flex': !isSidebarOpen,
                  'hidden': isSidebarOpen
                })} />
              </button>
            </React.Fragment>
            :
            null
            }
            <div className='font-bold text-[16px]'>Schoolar</div>
          </div>
          {profile?
              <div></div>
          :
              null
          }
          
      </div>
    );
};

export default NavBar;