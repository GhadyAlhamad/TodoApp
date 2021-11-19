import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import IconButton from '@mui/material/IconButton';
import PreviewIcon from '@mui/icons-material/Preview';

function TodoList({ todos, setEditTodo, handleOpenEdit,
    setTodoDetails, handleOpenViewTodo,
                    handleUpdateTodo, handleDeleteTodo, filterBy }) {

    // define complete event
    const handleComplete = (e, todo) => {
        if (e.target.checked)
            todo.finishedAt = Date()
        else
            todo.finishedAt = null

        // call handle update todo
        handleUpdateTodo(todo) 
    }

    // define edit event
    const handleEdit = (todo) => {
        // reset edit
        setEditTodo({
            id: todo.id,
            title: todo.title,
            description: todo.description,
            createdAt: todo.createdAt,
            finishedAt: todo.finishedAt,
            archivedAt: todo.archivedAt
        })

        // call set open
        handleOpenEdit()
    }

    // define archived event
    const handleArchive = (archiveState, todo) => {
        if (archiveState)
            todo.archivedAt = Date()
        else
            todo.archivedAt = null

        // call handle update todo
        handleUpdateTodo(todo)

    }

    // define delete event
    const handleDelete = (todoId) => {
        // call handle delete todo
        handleDeleteTodo(todoId)
    }

    // define view event
    const viewTodo = (todo) => {
        // set todo to view
        setTodoDetails({ 
            id: todo.id,
            title:  todo.title,
            description:  todo.description,
            createdAt: todo.createdAt,
            finishedAt:  todo.finishedAt,
            archivedAt:  todo.archivedAt  }) 
       
        // call handle view todo
        handleOpenViewTodo() 
    }
   
   
    if (filterBy === 1)
        return (todos.map((todo, index) => (todo.archivedAt == null ?
             <div className="todo-row todo-row-color" 
               key={todo.id}>
         <div className="todo-row-title">
                    <Checkbox className={todo.finishedAt ? "todo-row-checkbox checked" : "todo-row-checkbox"} 
                        size="small"
                        checked={todo.finishedAt != null}
                        onChange={(event) => handleComplete(event, todo)} />
                    <span className={todo.finishedAt ? "todo-row-titlelabel checked" : "todo-row-titlelabel"}>
                        {todo.title}
                    </span>
                </div>
                <div className="icons">
                    <IconButton onClick={() => viewTodo(todo)} component="span">
                        <PreviewIcon className={todo.finishedAt ? "edit-icon checked" : "edit-icon"}  />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(todo)} component="span">
                        <EditIcon className={todo.finishedAt ? "edit-icon checked" : "edit-icon"}  />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(todo.id)} component="span">
                        <DeleteIcon
                            className={todo.finishedAt ? "delete-icon checked" : "delete-icon"} />
                    </IconButton>
                    <IconButton onClick={() => handleArchive(true, todo)} component="span">
                        <ArchiveIcon className={todo.finishedAt ? "archive-icon checked" : "archive-icon"}  />
                    </IconButton>
                </div>
            </div>
            : <span />
        )))
    else
        return (todos.map((todo, index) => (todo.archivedAt != null ?
            <div 
                className="todo-row todo-row-color-archived" 
                key={todo.id}>
                <div className="todo-row-title archived">
                    <Checkbox className={todo.finishedAt ? "todo-row-checkbox checked archived" : "todo-row-checkbox"} 
                        size="small"
                        disabled
                        checked={todo.finishedAt != null}
                        onChange={(event) => handleComplete(event, todo)} />
                    <span className={todo.finishedAt ? "todo-row-titlelabel checked archived" : "todo-row-titlelabel"}>
                        {todo.title}
                    </span>
                </div>
                <div className="icons">
                    <IconButton onClick={() => viewTodo(todo)} component="span">
                        <PreviewIcon className={todo.finishedAt ? "edit-icon checked archived" : "edit-icon"}  />
                    </IconButton>
                    <IconButton onClick={() => handleArchive(false, todo)} component="span">
                        <UnarchiveIcon className={todo.finishedAt ? "archive-icon checked archived" : "archive-icon"} />
                    </IconButton>
                </div>
            </div>
            : <span /> 
        ))) 
}

export default TodoList
