import React from 'react';
import './PokeballCatch.css'

import pokeball from '../assets/icons/pokeball.svg';

const PokeballCatch = () => {
  return (
    <div className="pokeball-catch">
      <div className="spinner">
        <img src={pokeball} className='pokeball jumping' alt="pokeball" />
      </div>
    </div>
  );
};

export default PokeballCatch;