// import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export type TypeToDos = {
  _id: string;
  name: string;
  completed: boolean;
  date: string;
};

const ToDoList = () => {
  const [todos, setToDos]: any = useState<TypeToDos[]>([]);
  //   const [currentStatus, setCurrentStatus] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/tasks")
      .then((response: any) => {
        console.log(response.data);
        setToDos(response.data.data);

        let check1 = Object.keys(response.data);
        console.log(`check1 : ${check1}`);
        let check2 = Object.values(response.data.data);
        console.log(`check2 : ${check2}`);
        let check3 = Object.values(check2);
        console.log(
          `check3 : ${check3.map((each: any) => Object.values(each))}`
        );
        // let check4 = Object.values(check3);
        // console.log(`check4 : ${check4}`);

        // setCurrentStatus(response.data);
        console.log(`todos: ${Object.values(todos)}`);
        // console.log(`currentStatus: ${Object.values(currentStatus)}`);
      })
      .catch((err) => console.log(err));
  }, [setToDos]);

  return (
    <div
      className="flex flex-col items-center h-200px justify-between h-200px"
      style={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "800px",
      }}
    >
      <div
        id="list"
        className="h-[300px]"
        style={{
          height: "500px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {todos.map((todo: TypeToDos) => (
          <Task
            key={todo._id}
            keyID={todo._id}
            name={todo.name}
            status={todo.completed}
            date={todo.date}
          />
        ))}
      </div>
    </div>
  );
};

export default ToDoList;

interface ITask {
  keyID: string;
  name: string;
  status: boolean;
  date: string;
}

const Task: React.FC<ITask> = ({ keyID, name, status, date }) => {
  const [isHoveredEdit, setIsHoveredEdit] = useState(false);
  const [isHoveredDelete, setIsHoveredDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [afterEditing, setAfterEditing] = useState("");
  const [isDone, setIsDone] = useState(status);
  const [doneStatus, setDoneStatus] = useState("Undone");

  useEffect(() => {
    console.log(isHoveredDelete);
  }, [isHoveredDelete]);

  return (
    <div
      className="flex flex-col border border-cyan-100"
      style={{ flexDirection: "column", border: "1px solid #000" }}
      key={keyID}
    >
      {isEditing ? (
        <div>
          <input
            type="text"
            name="newTaskName"
            onChange={(e) => setAfterEditing(e.target.value)}
          />
        </div>
      ) : (
        <div>{name}</div>
      )}
      <div>{date}</div>
      <div>
        <span className="flex flex-row">
          <strong
            onMouseEnter={() => {
              if (doneStatus === "Undone") {
                setDoneStatus("Done");
              } else {
                setDoneStatus("Undone");
              }
            }}
            onMouseLeave={() => {
              if (doneStatus === "Done") {
                setDoneStatus("Undone");
              } else {
                setDoneStatus("Done");
              }
            }}
            onClick={async () => {
              setIsDone(!isDone);
              // doneStatus === "Undone"
              //   ? setDoneStatus("Done")
              //   : setDoneStatus("Undone");
              if (doneStatus === "Undone") {
                setDoneStatus("Done");
                await axios.put(
                  `http://localhost:5000/api/v1/tasks/status_change/${keyID}`,
                  {
                    newStatus: true,
                  }
                );
              } else {
                setDoneStatus("Undone");
                await axios.put(
                  `http://localhost:5000/api/v1/tasks/status_change/${keyID}`,
                  {
                    newStatus: false,
                  }
                );
              }
            }}
          >
            {doneStatus}:{" "}
          </strong>
          {isDone ? (
            <svg
              style={{ color: "green" }}
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="27"
              fill="currentColor"
              className="bi bi-check2-circle text-green-500"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
              <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
            </svg>
          ) : (
            <svg
              style={{ color: "crimson" }}
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="27"
              fill="currentColor"
              className="bi bi-x text-rose-500"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          )}
        </span>
      </div>
      <div
        id="adjust"
        className="border border-black"
        style={{ border: "1px solid #000" }}
      >
        <div className="flex flex-row justify-center">
          <div
            className="flex flex-row justify-between"
            style={{ width: "150px", justifyContent: "space-between" }}
          >
            {isEditing ? (
              <div
                id="change"
                className="flex justify-center hover:bg-slate-600"
                style={{
                  border: "1px solid #000",
                  // width: "47.63px",
                  textAlign: "center",
                  display: "flex",
                  width: "75px",
                  gap: "0.2rem",
                  backgroundColor: isHoveredEdit ? "#98B4D4" : "#fff",
                  color: isHoveredEdit ? "#fff" : "#000",
                }}
                onClick={async () => {
                  try {
                    console.log("Clicked on change");
                    setIsEditing(false);
                    console.log(`afterEditing : ${afterEditing}`);
                    console.log(`name : ${keyID}`);
                    await axios
                      .put(`http://localhost:5000/api/v1/tasks/${keyID}`, {
                        updatedTaskName: afterEditing,
                      })
                      .then((response) => {
                        console.log(`Changed successfully !`);
                        console.log(response.data);
                        setAfterEditing("");
                      })
                      .catch((err) => console.log(err));
                  } catch (err) {
                    console.log(err);
                  }
                }}
                onMouseEnter={() => setIsHoveredEdit(true)}
                onMouseLeave={() => setIsHoveredEdit(false)}
              >
                Change
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="23"
                  fill="currentColor"
                  className="bi bi-database-up"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.354-5.854 1.5 1.5a.5.5 0 0 1-.708.708L13 11.707V14.5a.5.5 0 0 1-1 0v-2.793l-.646.647a.5.5 0 0 1-.708-.708l1.5-1.5a.5.5 0 0 1 .708 0Z" />
                  <path d="M12.096 6.223A4.92 4.92 0 0 0 13 5.698V7c0 .289-.213.654-.753 1.007a4.493 4.493 0 0 1 1.753.25V4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.525 4.525 0 0 1-.813-.927C8.5 14.992 8.252 15 8 15c-1.464 0-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13h.027a4.552 4.552 0 0 1 0-1H8c-1.464 0-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10c.262 0 .52-.008.774-.024a4.525 4.525 0 0 1 1.102-1.132C9.298 8.944 8.666 9 8 9c-1.464 0-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777ZM3 4c0-.374.356-.875 1.318-1.313C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4Z" />
                </svg>
              </div>
            ) : (
              <div
                id="edit"
                className="flex justify-center hover:bg-slate-600"
                style={{
                  border: "1px solid #000",
                  // width: "47.63px",
                  textAlign: "center",
                  display: "flex",
                  width: "69px",
                  gap: "0.2rem",
                  backgroundColor: isHoveredEdit ? "#98B4D4" : "#fff",
                  color: isHoveredEdit ? "#fff" : "#000",
                }}
                onClick={() => {
                  console.log("Clicked on edit");
                  setIsEditing(true);
                }}
                onMouseEnter={() => setIsHoveredEdit(true)}
                onMouseLeave={() => setIsHoveredEdit(false)}
              >
                Edit
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="23"
                  fill="currentColor"
                  className="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
              </div>
            )}
            <div
              id="delete"
              className="flex justify-center"
              style={{
                border: "1px solid #000",
                display: "flex",
                textAlign: "center",
                width: "69px",
                gap: "0.2rem",
                backgroundColor: isHoveredDelete ? "crimson" : "white",
                color: isHoveredDelete ? "#fff" : "#000",
              }}
              onMouseEnter={() => {
                console.log("onMouseDown");
                setIsHoveredDelete(true);
              }}
              onMouseLeave={() => setIsHoveredDelete(false)}
              onClick={async () => {
                console.log(
                  `Clicked on delete the task with the name : ${name} - id : ${keyID}`
                );
                try {
                  await axios
                    .delete(`http://localhost:5000/api/v1/tasks/${keyID}`)
                    .then((response) => {
                      console.log(`Deleted task with ID : ${keyID}`);
                      console.log(response);
                    })
                    .catch((err) => console.log(err));
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              Delete
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="23"
                fill="currentColor"
                className="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
