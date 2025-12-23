import "./Todo.css"
import React, { useState } from "react"
import { db, createTask, deleteTask } from "./todoDb"


export function Todo() {

    const [message, setMessage] = useState("")
    const [addTask, setAddTask] = useState(false)



    const AddTask = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createTask(message)
            setAddTask(false)
        }
    }

    return (
        <>
            <div id="Todo-header">
                <p>Tasks</p>
                <div id="Todo-header-btn" onClick={() => setAddTask(true)}>
                    <h2>+</h2>
                </div>
            </div>


            {addTask ?
                <div id="Todo-add-task">
                    <input type="text"
                        id="Todo-add-input"
                        placeholder="Adicione sua proxima tarefa"
                        onChange={(event) => setMessage(event.currentTarget.value)}
                        onKeyDown={AddTask}
                        maxLength={50}
                    />
                </div>
                :
                <>
                    {db.length > 0 ?
                        <div id="Todo-main-task">
                            {db.map((msg, index) => (
                                <div id="Todo-task">
                                    <p key={index}>{msg}</p>
                                    <div id="Todo-task-btn">
                                        <p onClick={() => deleteTask(index)}>X</p>
                                        <input type="checkbox" className="Todo-check" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        :
                        <div id="Todo-main">
                            <h2>Manter o Controle</h2>
                            <p>Adicione tarefas e controle sua agenda </p>
                            <div id="Todo-main-btn">
                                <p onClick={() => setAddTask(true)}>+ Adicionar uma tarefa</p>
                            </div>
                        </div>
                    }
                </>
            }
        </>

    )
}