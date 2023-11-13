import { ADD_TODO, DELETE_ALL, DELETE_TODO, EDIT_TODO, INITIALIZE_DATA, INPUT_CHECK } from "../constant/todoConstant"


export const addTodo = (payload) => {
    return {
        type : ADD_TODO,
        payload 
    }
}

export const deleteAll = () => {
    return{
        type : DELETE_ALL,
    }
}

export const deleteTodo = (payload) => {
    return{
        type : DELETE_TODO,
        payload
    }
}



export const heandleEdit = (payload) => {
    return{
        type : EDIT_TODO,
        payload : payload
    }
}

export const heandleCheck = (payload) => {
    return{
        type : INPUT_CHECK,
        payload : payload
    }
}

export const initializeData = (data) => {
    return {
      type: INITIALIZE_DATA,
      payload: data,
    };
  };