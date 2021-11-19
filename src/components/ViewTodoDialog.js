import React from 'react'
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent'; 
import { Button, Stack } from '@mui/material'; 
import DialogActions from '@mui/material/DialogActions';

// define transition
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// view todo dialog
function ViewTodoDialog({ todo, open, handleClose }) {
    // return todo details dialog 
    return (
        <Dialog
            maxWidth="xs"
            fullWidth={true}
            open={open}
            TransitionComponent={Transition}
            onClose={handleClose}
            keepMounted
            aria-describedby="alert-dialog-slide-description">
            <DialogTitle>
                <span className="todo-dialog-label">
                    View to-do details
                </span>
            </DialogTitle>
            <DialogContent>
                    <Stack spacing={2}>
                        <div className="todo-view-row">
                            <span className="todo-view-label">Title: </span>
                            {todo.title}
                        </div>
                        <div className="todo-view-row">
                            <span className="todo-view-label">Description: </span>
                            {todo.description}
                        </div>
                        <div className="todo-view-row">
                            <span className="todo-view-label">Created At: </span>
                            { new Date(todo.createdAt).toLocaleTimeString([],{ year: 'numeric', month: 'long', day: 'numeric' })  }
                        </div>
                        <div className={todo.finishedAt != null ? "todo-view-row" : "todo-view-row hide"}>
                            <span className="todo-view-label">Finished At: </span>
                            { new Date(todo.finishedAt).toLocaleTimeString([],{ year: 'numeric', month: 'long', day: 'numeric' })  }
                         </div>
                        <div className={todo.archivedAt != null ? "todo-view-row" : "todo-view-row hide"} >
                            <span className="todo-view-label">Archived At: </span>
                            { new Date(todo.archivedAt).toLocaleTimeString([],{ year: 'numeric', month: 'long', day: 'numeric' })  }
                        </div>
                    </Stack>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ViewTodoDialog
