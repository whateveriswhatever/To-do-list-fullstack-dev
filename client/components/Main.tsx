// import React from "react";
import LookUp from "./LookUp";
import ToDoList from "./ToDoList";
import AddANewTask from "./AddNewTask";

const Main = () => {
  return (
    <div id="main">
      <LookUp />
      <br />
      <AddANewTask />
      <br />
      <ToDoList />
    </div>
  );
};

export default Main;
