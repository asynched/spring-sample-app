import { XCircleIcon } from '@heroicons/react/24/outline'

type Props = {
  task: Task
  handleDelete: (id: number) => void
  handleUpdate: (id: number) => void
}

const MAX_STRING_SIZE = 48

export default function TaskCard({ task, handleDelete, handleUpdate }: Props) {
  return (
    <div
      onClick={() => handleUpdate(task.id)}
      className="flex items-center justify-between border p-4 rounded text-zinc-600 transition ease-in-out cursor-pointer hover:border-transparent hover:shadow-lg"
      key={task.id}
    >
      <div>
        <p>
          {task.title} -&nbsp;
          <span>
            {task.description.length >= MAX_STRING_SIZE
              ? task.description.substring(0, MAX_STRING_SIZE) + '...'
              : task.description}{' '}
          </span>
        </p>
        <p>
          Status:{' '}
          <span
            className={task.completed ? 'text-green-600' : 'text-purple-600'}
          >
            {task.completed ? 'Completed' : 'Pending'}
          </span>
        </p>
      </div>
      <button onClick={() => handleDelete(task.id)}>
        <XCircleIcon className="w-6 h-6 text-gray-400" />
      </button>
    </div>
  )
}
