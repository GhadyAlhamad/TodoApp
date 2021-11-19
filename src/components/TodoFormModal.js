//rfce
import React, { useState, useRef, useEffect  } from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button, IconButton, Stack } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

// modal style
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function TodoFormModal({todos, open, editTodo, onSubmit, handleClose}) {
    // define todo id state
    const [todoId, setTodoId] = useState(editTodo ? editTodo.id : null)
    // define title state
    const [title, setTitle] = useState(editTodo ? editTodo.title : "")
    
    // define description state
    const [description, setDescription] = useState(editTodo ? editTodo.description : "")
    // define handle description change 
    const handleDescriptionChange = e => {
        // set description value
        setDescription(e.target.value)
    }
     
    // define error state
    const [titleInvalid, setTitleInvalid] = useState( editTodo ? false : true)
    // define error message state
    const [errorTitleMessage, setErrorTitleMessage] = useState("Title field is required")

    // define input title todo state
    const inputTitleRef = useRef(null)
    // use reference
    useRef(() => {
        inputTitleRef.current.focus()
     })
 
    // use effect to update state when edit todo
    useEffect(() => { 
        if(editTodo && editTodo.id !== todoId){
         // set todo id value
         setTodoId(editTodo.id)
         // set title value
        setTitle(editTodo.title)
        // set description value
        setDescription(editTodo.description)
        // set valid title
        setTitleInvalid(false)
    }}, [todoId, title, description, titleInvalid, editTodo])
    
    // define handle title change 
    const handleTitleChange = e => {  
        if (/^\s*$/.test(e.target.value)) {
            // set required error message
            setErrorTitleMessage("Title field is required")
            // set title invalid status
            setTitleInvalid(true)
        }
        else if([...todos].some(todo => todo.title.toLowerCase() === e.target.value.toLowerCase()
        && (!editTodo || editTodo.title.toLowerCase() !== e.target.value.toLowerCase())) )
        {
            // set required error message
            setErrorTitleMessage("Title already exists!")
            // set title invalid status
            setTitleInvalid(true)
            
        } 
        else
        { 
            // set title invalid status
            setTitleInvalid(false)
        }
    
        // set title value
        setTitle(e.target.value)
    }

    // define handle submit event
    const handleSubmit = e => {  
        // call prevent default submit
        e.preventDefault()
  
        if (titleInvalid) { 
            // return to avoid submit data
            return
        }
    
        // on submit
        onSubmit({
            id:  editTodo ? todoId : Math.floor(Math.random() * 10000),
            title: title,
            description: description,
            createdAt: editTodo ? editTodo.createdAt : Date(),
            finishedAt: editTodo ? editTodo.finishedAt : null,
            archivedAt: editTodo ? editTodo.archivedAt : null 
        })
         
        // clear form
        setTitle('')
        setDescription('')

        // close modal
        handleClose()
    }
     
    if (editTodo)
    { 
      return (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title-edit"
                aria-describedby="modal-modal-description-edit"
                action>
                <Box sx={style}>
                    <Typography id="modal-modal-title-edit" variant="h6" component="h2">
                       <div className="todo-modal-label"> 
                           Update To-do list   
                           <IconButton onClick={handleClose} component="span"> 
                               <HighlightOffIcon />
                           </IconButton>    
                        </div>
                    </Typography>    
                    <Typography id="modal-modal-description-edit" component={'span'} variant={'body2'} sx={{ mt: 2 }}>
                        <Stack spacing={2}>
                            <div className="todo-form-row">
                                <div className="todo-label">Title</div>
                                <TextField
                                    name="title"
                                    size="small"
                                    value={  title }
                                    error={titleInvalid}
                                    helperText={titleInvalid ? errorTitleMessage : ""}
                                    className="todo-input edit"
                                    placeholder="Update to-do title"
                                    onChange={handleTitleChange}
                                    ref={inputTitleRef} />
                            </div>
                            <div className="todo-form-row">
                                <div className="todo-label">Description</div>
                                <TextField
                                    size="small"
                                    name="description"
                                    value={ description } 
                                    multiline
                                    rows={4}
                                    placeholder="Update to-do description"
                                    className="todo-input edit"
                                    onChange={handleDescriptionChange}
                                />
                            </div>
                        </Stack> <br/> 
                        <Button variant="contained" onClick={handleSubmit}>Update</Button>
                    </Typography>
                </Box>
            </Modal>
        )
    } else // new
        return (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title-add"
                aria-describedby="modal-modal-description-add">
                <Box sx={style}>
                    <Typography id="modal-modal-title-add" variant="h6" component="h2">
                       <div className="todo-modal-label"> 
                           Add To-do list
                           <IconButton onClick={handleClose} component="span"> 
                               <HighlightOffIcon />
                           </IconButton>    
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description-add" component={'span'} variant={'body2'} sx={{ mt: 2 }}>
                        <Stack spacing={2}>
                            <div className="todo-form-row">
                                <div className="todo-label">Title</div>
                                <TextField  id="outlined-error" error
                                    name="title"
                                    size="small"
                                    value={title}
                                    error={titleInvalid}
                                    helperText={titleInvalid ? errorTitleMessage : ""}
                                    className="todo-input"
                                    placeholder="Enter to-do title"
                                    onChange={handleTitleChange} />
                            </div>
                            <div className="todo-form-row">
                                <div className="todo-label">Description</div>
                                <TextField
                                    size="small"
                                    name="description"
                                    multiline
                                    rows={4}
                                    placeholder="Enter to-do description"
                                    className="todo-input"
                                    onChange={handleDescriptionChange}
                                    value={description}
                                />
                            </div>
                        </Stack> <br/>
                        <Button variant="contained"
                            onClick={handleSubmit}>Add</Button>
                    </Typography>
                </Box>
            </Modal>
        )
}

export default TodoFormModal
