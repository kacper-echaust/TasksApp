import { useState, ChangeEvent, Dispatch, SetStateAction } from 'react'

const useTaskApp = () => {
	const [task, setTask] = useState('')
	const [id, setId] = useState('')
	const unicalId = Date.now().toString(36) + Math.random().toString(36).substr(2)

	type taskListType = {
		taskList: { text: string; completed: boolean; id: string }[]
		setTaskList: Dispatch<SetStateAction<{ text: string; completed: boolean; id: string }[]>>
	}

	const getTask = (event: ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value
		setTask(inputValue)
	}

	const addTask = ({ setTaskList, taskList }: taskListType) => {
		setId(unicalId)
		const newTask = [...taskList, { text: task, completed: false, id: id }]
		setTaskList(newTask)
		setTask('')
		localStorage.setItem('taskList', JSON.stringify(newTask))
	}

	const checkComplete = (id: string, { taskList, setTaskList }: taskListType) => {
		const updateTaskComplete = [...taskList]
		updateTaskComplete.map(task => {
			if (task.id === id) {
				task.completed = !task.completed
			}
		})
		setTaskList(updateTaskComplete)
		localStorage.setItem('taskList', JSON.stringify(updateTaskComplete))
	}

	const deleteTask = (id: string, { taskList, setTaskList }: taskListType) => {
		const updateTask = [...taskList]
		const newArr = updateTask.filter(task => task.id !== id)
		setTaskList(newArr)
		localStorage.setItem('taskList', JSON.stringify(newArr))
	}

	const renameTask = (id: string, newText: string | null, { setTaskList, taskList }: taskListType) => {
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
