import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState('');
  const [currentEditedItem, setCurrentEditedItem] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  const handleAddTodo = () => {
    const newTodo = { title: newTitle, description: newDescription };
    axios.post('http://localhost:8080/todos', newTodo)
      .then(response => setTodos([...allTodos, response.data]))
      .catch(error => console.error('Error adding todo:', error));
  };

  const handleDeleteTodo = (index) => {
    const todoId = index; // Assuming index is used as id for now
    axios.delete(`http://localhost:8080/todos/${todoId}`)
      .then(() => {
        const filteredTodo = allTodos.filter((_, i) => i !== index);
        setTodos(filteredTodo);
      })
      .catch(error => console.error('Error deleting todo:', error));
  };

  const handleComplete = (index) => {
    const now = new Date();
    const completedOn = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    const completedItem = { ...allTodos[index], completedOn };
    setCompletedTodos([...completedTodos, completedItem]);

    handleDeleteTodo(index);
  };

  const handleDeleteCompletedTodo = (index) => {
    const filteredCompleted = completedTodos.filter((_, i) => i !== index);
    setCompletedTodos(filteredCompleted);
  };

  const handleEdit = (ind, item) => {
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  };

  const handleUpdateTitle = (value) => {
    setCurrentEditedItem((prev) => ({ ...prev, title: value }));
  };

  const handleUpdateDescription = (value) => {
    setCurrentEditedItem((prev) => ({ ...prev, description: value }));
  };

  const handleUpdateToDo = () => {
    const updatedTodo = { ...currentEditedItem };
    axios.put(`http://localhost:8080/todos/${currentEdit}`, updatedTodo)
      .then(response => {
        const updatedTodos = allTodos.map((todo, index) => index === currentEdit ? response.data : todo);
        setTodos(updatedTodos);
        setCurrentEdit("");
      })
      .catch(error => console.error('Error updating todo:', error));
  };

  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="What's the task title?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={e => setNewDescription(e.target.value)}
              placeholder="What's the task description?"
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${!isCompleteScreen && 'active'}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen && 'active'}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {!isCompleteScreen && allTodos.map((item, index) => (
            currentEdit === index ? (
              <div className='edit__wrapper' key={index}>
                <input
                  placeholder='Updated Title'
                  onChange={(e) => handleUpdateTitle(e.target.value)}
                  value={currentEditedItem.title}
                />
                <textarea
                  placeholder='Updated Description'
                  rows={4}
                  onChange={(e) => handleUpdateDescription(e.target.value)}
                  value={currentEditedItem.description}
                />
                <button
                  type="button"
                  onClick={handleUpdateToDo}
                  className="primaryBtn"
                >
                  Update
                </button>
              </div>
            ) : (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <AiOutlineDelete
                    className="icon"
                    onClick={() => handleDeleteTodo(index)}
                    title="Delete?"
                  />
                  <BsCheckLg
                    className="check-icon"
                    onClick={() => handleComplete(index)}
                    title="Complete?"
                  />
                  <AiOutlineEdit
                    className="check-icon"
                    onClick={() => handleEdit(index, item)}
                    title="Edit?"
                  />
                </div>
              </div>
            )
          ))}

          {isCompleteScreen && completedTodos.map((item, index) => (
            <div className="todo-list-item" key={index}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p><small>Completed on: {item.completedOn}</small></p>
              </div>
              <div>
                <AiOutlineDelete
                  className="icon"
                  onClick={() => handleDeleteCompletedTodo(index)}
                  title="Delete?"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
