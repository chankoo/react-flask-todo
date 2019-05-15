import React from 'react';
import './TodoListTemplate.css';

const TodoListTemplate = ({form, updateForm, children}) => { // form, children에 해당하는 props 받아서 보여주기만하는 컴포넌트
  return (
    <main className="todo-list-template">
      <div className="title">
        TODO list
      </div>
      <section className="form-wrapper">
        {form}
      </section>
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