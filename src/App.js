import React, { Component, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function TodoNew({addItem}) {
    const [inputItem, setInputItem] = useState('');

    const addHandler = () => {
        addItem(inputItem);
        setInputItem('');
    };

    return <div className="cardParent px-5">
            <h1 className="text-center mb-5">Todo Lists</h1>
            <div className="input-group-prepend row">
                <div className="col-9">
                    <input
                        type="search"
                        className="form-control"
                        placeholder="what will you do?"
                        value={inputItem}
                        onChange={(e) => setInputItem(e.target.value)}
                        required />
                </div>
                <div className="col-3">
                    <button
                        className="btn btn-primary form-control"
                        disabled={! inputItem.length}
                        onClick={addHandler}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>;
}

function TodoItem({item, onDelete, onUpdate}) {
    const [editMode, setEditMode] = useState(false);
    const [editValue, setEditValue] = useState(item.value);

    const checkHandler = (e) => {
        const updateItem = {...item, isDone: ! item.isDone};
        onUpdate(updateItem);
    };

    const deleteHandler = () => {
        onDelete(item);
    };

    const editHandler = () => {
        if (editMode === true) {
            const updateItem = {...item, value: editValue};
            onUpdate(updateItem);
        }
        setEditMode (! editMode);
    }

    return <li
        key={item.id}
        className="list-group-item d-flex  centerAlign lstItem"
    >
        <input
            type="checkbox"
            name="isDone"
            checked={item.isDone}
            disabled={editMode}
            onChange={checkHandler}/>
        <div className="tt">
            {
                editMode ?
                <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}/> :
                item.value
            }
        </div>
        <span
            className={`badge badge-pill customBdg ${item.isDone === false ? "bg-danger" : "bg-success"}`}
        >
            {`${item.isDone === false ? `reserve` : "completed"}`}
        </span>
        <button
            className="btn btn-danger buttonCustom"
            disabled={!item.isDone}
            onClick={deleteHandler}
        >
            Delete
        </button>
        <button
            className="btn btn-primary buttonCustom"
            disabled={item.isDone}
            onClick={editHandler}
        >
            {editMode ? 'Update' : 'Edit'}
        </button>
    </li>;
}

export default function App() {
    const [taskListArr, setTaskListArr] = useState([
        {
            id : 1,
            value : 'Task 1',
            isDone : true
        },
        {
            id : 2,
            value : 'Task 2',
            isDone : false
        },
        {
            id : 3,
            value : 'Task 3',
            isDone : true
        },
    ]);

    const addHandler = (value) => {
        console.log(value);
        const newItem = {
            id : taskListArr.length + 1,
            value : value,
            isDone : false
        };
        setTaskListArr([...taskListArr, newItem]);
    };

    const deleteHandler = (item) => {
        setTaskListArr(taskListArr.filter(todo=> todo.id != item.id));
    };

    const updateHandler = (item) => {
        setTaskListArr(taskListArr.map(todo=> todo.id == item.id ? item : todo));
    };

    return (
        <div>
            <div className="container">
                <TodoNew addItem={addHandler}/>
                <div className="cardParent mt-5">
                    <ul className="list-group">
                        {taskListArr.map(item => <TodoItem key={item.id}
                                                            onDelete={deleteHandler}
                                                            onUpdate={updateHandler}
                                                            item={item}/>)}
                    </ul>
                </div>
            </div>
        </div>
    );
}
