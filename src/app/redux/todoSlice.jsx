import {createSlice, nanoid} from "@reduxjs/toolkit"
const initialState = {
    todo: [],
}

const sliceTodo = createSlice({
    name: "todoList",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const data = {
                id: nanoid,
                name: action.name,
            }
        }
    }
})

export const {addTodo} = sliceTodo.actions;
export default sliceTodo.reducer;