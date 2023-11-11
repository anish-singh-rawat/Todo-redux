export const ADD_TODO = "ADD_TODO"
export const DELETE_ALL = "DELETE_ALL"
export const DELETE_TODO = "DELETE_TODO"
export const EDIT_TODO = "EDIT_TODO"
export const INPUT_CHECK = "INPUT_CHECK"
export const GET_LOCALE_ITEM = "GET_LOCALE_ITEM"


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

export const getLocalStorage = () => {
    const data = localStorage.getItem("todoKey");
    const todoStored = data ? JSON.parse(data) : [];
    return {
      type: GET_LOCALE_ITEM,
      payload: todoStored,
    };
  };
  