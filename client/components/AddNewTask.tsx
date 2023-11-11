import { useState } from "react";
import axios from "axios";
// import CustomError from "./CustomError";

const AddNewTask = () => {
  const [userInput, setUserInput] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  return (
    <div id="add_section_bar" className="flex justify-center items-center">
      <div className="flex w-200px flex-row justify-between">
        <div>
          <input
            type="text"
            id="user_input"
            className="border border-black"
            placeholder="Type a new task"
            name="adding"
            style={{ height: "2rem" }}
            onChange={(e) => {
              setUserInput(e.target.value);
              if (isAdded) {
                e.target.value = "";
              }
              setIsAdded(false);
            }}
          />
        </div>

        <div className="ml-[1rem]" style={{ marginLeft: "0.2rem" }}>
          <button
            className="border border-blue-400"
            style={{
              border: "1px solid #000",
              padding: "0.1rem",
              marginRight: "-10rem",
            }}
            onClick={async () => {
              console.log(`userInput : ${userInput}`);
              setUserInput("");
              setIsAdded(true);

              try {
                const { newTask }: any = axios.post(
                  "http://localhost:5000/api/v1/tasks",
                  { name: userInput }
                );
                console.log(`newTask: ${newTask}`);
              } catch (err: any) {
                console.log(err.message);
              }
            }}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewTask;
