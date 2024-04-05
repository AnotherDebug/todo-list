import React from "react";

const Button = ({children, type, onClick}) => {
    // Variabile che imposta di default il valore di type;
    const btnClass = `btn ${type || 'btn-primary'}`;
  return (
    // In alternativa posso inserire direttamente {type} se non voglio un valore di default;
    <button 
    className={btnClass}
    onClick = {onClick}>
    {children}
  </button>
  );
};

export default Button;