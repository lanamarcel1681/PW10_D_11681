import React from "react";

import "./Card.css";
const CardBackground = ({ children }) =>{
    return (
        <div className="card cardBackground">
            {children}
        </div>
    );
};

export default CardBackground;
