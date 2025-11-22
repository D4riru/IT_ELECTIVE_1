'use client'
import { useState, useEffect } from 'react'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import SearchBar from '../components/SearchBar'
import '../app/globals.css'

export default function Home() {
  const [todos, setTodos] = useState([])
  const [activeTab, setActiveTab] = useState('todo')
  const [searchTerm, setSearchTerm] = useState('')

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // Create new todo
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    }
    setTodos([...todos, newTodo])
  }

  // Update todo
  const updateTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ))
  }

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // Toggle complete status
  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  // Filter todos based on active tab and search term
  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    if (activeTab === 'completed') {
      return todo.completed && matchesSearch
    } else if (activeTab === 'todo') {
      return !todo.completed && matchesSearch
    }
    return matchesSearch
  })

  return (
    <div className="container">
      <header className="header">
        <h1>Todo Application</h1>
        <p>Manage your tasks efficiently</p>
      </header>

      <div className="app">
        <TodoForm onAdd={addTodo} />
        
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'todo' ? 'active' : ''}`}
            onClick={() => setActiveTab('todo')}
          >
            To Do ({todos.filter(t => !t.completed).length})
          </button>
          <button
            className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed ({todos.filter(t => t.completed).length})
          </button>
        </div>

        <TodoList
          todos={filteredTodos}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
          onToggleComplete={toggleComplete}
        />
      </div>
    </div>
  )
}