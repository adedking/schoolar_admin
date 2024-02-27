import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useState } from 'react';
import ChevronSVG from '../assets/svg/collapsing-icon-white.svg';

function CollapsingIconWhite({ isOpen = false, defaultPosition = 'down', dashboard = false }) {
  const [computedClass, setComputedClass] = useState('');

  useEffect(() => {
    function computePosition() {
      let sortClass = classNames(
        '',
        { 'rotate-90 duration-300': defaultPosition === 'left' && !isOpen },
        { 'rotate-180 duration-300': defaultPosition === 'left' && isOpen },
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

export default CollapsingIconWhite;
