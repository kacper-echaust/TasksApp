import { Form } from './Form/Form'
import { TaskList } from './TaskList/TaskList'
import { useEffect, useState } from 'react'
import css from './TaskApp.module.scss'

const TaskApp = () => {
	type taskListType = {
		text: string
		completed: boolean
		id: number
	}
	const [taskList, setTaskList] = useState<taskListType[]>([])

	useEffect(() => {
		const localData = localStorage.getItem('taskList')
		if (localData) {
			setTaskList(JSON.parse(localData))
		}
	}, [])

	return (
		<div className={css.taskAppContainer}>
			<h1>Task App</h1>
			<Form setTaskList={setTaskList} taskList={taskList} />
			<TaskList taskList={taskList} setTaskList={setTaskList} />
		</div>
	)
}

export { TaskApp }
