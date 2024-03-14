import { useState, ChangeEvent } from 'react'

const useTaskApp = () => {
	const [task, setTask] = useState('')
	const [taskList, setTaskList] = useState([{ text: 'Zrobić zakupy', completed: false, id: 0 }])
	const [id, setId] = useState(1)

	const getTask = (event: ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value
		setTask(inputValue)
	}

	const addTask = () => {
		setId(id + 1)
		setTaskList([...taskList, { text: task, completed: false, id: id }])
	}

	const checkComplete = (id: number) => {
		const updateTaskComplete = [...taskList]
		updateTaskComplete.map(task => {
			if (task.id === id) {
				task.completed = !task.completed
			}
		})
		setTaskList(updateTaskComplete)
	}
	const deleteTask = (id: number) => {
		const updateTaskComplete = [...taskList]
		const newArr = updateTaskComplete.filter(task => task.id !== id)
		setTaskList(newArr)
		console.log(taskList)
	}
    return {
        addTask,
        getTask,
        taskList,
        checkComplete,
        deleteTask
    }
}
export { useTaskApp }
