import { useTaskApp } from '../useTaskApp'
import { Dispatch, SetStateAction } from 'react'
import css from './Form.module.scss'

type taskListType = {
	taskList: { text: string; completed: boolean; id: number }[]
	setTaskList: Dispatch<SetStateAction<{ text: string; completed: boolean; id: number }[]>>
}

const Form = ({ setTaskList, taskList }: taskListType) => {
	const { addTask, getTask, task } = useTaskApp()

	return (
		<div className={css.formContainer}>
			<form
				onSubmit={event => {
					event.preventDefault()
					addTask({ setTaskList, taskList })
				}}>
				<input type='text' onChange={getTask} placeholder='ENTER THE CONTENT OF THE TASK!' value={task} />
			</form>
		</div>
	)
}

export { Form }
