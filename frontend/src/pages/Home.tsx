import { Link } from 'react-router-dom'
import useFetch from '@/hooks/useFetch'
import TaskCard from '@/components/TaskCard'
import { AnimatePresence, motion } from 'framer-motion'

export default function Home() {
  const { data, loading, error, refetch } = useFetch<Pageable<Task>>(
    'http://localhost:8080/tasks'
  )

  const handleDelete = async (id: number) => {
    const response = await fetch(`http://localhost:8080/tasks/${id}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      refetch()
    }
  }

  const handleUpdate = async (id: number) => {
    const task = data?.content.find((task) => task.id === id)!

    const response = await fetch(`http://localhost:8080/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...task,
        completed: !task.completed,
      }),
    })

    if (response.ok) {
      refetch()
    }
  }

  return (
    <div className="mx-auto max-w-screen-sm">
      <h1 className="mt-8 mb-4 text-4xl font-bold tracking-tighter">
        Olá! Suas tarefas estão abaixo
      </h1>
      <p className="mb-4">
        Sua listagem de tarefas -{' '}
        <Link className="text-purple-700 hover:underline" to="/create">
          Clique aqui para uma tarefa
        </Link>
      </p>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro ao carregar tarefas</p>}
      {data && (
        <ul className="grid gap-4">
          <AnimatePresence>
            {data.content.map((task, index) => (
              <motion.li
                key={task.id}
                transition={{
                  delay: index * 0.1,
                  duration: 0.25,
                }}
                initial={{ opacity: 0, x: -25 }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: 25,
                }}
              >
                <TaskCard
                  task={task}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  )
}
