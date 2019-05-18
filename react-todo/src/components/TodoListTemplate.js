import React from 'react';
import './TodoListTemplate.css';

const TodoListTemplate = ({form, setMode, updateForm, children}) => { // form, updateForm, children에 해당하는 props 받아서 보여주기만하는 컴포넌트
  return (
    <main className="todo-list-template">
      <div className="title">
        TODO list
      </div>
      <section className="form-wrapper">
        {form}
      </section>
      <div>
        <button className="create_button" onClick={setMode}>
          add Todo
        </button>
      </div>
      <section className="form-wrapper">
        {updateForm}
      </section>
      <section className="todos-wrapper">
        { children }
      </section>
    </main>
  );
};

export default TodoListTemplate;