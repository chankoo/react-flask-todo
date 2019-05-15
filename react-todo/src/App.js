import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import UpdateForm from './components/UpdateForm';


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      mode: 'creat',
      input_title:'',
      input_content:'',
      todos: [],
      next_id: 0,
      put_title:'',
      put_content:'',
      put_id:NaN
    }
  }

  componentDidMount(){ // 비동기로 App.state.todos의 데이터를 가져옴
    const handleResponse = response => {
      return response.text().then(text => {
        const data = text && JSON.parse(text)
        if (!response.ok) {
          if (response.status === 401) {
            // auto logout if 401 response returned from api
            return Promise.reject(response)
          }
          const error = (data && data.message) || response.statusText
          return Promise.reject(error)
        }
        return data
      })
    };
    fetch("http://0.0.0.0:5000/", {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(handleResponse)
      .then(response => {return JSON.parse(response);})
      .then(todos => {
        let next_id = 0;
        if(todos !== []){
          for(let obj of todos){
            if(obj.id > next_id){
              next_id = obj.id;
            }
          }
          next_id++;
        };
        this.setState({
          todos:todos,
          next_id:next_id
        });
      });
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.className]: e.target.value 
    }); 
  }

  handleToggle = (id) => { // TodoItem의 완료여부를 수정
    const handleResponse = response => {
      return response.text().then(text => {
        const data = text && JSON.parse(text)
        if (!response.ok) {
          if (response.status === 401) {
            // auto logout if 401 response returned from api
            return Promise.reject(response)
          }
          const error = (data && data.message) || response.statusText
          return Promise.reject(error)
        }
        return data
      })
    };
    fetch('http://0.0.0.0:5000/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: id,
      })
    })
    .then(handleResponse)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
      });
  window.location.reload();
  }

  handleRemove = (id) => { // TodoItem의 삭제
    const handleResponse = response => {
      return response.text().then(text => {
        const data = text && JSON.parse(text)
        if (!response.ok) {
          if (response.status === 401) {
            // auto logout if 401 response returned from api
            return Promise.reject(response)
          }
          const error = (data && data.message) || response.statusText
          return Promise.reject(error)
        }
        return data
      })
    };
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
  window.location.reload();
  }

  handleUpdatemode = (id) => { // mode를 update로 변경해 UpdateForm을 드러낸다
    const {todos, mode} = this.state;
    if(mode !== 'update'){
      this.setState({
        mode:'update',
        put_title: todos.filter(todo => todo.id === id)[0].title,
        put_content: todos.filter(todo => todo.id === id)[0].content,
        put_id:id
      });
    }
    else{
      this.setState({
        mode:'create',
      });
    }
  }

  render(){
    const {input_title, input_content, todos, put_title, put_content, next_id, put_id} = this.state;
    const {
      handleChange,
      handleCreate,
      handleToggle,
      handleRemove,
      handleUpdate,
      handleUpdatemode
    } = this;

    return (
      <TodoListTemplate 
        form={(
          <Form
            title={input_title}
            content={input_content}
            onChange={handleChange}
            onCreate={handleCreate}
            next_id={next_id}
            />)}
        updateForm={(this.state.mode === 'update') && (
          <UpdateForm 
            title={put_title}
            content={put_content}
            onChange={handleChange}
            onUpdate={handleUpdate}
            put_id={put_id}
          />)}
      >
        <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove} onUpdateMode={handleUpdatemode}/>
      </TodoListTemplate>
    );
  }
}

export default App;
