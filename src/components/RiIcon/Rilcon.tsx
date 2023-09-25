import React from "react";

type RiIconProps = {
    name: string;
    className?: string; 
    onclick?: () => void; 
  };
  const RiIcon: React.FC<RiIconProps> = ({ name, className = "", onclick }) => {
    if (className === undefined) className= "";
    return (
        <i className={className + " ri-" + name} onClick={onclick && onclick} />
    );
};

export default RiIcon;
