import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useState } from 'react';
import ChevronSVG from '../assets/svg/chevron-down.svg';

function CollapsingIcon({ isOpen = false, defaultPosition = 'down', dashboard = false }) {
  const [computedClass, setComputedClass] = useState('');

  useEffect(() => {
    function computePosition() {
      let sortClass = classNames(
        '',
        { 'rotate-90 ': dashboard },
        { '': defaultPosition === 'down' && !isOpen },
        { '-rotate-90 py-4': defaultPosition === 'left' && !isOpen },
        { '': defaultPosition === 'left' && isOpen },
      );

      setComputedClass(sortClass);
    }
    computePosition();
  }, [isOpen, defaultPosition]);

  return (
    <>
      <img src={ChevronSVG} alt='' srcSet='' className={computedClass} />
    </>
  );
}

export default CollapsingIcon;
