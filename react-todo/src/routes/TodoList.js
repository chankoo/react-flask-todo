import React, { Component } from 'react';
import TodoListTemplate from '../components/TodoListTemplate';
import Form from '../components/Form';
import TodoItemList from '../components/TodoItemList';
import UpdateForm from '../components/UpdateForm';
import * as util from '../utils';

class TodoList extends Component{
  constructor(props){
    super(props);
    this.state = {
      mode: 'read',
      input_title:'',
      input_content:'',
      deadLineCheck: false,
      input_deadLine: null,
      todos: [],
      put_title:'',
      put_content:'',
      put_id:null,
      put_deadLineCheck: false,
      put_deadLine: null,
      // userName: props.userName,
      // has_token: props.has_token,
      // token: props.token,
    }
  }

  handleSetMode = () =>{
    const {mode} = this.state
    if(mode === 'create'){
      util.createFormReset(this)
    }
    else{
      util.updateFormReset(this)
      this.setState({
        mode: 'create'
      })
    }
  }

  componentDidMount = () => { // 비동기로 TodoList.state.todos의 데이터를 가져와서 다시 렌더링
    // console.log('componentDidMount token:',this.props.token)
    if(this.props.token===null){return}
    fetch("http://0.0.0.0:5001/todos", {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization' : this.props.token
      }
    })
      .then(util.handleResponse)
      .then(response => {
        console.log('componentDidMount response:',response)
        return JSON.parse(response)})
      .then(todos => {
        this.setState({
          todos: todos.sort((a,b) => a.priority - b.priority)
        })
      })
  }

  handleFormChange = (e) => {
    this.setState({
      [e.target.className]: e.target.value 
    })
  }

  handleDeadLineOn = (fromWhere) =>{
    const {deadLineCheck, put_deadLineCheck} = this.state

    if(fromWhere==='Form'){
      this.setState({
        deadLineCheck: !deadLineCheck,
      })
    }
    else{
      this.setState({
        put_deadLineCheck: !put_deadLineCheck,
      })
    }
  }

  deadLineCallback = (deadLine, fromWhere) =>{
    if(fromWhere==='Form'){
      this.setState({
        input_deadLine: deadLine,
      })
    }
    else{
      this.setState({
        put_deadLine: deadLine,
      })
    }
  }
  
  addNewTodo = (todo) => {
    const {todos} = this.state
    
    this.setState({
      ...this.state,
      todos: todos.concat([todo]),
    })
  }

  handleCreate = () => {
    const {input_title, input_content, input_deadLine, deadLineCheck} = this.state
    
    // 마감 기한 오류 검사
    let confirm_deadLine = input_deadLine
    if(!deadLineCheck){confirm_deadLine = null}

    fetch('http://0.0.0.0:5001/todos', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization' : this.props.token
      },
      body: JSON.stringify({
        title: input_title,
        content: input_content,
        has_deadLine: deadLineCheck,
        deadLine: confirm_deadLine
      })
    })
      .then(util.handleResponse)
      .then(response => {
        response = JSON.parse(response)
        this.addNewTodo(response[0])
      })
      .then(()=>{ // 전송이 끝나면 입력 폼을 초기화한다
        util.createFormReset(this)
      })
      .catch(error => {
        alert(error)
        console.log(error)
        })
  }

  handleToggle = (id) => { // TodoItem의 완료여부를 수정
    const {todos} = this.state
    const {token} = this.props
    fetch('http://0.0.0.0:5001/todos', {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization' : token
      },
      body: JSON.stringify({
        id: id
      })
    })
      .then(util.handleResponse)
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
    const {token} = this.props
    fetch('http://0.0.0.0:5001/todos', {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization' : token
      },
      body: JSON.stringify({
        id: id
      })
    })
      .then(util.handleResponse)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
        })
    const delTodos = todos.filter(todo => {return todo.id !== id})
    this.setState({
      ...this.state,
      todos: delTodos
    }) 
  }

  handleUpdatemode = (id) => { // mode를 update로 변경해 UpdateForm을 드러낸다
    const {mode, todos} = this.state
    const put_todo = todos.filter(todo => todo.id === id)[0]

    if(mode !== 'update'){
      this.setState({
        mode:'update',
        put_title: put_todo.title,
        put_content: put_todo.content,
        put_id: id,
        put_deadLine: (put_todo.deadLine==='None' ? null : put_todo.deadLine),
        put_deadLineCheck: put_todo.deadLine!=='None'
      })
    }
    else{
      util.updateFormReset(this)
    }
  }

  updatePutTodo = (todo, put_id) => {
    const {todos} = this.state
    let putTodos = [...todos]
    const putIdx = putTodos.findIndex(todo => {return todo.id === put_id})
    putTodos[putIdx].title = todo.title
    putTodos[putIdx].content = todo.content
    if(todo.deadLine){
      putTodos[putIdx].deadLine = todo.deadLine
    }
    this.setState({
      ...this.state,
      todos: putTodos,
      mode: 'read'
    })
  }

  handleUpdate = () => {
    const {put_id, put_title, put_content, put_deadLine, put_deadLineCheck} = this.state
    const {token} = this.props
    
    // 마감기한 오류 검사
    let confirm_deadLine = put_deadLine
    if(!put_deadLineCheck){confirm_deadLine = null}
    else{confirm_deadLine = (put_deadLine === null ? new Date() : put_deadLine)}
    
    fetch('http://0.0.0.0:5001/todos', {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization' : token
      },
      body: JSON.stringify({
        id: put_id,
        title: put_title,
        content: put_content,
        has_deadLine: put_deadLineCheck,
        deadLine: confirm_deadLine
      })
    })
      .then(util.handleResponse)
      .then(response => {
        response = JSON.parse(response)
        this.updatePutTodo(response[0], put_id)
      })
      .catch(error => {
        console.log(error);
        })
    
    // console.log("!handleUpdate",put_deadLine)
    
  }

  handlePriorChange=(id,dir) => {
    // console.log('handlePriorChange')
    fetch('http://0.0.0.0:5001/todos', {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization' : this.props.token
      },
      body: JSON.stringify({
        id: id,
        dir: dir,
      })
    })
      .then(util.handleResponse)
      .then(response => {return JSON.parse(response)})
      .then(todos => {
        this.setState({
          todos: todos.sort((a,b) => a.priority - b.priority)
        })
      })
      .catch(error => {
        console.log(error)
        })
  }

  render(){
    const {input_title, input_content, deadLineCheck, todos, put_title, put_content, put_deadLine
      ,put_deadLineCheck} = this.state
    const {
      handleSetMode,
      handleFormChange,
      handleCreate,
      handleToggle,
      handleRemove,
      handleUpdate,
      handleUpdatemode,
      deadLineCallback,
      handleDeadLineOn,
      handlePriorChange,
    } = this
    
    return (
      <div>
        <TodoListTemplate 
          form={(this.state.mode === 'create') && (
            <Form
              title={input_title}
              content={input_content}
              onChange={handleFormChange}
              onCreate={handleCreate}
              deadLineCheck={deadLineCheck}
              onDeadline={handleDeadLineOn}
              callbackFromTodoList={deadLineCallback}
              />)}
          updateForm={(this.state.mode === 'update') && (
            <UpdateForm 
              title={put_title}
              content={put_content}
              onChange={handleFormChange}
              onUpdate={handleUpdate}
              put_deadLine={put_deadLine}
              put_deadLineCheck={put_deadLineCheck}
              onDeadline={handleDeadLineOn}
              callbackFromTodoList={deadLineCallback}
          
            />)}
        setMode={handleSetMode}
        >
          <TodoItemList todos={todos} onToggle={handleToggle} onRemove={handleRemove} onUpdateMode={handleUpdatemode} onPriorChange={handlePriorChange}/>
        </TodoListTemplate>
      </div>
    );
  }
}

export default TodoList;
