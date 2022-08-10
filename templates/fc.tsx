import React from 'react';
#STYLE#
type #NAME#Props = {
  className?: string
};

export const #NAME#: React.FC<#NAME#Props> = ({className=""}) => {
    return <div className={`${className}`} > 
      <h1>#NAME#</h1>
       </div> ;
};
