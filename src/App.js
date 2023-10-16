import React, { Component, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

function App() {
const [taskItem, setTaskItem] = useState("");
const [taskListArr, setTaskListArr] = useState([
    {
        id : 1,
        value : 'テスト①',
        isDone : true
    },
    {
        id : 2,
        value : 'テスト②',
        isDone : false
    },
    {
        id : 3,
        value : 'テスト③',
        isDone : true
    },
]);

const addTodoItem = (todoValue, e) => {
    e.preventDefault();
    let val = todoValue.replace(/[^a-zA-Z0-9- ]/g, "");
    if (val.trim() !== "") {
        const newItem = {
            id: taskListArr[taskListArr.length - 1].id + 1,
            value: val,
            isDone: false,
        };
        const todoList = [...taskListArr];
        todoList.push(newItem);
        setTaskItem("");
        setTaskListArr(todoList);
    } else {
        setTaskItem("");
        Swal.fire({
            icon: "error",
            title: "Invalid or Empty Task",
            focusConfirm: false,
            confirmButtonColor: "#2b2d5d",
        });
    }
};

const deleteTodoItem = (delTaskId) => {
    const todoList = [...taskListArr];
    const updatedtodoList = todoList.filter((item) => item.id !== delTaskId);
    setTaskListArr(updatedtodoList);
};

const updateInput = (inputTask) => {
    setTaskItem(inputTask);
};

const handleCheck = (isChecked, taskId) => {
    let todoList = [...taskListArr];
    const foundItemIndex = todoList.findIndex((item) => item.id === taskId);
    todoList[foundItemIndex].isDone = isChecked;
    setTaskListArr(todoList);
};

return (
    <div>
        <div className="container">
            <form className="frmMrgn">
                <div className="form-group">
                    <h1 className="text-center">Todoアプリ</h1>
                    <div className="input-group-prepend row">
                        <div className="col-9">
                            <input
                                type="search"
                                className="form-control"
                                placeholder="何をするか？"
                                required
                                value={taskItem}
                                onChange={(e) => updateInput(e.target.value)}
                            />
                        </div>
                        <div className="col-3" style={{ marginTop: '6px'}}>
                            <button
                                className="btn btn-primary form-control"
                                onClick={(e) => addTodoItem(taskItem, e)}
                                disabled={!taskItem.length}
                            >
                                追加
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            <div className="cardParent mt-5">
                <ul className="list-group">
                    {taskListArr.map((item) => {
                    return (
                        <li
                        key={item.id}
                        className="list-group-item d-flex  centerAlign lstItem"
                        >
                        <input
                            type="checkbox"
                            name="isDone"
                            checked={item.isDone}
                            onChange={(e) => {
                            handleCheck(e.target.checked, item.id);
                            }}
                        />
                        <div className="tt">{item.value}</div>
                        <span
                            className={`badge badge-pill customBdg ${
                            item.isDone === false ? "bg-danger" : "bg-success"
                            }`}
                        >
                            {`${item.isDone === false ? `保留中` : "完了しました"}`}
                        </span>
                        <button
                            className="btn btn-danger buttonCustom"
                            disabled={!item.isDone}
                            onClick={() => deleteTodoItem(item.id)}
                        >
                            削除
                        </button>
                        </li>
                    );
                    })}
                </ul>
            </div>
        </div>
    </div>
);
}

export default App;
