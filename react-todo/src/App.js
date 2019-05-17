import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import UpdateForm from './components/UpdateForm';
import handleResponse from './utils';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      mode: 'creat',
      input_title:'',
      input_content:'',
      todos: [],
      idxs: [],
      put_title:'',
      put_content:'',
      put_id:NaN
    }
  }

  // handleKeyPress = (e) => {
  //   // 눌려진 키가 Enter 면 handleUpdate 호출
  //   if(e.key === 'Enter') {
  //     this.handleUpdate();
  //   }
  // }

  componentDidMount = () => { // 비동기로 App.state.todos의 데이터를 가져와서 다시 렌더링
    fetch("http://0.0.0.0:5000/", {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(handleResponse)
      .then(response => {return JSON.parse(response);})
      .then(todos => {
        this.setState({
          todos:todos,
        })
      })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.className]: e.target.value 
    })
  }
  
  addNewTodo = (todo) => {
    const {todos} = this.state
    let newTodos = [...todos]
    newTodos.push(todo)
    newTodos.sort((x, y) => y.id - x.id) ////
    this.setState({
      ...this.state,
      todos: newTodos
    })
  }

  handleCreate = () => {
    const {input_title, input_content} = this.state
    fetch('http://0.0.0.0:5000/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: input_title,
        content:input_content
      })
    })
      .then(handleResponse)
      .then(response => {
        response = JSON.parse(response);
        this.addNewTodo(response[0])
      })
      .then(
        this.setState({
          input_title: '',
          input_content:''
        })
      )
      .catch(error => {
        console.log(error);
        })
  };

  handleToggle = (id) => { // TodoItem의 완료여부를 수정
    const {todos} = this.state
    fetch('http://0.0.0.0:5000/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id
      })
    })
      .then(handleResponse)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        })
    let putTodos = [...todos]
    const putIdx = putTodos.findIndex(todo => {return todo.id === id})
    putTodos[putIdx].checked = !putTodos[putIdx].checked
    this.setState({
      ...this.state,
      todos:putTodos
    }) 
  }

  handleRemove = (id) => { // TodoItem의 삭제
    const {todos} = this.state;
    fetch('http://0.0.0.0:5000/', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id
      })
    })
      .then(handleResponse)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        });
    const delTodos = todos.filter(todo => {return todo.id !== id})
    this.setState({
      ...this.state,
      todos:delTodos
    }) 
  }

  handleUpdatemode = (id) => { // mode를 update로 변경해 UpdateForm을 드러낸다
    const {mode, todos} = this.state;
    if(mode !== 'update'){
      this.setState({
        mode:'update',
        put_title: todos.filter(todo => todo.id === id)[0].title,
        put_content: todos.filter(todo => todo.id === id)[0].content,
        put_id: id
      })
    }
    else{
      this.setState({
        mode: 'create',
        put_id: NaN,
        put_title: '',
        put_content: ''
      })
    }
  }

  handleUpdate = () => {
    const {put_id, put_title, put_content, todos} = this.state;
    fetch('http://0.0.0.0:5000/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id:put_id,
        title: put_title,
        content:put_content
      })
    })
      .then(handleResponse)
      .then(response => {
        console.log(response);
      })
      .then(
        this.setState({
          put_id: NaN, // ??
          put_title: '',
          put_content: ''
        })
      )
      .catch(error => {
        console.log(error);
        })
    let putTodos = [...todos]
    const putIdx = putTodos.findIndex(todo => {return todo.id === put_id})
    putTodos[putIdx].title = put_title
    putTodos[putIdx].content = put_content
    this.setState({
      ...this.state,
      todos: putTodos,
      mode: 'create'
    })
  }

  render(){
    const {input_title, input_content, todos, put_title, put_content} = this.state;
    const {
      handleChange,
      handleCreate,
      handleToggle,
      handleRemove,
      handleUpdate,
      handleUpdatemode,
    } = this;

    return (
      <TodoListTemplate 
        form={(
          <Form
            title={input_title}
            content={input_content}
            onChange={handleChange}
            onCreate={handleCreate}
            />)}
        updateForm={(this.state.mode === 'update') && (
          <UpdateForm 
            title={put_title}
            content={put_content}
            onChange={handleChange}
            onUpdate={handleUpdate}
          />)}
      >
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove} onUpdateMode={handleUpdatemode}/>
      </TodoListTemplate>
    );
  }
}

export default App;
