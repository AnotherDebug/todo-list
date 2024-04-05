import React from "react";
import Button from "./Button";

const UnList = ({ tasks, onDelete }) => {
  return (
    <>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.text} 
            <Button type="btn-danger" >
            <i className="fa-solid fa-pen"></i>
            </Button>
            <Button type="btn-danger" onClick={() => onDelete(task.id)}>
            <i className="fa-solid fa-trash-can"></i>
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default UnList;
