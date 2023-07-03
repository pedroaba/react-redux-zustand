import { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { add } from '../store'

export function AddToDo() {
  const [newTodo, setNewTodo] = useState('')
  const dispatch = useDispatch()

  function handleAddNewTodo(e: FormEvent) {
    e.preventDefault()

    dispatch(add({ newTodo }))
    setNewTodo('')
  }

  return (
    <form onSubmit={handleAddNewTodo}>
      <input
        type="text"
        placeholder="Novo to-do"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  )
}