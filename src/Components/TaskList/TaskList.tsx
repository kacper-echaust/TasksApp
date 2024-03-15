import { useTaskApp } from '../useTaskApp'
import { Dispatch, SetStateAction } from 'react'
import css from './TaskList.module.scss'

type taskListType = {
	taskList: { text: string; completed: boolean; id: number }[]
	setTaskList: Dispatch<SetStateAction<{ text: string; completed: boolean; id: number }[]>>
}
const TaskList = ({ taskList, setTaskList }: taskListType) => {
	const { checkComplete, deleteTask } = useTaskApp()
	return (
		<div className={css.listContainer}>
			<ul>
				{taskList.map(task => {
					return (
						<li key={task.id}>
							<p className={task.completed ? css.completed : ''}>{task.text}</p>
							<div>
								<input
									type='checkbox'
									onChange={() => checkComplete(task.id, { taskList, setTaskList })}
								/>
								<button onClick={() => deleteTask(task.id, { taskList, setTaskList })}>x</button>
							</div>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export { TaskList }