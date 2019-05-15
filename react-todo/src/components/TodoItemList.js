import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoItemList extends Component { // TodoItem 컴포넌트 여러개를 렌더링하는 역할
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.todos !== nextProps.todos;
  }

  render() {
    const { todos, 
            onToggle, onRemove, onUpdateMode } = this.props;
    
    // todos 배열을 컴포넌트 배열로 변환하는 map
    const todoList = todos.map( 
      ({id, title, content, checked}) => (
        <TodoItem
          id={id}
          title={title}
          content={content}
          checked={checked}
          onToggle={onToggle}
          onRemove={onRemove}
          onUpdateMode={onUpdateMode}
          key={id} // 배열 렌더링 할때는 key값이 반드시 필요
        />
      )
    );

    return (
      <div>      
        {todoList}    
      </div>
    );
  }
}

export default TodoItemList;