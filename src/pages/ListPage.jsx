import React, { useEffect, useState } from 'react';
import './ListPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAll, deleteTodo, heandleCheck, heandleEdit } from '../Redux/action/TodoAction';


const getLocalItems = () => {
    let list = localStorage.getItem('list');
    if (list) {
        return JSON.parse(localStorage.getItem('list'));
    } else {
        return [];
    }
};

export default function ListPage() {
    const [showInput, setShowInput] = useState(false);
    const [editTodo, setEditTodo] = useState(null);
    const [editTodoValue, setEditTodoValue] = useState('');
    const todo = useSelector((state) => state.TodoReducer);
    const [filterType, setFilterType] = useState('All');

    const dispatch = useDispatch();

    const onEdit = (item) => {
        setShowInput(true);
        setEditTodo(item);
        setEditTodoValue(item.todo);
    };

    const handleEditTodo = () => {
        if (editTodoValue.trim() !== '') {
            if (editTodo) {
                const editObject = {
                    id: editTodo.id,
                    todo: editTodoValue,
                    complete: false,
                };
                dispatch(heandleEdit(editObject));
                setShowInput(false);
            }
        } else {
            alert('Please Enter a value');
        }
    };

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(todo));
    }, [todo]);

    useEffect(() => {
        setEditTodoValue(editTodo ? editTodo.todo : '');
    }, [editTodo]);

    const handleFilterChange = (filter) => {
        setFilterType(filter);
    };

    const filteredData = () => {
        switch (filterType) {
            case 'complete':
                return todo.filter((item) => item.complete === true);
            case 'incomplete':
                return todo.filter((item) => item.complete === false);
            default:
                return todo;
        }
    };

    return (
        <>
            <div className="container ">
                <div className="row">
                    <div className="col">
                        
                        <div className="top-btn d-flex justify-content-around">
                            <div className='d-flex'>
                                <input
                                    type="radio"
                                    id="option1"
                                    defaultChecked
                                    onClick={() => handleFilterChange('All')}
                                    name="radio-group"
                                />
                                <div className='mt-2'>
                                    ALL
                                </div>
                            </div>

                            <div className='d-flex'>
                                <input
                                    type="radio"
                                    id="option2"
                                    onClick={() => handleFilterChange('complete')}
                                    name="radio-group"
                                />
                                <div className='mt-2'>
                                    Complete
                                </div>
                            </div>

                            <div className='d-flex'>
                                <input
                                    type="radio"
                                    id="option3"
                                    onClick={() => handleFilterChange('incomplete')}
                                    name="radio-group"
                                />
                                <div className='mt-2'>
                                    Incomplete
                                </div>
                            </div>
                        </div>

                        <div className="all-list-parent-data" >
                            {
                                filteredData().map((item) => (
                                    <div className="parent-data" key={item.id}>
                                        <div className="check-input-parent" >
                                            <input
                                                className="form-check-input"
                                                checked={item.checked}
                                                onClick={() => dispatch(heandleCheck(item))} type="checkbox"
                                                id={"flexCheckDefault" + item.id}
                                            />
                                            {showInput && (
                                                <div>
                                                    {item.id === editTodo?.id ? (
                                                        <textarea
                                                            type="text"
                                                            placeholder="please enter data"
                                                            className="mx-2 p-2"
                                                            value={editTodoValue}
                                                            onChange={(e) => setEditTodoValue(e.target.value)}
                                                            onBlur={handleEditTodo}
                                                        />
                                                    ) : (
                                                        <div className='test'>{item.todo}</div>
                                                    )}
                                                </div>
                                            )}
                                            {!showInput && (
                                                <div className="list-data">
                                                    <div>{item.todo}</div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="icons-parent">
                                            {showInput && item.id === editTodo?.id &&
                                                <i className="fa-solid fa-circle-check" onClick={() => setShowInput(false)}>
                                                </i>}
                                            <i className="fa-regular fa-pen-to-square" onClick={() => onEdit(item)}></i>
                                            <i className="fa-solid fa-trash" onClick={() => dispatch(deleteTodo(item.id))}></i>
                                            {
                                                item.complete &&
                                                <p className='check-data mt-2'> checked</p>
                                            }

                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        <div>
                        {   todo.length > 0 &&
                            <div className='btn btn-warning mt-3' onClick={() => dispatch(deleteAll())}>Delete All</div>
                        }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}