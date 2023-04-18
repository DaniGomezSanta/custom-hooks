import React, { useEffect, useReducer } from 'react'
import { todoReducer } from './todoReducer';

const init = () => {
    return JSON.parse( localStorage.getItem('todos')) || []; 
}


export const useTodo = () => {
    
    const initialState = [];

    const [ todos , dispatch ] = useReducer( todoReducer, initialState, init );

    useEffect(()=> {
        localStorage.setItem('todos', JSON.stringify( todos ))
       },[todos])
    

    const handleNewTodo = ( todo ) => {
        const action = {
            type: 'Add Todo',
            payload: todo
        }
        dispatch( action ); 
       }
    
       const handleDeletTodo = ( id ) => {
        
        dispatch({
            type: 'Remove Todo',
            payload: id
        })
       }
    
       const handleToggleTodo = ( id ) => {
    
        dispatch({
            type: 'Toggle Todo',
            payload: id
        })
       }
       
       return {
           todos, 

           todosCount: todos.length,
           pendingTodosCount: todos.filter(todo => !todo.done).length,
           handleDeletTodo,
           handleToggleTodo,
           handleNewTodo,
       }
}

