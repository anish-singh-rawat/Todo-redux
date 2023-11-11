import React, { useState } from 'react'
import './inputPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo } from '../Redux/action/TodoAction'
import { v4 as uuidv4, v4 } from 'uuid';

export default function InputPage() {
    const [todoValue, setTodoValue] = useState('')
    const dispatch = useDispatch()
    const handleInputChange = (e)=>{
        setTodoValue(e.target.value)
    }

    const heandleAdd = () => {
        if (todoValue.trim() === '') {
            alert('Please enter a value before adding')
            return;
        }
        const todoObj = {
            id : v4(),
            todo : todoValue,
            complete : false
        }
        dispatch(addTodo(todoObj))
        setTodoValue('')
    }
    
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col">
                        <div className="top-heading">Todo APP</div>
                        <div className="input-btn-parent">
                            <input type="text"
                                placeholder="Enter your Data"
                                className="input-feild"  
                                value={todoValue}
                                onChange={handleInputChange} />
                            <i className="fa-solid fa-calendar-plus" onClick={heandleAdd}></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
