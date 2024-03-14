import { useTaskApp } from './useTaskApp'
import css from './TaskApp.module.scss'

const TaskApp = () => {
	const { addTask, getTask, taskList, checkComplete, deleteTask } = useTaskApp()

	return (
		<div className={css.taskAppContainer}>
			<h1>Task App</h1>
			<div className={css.formContainer}>
				<form
					onSubmit={event => {
						event.preventDefault()
						addTask()
					}}>
					<input type='text' onChange={getTask} placeholder='ENTER THE CONTENT OF THE TASK!' />
				</form>
			</div>
			<div className={css.listContainer}>
				<ul>
					{taskList.map(task => {
						return (
							<li key={task.id}>
								<p className={task.completed ? css.completed : ''}>{task.text}</p>
								<div>
									<input type='checkbox' onChange={() => checkComplete(task.id)} />
									<button onClick={() => deleteTask(task.id)}>x</button>
								</div>
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}

export { TaskApp }
