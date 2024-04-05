import React from 'react';

const TextInput = ({value, onChange, placeholder}) => {
    return (
        <input
        type='text'
        className = 'form-control w-50 me-3'
        value = {value}
        onChange = {onChange}
        placeholder = {placeholder}></input>
    );
};

export default TextInput;