import React, { useEffect, useState } from 'react';
import './ListPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAll, deleteTodo, getLocalStorage, heandleCheck, heandleEdit } from '../Redux/action/TodoAction';

export default function ListPage() {
    const [showInput, setShowInput] = useState(false);
    const [editTodo, setEditTodo] = useState(null);
    const [editTodoValue, setEditTodoValue] = useState('');
    const todo = useSelector((state) => state.TodoReducer);
    const [newFilterData, setNewFilterData] = useState('All')

    const dispatch = useDispatch();

    const onEdit = (item) => {
        setShowInput(true);
        setEditTodo(item);
        setEditTodoValue(item.todo); 
    };

    const handleEditTodo = () => {
        if(editTodoValue.trim() !== '') {
            if (editTodo) {
                const editObject = {
                    id: editTodo.id,
                    todo: editTodoValue,
                    complete: false
                };
                dispatch(heandleEdit(editObject));
                setShowInput(false); 
            }
        }
        else{
            alert("Please Enter a value")
        }
       
    };

    useEffect(() => {
        setEditTodoValue(editTodo ? editTodo.todo : ''); 
    }, [editTodo]);


    useEffect(() => {
      if (todo.length > 0) {
        localStorage.setItem("todoKey", JSON.stringify(todo));
      }
    }, [todo]);
   

    useEffect(() => {
      // const storageTodo = JSON.parse(localStorage.getItem("todoKey"));
      // dispatch(getLocalStorage(storageTodo));
    }, []);


    return (
        <>
            <div className="container ">
                <div className="row">
                    <div className="col">
                        <table className='mb-5'>
                            <tbody>
                                <tr>
                                    <th>
                                        <input
                                            type="radio"
                                            id="option1"
                                            name="radio-group"
                                            onClick={() => setNewFilterData("All")}
                                            defaultChecked />
                                        All
                                    </th>
                                    <th>
                                        <input
                                            type="radio"
                                            id="option2"
                                            name="radio-group"
                                            onClick={() => setNewFilterData("complete")}
                                        />
                                        Completed
                                    </th>
                                    <th>
                                        <input
                                            type="radio"
                                            id="option3"
                                            name="radio-group"
                                            onClick={() => setNewFilterData("incomplete")}
                                        />
                                        Incompleted
                                    </th>
                                </tr>
                            </tbody>
                        </table>

                        <div className="all-list-parent-data" >
                            {
                                todo.map((item) => (
                                    <div className="parent-data" key={item.id}>
                                        <div className="check-input-parent" >
                                            <input
                                                className="form-check-input"
                                                checked={item.checked}
                                                onClick={()=> dispatch(heandleCheck(item))}                                                type="checkbox"
                                                id={"flexCheckDefault"}
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
                        {
                            todo.length > 0 &&
                            <div className='btn btn-warning mt-3' onClick={() => dispatch(deleteAll())}>Delete All</div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
