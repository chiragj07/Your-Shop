import React from 'react'
import './inp.css'
const InputField = (props) => {
    const {name,value,handleChange,type,error}= props;
    return (
        <div className='input-div'>
            <label htmlFor={name}>{name.toUpperCase()}</label>
            <input type={type} placeholder={name} name={name} value={value} id={name} onChange={handleChange}/>
            <p className='error'>{error}</p>
        </div>
    )
}

export default InputField
