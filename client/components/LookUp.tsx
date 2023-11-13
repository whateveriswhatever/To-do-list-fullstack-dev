// import React from "react";
import { useState, useEffect } from "react";
import { TypeToDos } from "./ToDoList";
import axios from "axios";

interface IUserLookUpInput {
  data: any;
  displayed?: boolean;
}

const LookUp = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [filteredResults, setFilteredResults] = useState<TypeToDos[] | any>();
  return (
    <div style={{ height: "130px" }}>
      <div
        id="look_up_tool"
        className="flex w-1000px flex-col justify-end"
        style={{ width: "888px", justifyContent: "end" }}
      >
        <div id="user_input">
          <input
            type="text"
            placeholder="Enter something"
            name="input_for_searching"
            onChange={(e) => {
              setUserInput(e.target.value);
              console.log(
                `userInput : ${userInput} >><< length : ${userInput.length}`
              );
              if (userInput.length > 0) {
                setIsSearching(true);
              } else if (userInput.length < 0 || userInput.length === 0) {
                setIsSearching(false);
              }
            }}
          />
        </div>
        <div className="ml-8" style={{ marginLeft: "1rem" }}>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
              onClick={async () => {
                await axios
                  .get(
                    `http://localhost:5000/api/v1/tasks/specific/${userInput}`
                  )
                  .then((response) => {
                    setFilteredResults(response.data.data);
                    console.log(
                      `filteredResults : ${Object.values(filteredResults)}`
                    );
                  })
                  .catch((err) => console.log(err));
                setIsSearching(true);
                setUserInput("");
              }}
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>
      </div>
      <br />
      <FilterResults data={filteredResults} displayed={isSearching} />
    </div>
  );
};

const FilterResults: React.FC<IUserLookUpInput> = ({ data }) => {
  // const [filteredTodos, setFilteredTodos] = useState<TypeToDos[]>();
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/api/v1/tasks/${input}`)
  //     .then((response) => {
  //       setFilteredTodos(response.data);
  //       console.log(`filteredTodos : ${filteredTodos}`);
  //     })
  //     .catch((err) => console.log(err));
  // }, [setFilteredTodos]);
  useEffect(() => {
    console.log(`data after searched : ${data}`);
  }, [data]);
  return (
    <div
      id="filter_results"
      className="flex justify-end flex-col"
      style={{ justifyContent: "end", flexDirection: "column", float: "right" }}
    >
      {data !== undefined ? (
        <div style={{ border: "1px solid #000" }}>
          <div
            style={{
              textDecoration: data?.completed ? "line-through" : "none",
            }}
          >
            {data?.name}
          </div>
          <div>{data?.date}</div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            Done:
            {data?.completed ? (
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
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default LookUp;
