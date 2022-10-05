import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreateTask() {
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(document.forms[0]!)
    const data = Object.fromEntries(formData.entries()) as TaskDTO

    if (!data.title || !data.description) {
      return
    }

    const response = await fetch('http://localhost:8080/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      navigate('/')
    }
  }

  return (
    <div className="mx-auto max-w-screen-sm">
      <h1 className="mt-8 mb-4 text-4xl font-bold tracking-tighter">
        Criar nova tarefa
      </h1>
      <p className="mb-4">Insira as informações abaixo</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 grid gap-4">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Título"
            className="py-2 px-4 border outline-none transition ease-in-out focus:ring-1 focus:ring-purple-600 focus:ring-opacity-75"
          />
          <textarea
            placeholder="Descrição"
            name="description"
            id="description"
            rows={6}
            className="py-2 px-4 border outline-none transition ease-in-out focus:ring-1 focus:ring-purple-600 focus:ring-opacity-75"
          />
        </div>
        <button className="p-2 block text-center w-full border border-purple-600 text-purple-600 transition ease-in-out hover:bg-purple-600 hover:text-white">
          Criar tarefa
        </button>
      </form>
    </div>
  )
}
