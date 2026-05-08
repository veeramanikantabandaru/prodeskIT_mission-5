import { useState, useEffect } from 'react'
import './App.css'

interface Task {
  id: number
  text: string
  status: 'todo' | 'inprogress' | 'done'
  priority: 'high' | 'medium' | 'low'
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskText, setNewTaskText] = useState('')
  const [newTaskPriority, setNewTaskPriority] = useState<'high' | 'medium' | 'low'>('medium')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingText, setEditingText] = useState('')

  useEffect(() => {
    const savedTasks = localStorage.getItem('kanban-tasks')
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (newTaskText.trim()) {
      const newTask: Task = {
        id: Date.now(),
        text: newTaskText.trim(),
        status: 'todo',
        priority: newTaskPriority
      }
      setTasks([...tasks, newTask])
      setNewTaskText('')
      setNewTaskPriority('medium')
    }
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const moveTask = (id: number, newStatus: 'todo' | 'inprogress' | 'done') => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status: newStatus } : task))
  }

  const startEditing = (id: number, text: string) => {
    setEditingId(id)
    setEditingText(text)
  }

  const saveEditing = () => {
    if (editingId !== null && editingText.trim()) {
      setTasks(tasks.map(task => task.id === editingId ? { ...task, text: editingText.trim() } : task))
    }
    setEditingId(null)
    setEditingText('')
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditingText('')
  }

  const columns = [
    { key: 'todo', title: 'To Do' },
    { key: 'inprogress', title: 'In Progress' },
    { key: 'done', title: 'Done' }
  ]

  return (
    <div className="kanban">
      <h1>Kanban Board</h1>
      <div className="add-task">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Add a new task"
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <select value={newTaskPriority} onChange={(e) => setNewTaskPriority(e.target.value as 'high' | 'medium' | 'low')}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="columns">
        {columns.map(column => (
          <div key={column.key} className="column">
            <h2>{column.title}</h2>
            <div className="tasks">
              {tasks.filter(task => task.status === column.key).map(task => (
                <div key={task.id} className="task" data-priority={task.priority}>
                  {editingId === task.id ? (
                    <div>
                      <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && saveEditing()}
                        autoFocus
                      />
                      <button onClick={saveEditing}>Save</button>
                      <button onClick={cancelEditing}>Cancel</button>
                    </div>
                  ) : (
                    <div>
                      <span onClick={() => startEditing(task.id, task.text)}>{task.text}</span>
                      <button onClick={() => deleteTask(task.id)}>X</button>
                      {column.key !== 'todo' && <button onClick={() => moveTask(task.id, 'todo')}>Move to To Do</button>}
                      {column.key !== 'inprogress' && <button onClick={() => moveTask(task.id, 'inprogress')}>Move to In Progress</button>}
                      {column.key !== 'done' && <button onClick={() => moveTask(task.id, 'done')}>Move to Done</button>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
