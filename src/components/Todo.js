import TodoFormModal from './TodoFormModal';
import React, { useState } from 'react'
import TodoTitle from './TodoTitle';
import TodoList from './TodoList';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material'
import Weather from './Weather';
import ViewTodoDialog from './ViewTodoDialog';
import WeatherDetails from './WeatherDetails';
import { IconButton } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness2Icon from '@mui/icons-material/Brightness2'; 

function Todo() {
    // define todos state
    const [todos, setTodos] = useState([])

    // define state for location
    const [location, setLocation] = useState({
        latitude: [],
        longitude: []
    })

    // define state for show light mode
    const [lightMode, setLightMode] = useState(false)
    // define state for show details
    const [showWeatherDetails, setShowWeatherDetails] = useState(false)

    // define filter by state
    const [filterBy, setFilterBy] = useState(1)// 1: active, 2:archived

    // define open state
    const [open, setOpen] = useState(false)
    // define handle open modal event
    const handleOpen = () => setOpen(true)

    // define handle close modal event
    const handleClose = () => setOpen(false)

    // define todos state
    const [editTodo, setEditTodo] = useState({
        id: null,
        title: "",
        description: "",
        createdAt: null,
        finishedAt: null,
        archivedAt: null
    })

    // define open edit state
    const [openEdit, setOpenEdit] = useState(false)
    // define handle open modal event
    const handleOpenEdit = () => setOpenEdit(true)
    // define handle close modal event
    const handleCloseEdit = () => setOpenEdit(false)

    // define todo details state
    const [todoDetails, setTodoDetails] = useState({
        id: null,
        title: "",
        description: "",
        createdAt: null,
        finishedAt: null,
        archivedAt: null
    })

    // define open view todo state
    const [openViewTodo, setOpenViewTodo] = useState(false)
    // define handle open dialog event
    const handleOpenViewTodo = () => setOpenViewTodo(true)
    // define handle close dialog event
    const handleCloseViewTodo = () => setOpenViewTodo(false)

    // define handle filter by
    const handleFilterBy = filterById => setFilterBy(filterById)

    // define add todo event
    const handleAddTodo = () => {
        const today = Date.now();

        console.log(new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(today));
        // call set open
        handleOpen()
    }

    // define update todo event
    const handleUpdateTodo = (todo) => {
        // update todo
        setTodos(prev => prev.map(currenttodo => {
            return (currenttodo.id === todo.id ? todo : currenttodo)
        }))
    }

    // define delete todo event
    const handleDeleteTodo = (todoId) => {
        // delete todo
        setTodos(prev => prev.filter(todo => todo.id !== todoId))
    }

    // define add todo event
    const addTodo = todo => {
        // merge todos list with new one 
        const newtodos = [todo, ...todos]
        // add new todos
        setTodos(newtodos)
        // show todos list on console
        console.log(newtodos)
    }

    // define update todo event
    const updateTodo = todo => {
        // call handle update todo
        handleUpdateTodo(todo)
        // reset edit
        setEditTodo({
            id: null,
            title: "",
            description: "",
            createdAt: null,
            finishedAt: null,
            archivedAt: null
        })
    }

    // show weather details
    if (showWeatherDetails)
        return (
            <div className={lightMode ? "todo-app light" : "todo-app"}>
                <div className="weather-header light">
                    <IconButton component="span" onClick={() => setLightMode(!lightMode)}>
                        {lightMode ?
                            <Brightness2Icon className="weather-header-icon" /> :
                            <WbSunnyIcon className="weather-header-icon" />
                        }
                    </IconButton>
                    <IconButton component="span" onClick={() => showWeatherDetails ? setShowWeatherDetails(false) : null}>
                        <HighlightOffIcon className="weather-header-icon" />
                    </IconButton>
                </div>
                <h1>Weather hourly and next 5 days</h1>
                <div align="center">
                    <Weather setShowWeatherDetails={setShowWeatherDetails}
                        showWeatherDetails={showWeatherDetails}
                        setLocation={setLocation} />
                </div>
                <br />
                <WeatherDetails lightMode={lightMode}
                    latitude={location.latitude}
                    longitude={location.longitude} />

            </div>
        )

    // return todo form
    return (
        <div className="todo-app">
            <h1>What's the plan for today?</h1>
            <div align="center">
                <Weather setShowWeatherDetails={setShowWeatherDetails}
                    showWeatherDetails={showWeatherDetails}
                    setLocation={setLocation} />
            </div>
            <br />
            <div className="todo-menu">
                <TodoTitle
                    filterById={filterBy}
                    handleFilterBy={handleFilterBy} />
                <TodoList todos={todos}
                    setEditTodo={setEditTodo}
                    handleOpenEdit={handleOpenEdit}
                    setTodoDetails={setTodoDetails}
                    handleOpenViewTodo={handleOpenViewTodo}
                    handleUpdateTodo={handleUpdateTodo}
                    handleDeleteTodo={handleDeleteTodo}
                    filterBy={filterBy} />
                <br />
                <div className={filterBy === 2 ? "hide" : ""}>
                    <Button className="todo-addnew-button"
                        variant="outlined"
                        onClick={handleAddTodo}>
                        <AddIcon className="todo-addnew-icon" />  Add new Task
                    </Button>
                </div>
                <TodoFormModal open={open}
                    todos={todos}
                    handleClose={handleClose}
                    onSubmit={addTodo} />
                <TodoFormModal open={openEdit}
                    todos={todos}
                    editTodo={editTodo}
                    handleClose={handleCloseEdit}
                    onSubmit={updateTodo} />
                <ViewTodoDialog open={openViewTodo}
                    todo={todoDetails}
                    handleClose={handleCloseViewTodo} />
            </div>
        </div>
    )

}

export default Todo
