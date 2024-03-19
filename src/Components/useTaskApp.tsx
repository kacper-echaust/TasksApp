import { useState, ChangeEvent, Dispatch, SetStateAction } from 'react'

const useTaskApp = () => {
	const [task, setTask] = useState('')
	const [id, setId] = useState(1)

	type taskListType = {
		taskList: { text: string; completed: boolean; id: number }[]
		setTaskList: Dispatch<SetStateAction<{ text: string; completed: boolean; id: number }[]>>
	}

	const getTask = (event: ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value
		setTask(inputValue)
	}

	const addTask = ({ setTaskList, taskList }: taskListType) => {
		setId(id + 1)
		const newTask = [...taskList, { text: task, completed: false, id: id }]
		setTaskList(newTask)
		setTask('')
		localStorage.setItem('taskList', JSON.stringify(newTask))
	}

	const checkComplete = (id: number, { taskList, setTaskList }: taskListType) => {
		const updateTaskComplete = [...taskList]
		updateTaskComplete.map(task => {
			if (task.id === id) {
				task.completed = !task.completed
			}
		})
		setTaskList(updateTaskComplete)
		localStorage.setItem('taskList', JSON.stringify(updateTaskComplete))
	}

	const deleteTask = (id: number, { taskList, setTaskList }: taskListType) => {
		const updateTask = [...taskList]
		const newArr = updateTask.filter(task => task.id !== id)
		setTaskList(newArr)
		localStorage.setItem('taskList', JSON.stringify(newArr))
	}

	const renameTask = (id: number, newText: string | null, { setTaskList, taskList }: taskListType) => {
		if (newText) {
			const updateTaskList = taskList.map(task => {
				if (task.id === id) {
					return { ...task, text: newText }
				}
				return task
			})
			setTaskList(updateTaskList)
			localStorage.setItem('taskList', JSON.stringify(updateTaskList))
		}
	}
	return {
		addTask,
		getTask,
		checkComplete,
		deleteTask,
		renameTask,
		task,
	}
}
export { useTaskApp }
