import React from 'react'
import AssignmentIcon from '@mui/icons-material/Assignment';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl' 
import MenuItem from '@mui/material/MenuItem';
 
function TodoTitle(props) {

  // define select change
  const handleSelectChange = (event) => {
    // call handle filter by with filter by id
    props.handleFilterBy(event.target.value);
  };

  // return header list and filter by select
  return (
    <div className="todo-title">
      <div className="todo-title-label">
        <AssignmentIcon className="todo-list-icon" />  To-do List
      </div>
      <div className="todo-title-select-box">
        <div className="todo-title-label">
          Filter by:
        </div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120, color: "#fff" }}>
          <Select className="todo-title-select"
            id="filterbyId"
            onChange={handleSelectChange}
            value={props.filterById}>
            <MenuItem value={1}>Active</MenuItem>
            <MenuItem value={2}>Archived</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  )
}

export default TodoTitle
