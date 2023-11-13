import { ADD_TODO, DELETE_ALL, DELETE_TODO, EDIT_TODO, INPUT_CHECK } from "../action/TodoAction";

const initialState = [];

export const TodoReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_TODO:
            return [...state, action.payload];

        case DELETE_ALL:
            return [];

        case DELETE_TODO:
            const filteredTodos = state.filter((todo) => todo.id !== action.payload);
            return filteredTodos;

        case EDIT_TODO:
            const updatedArray = state.map((item) => {
                if (item.id === action.payload.id) {
                    return {
                        ...item,
                        todo: action.payload.todo,
                        completed: action.payload.complete,
                    };
                }
                return item;
            });
            return updatedArray;

        case INPUT_CHECK:
            const updatedCheckbox = []
            state.map((item) => {
                if (item.id == action.payload.id) {
                    item.complete = !item.complete
                }
                updatedCheckbox.push(item)
            })
            return updatedCheckbox;
        
            case 'INITIALIZE_DATA':
                return action.payload;

        default:
            return state;
   
        }
};
