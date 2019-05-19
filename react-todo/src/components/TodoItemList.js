import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoItemList extends Component { // TodoItem 컴포넌트 여러개를 렌더링하는 역할
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.todos !== nextProps.todos;
  }

  render() {
    const { todos, 
            onToggle, onRemove, onUpdateMode, onPriorChange } = this.props
    console.log('왜 프로퍼티는 안찍히지??',todos[0])
    
    // todos 배열을 컴포넌트 배열로 변환하는 map
    const todoList = todos.map( 
      ({id, title, content, checked, deadLine}) => (
        <TodoItem
          id={id}
          title={title}
          content={content}
          checked={checked}
          deadLine={deadLine}
          onToggle={onToggle}
          onRemove={onRemove}
          onUpdateMode={onUpdateMode}
          deadLineExceed={deadLine}
          onPriorChange={onPriorChange}
          key={id} // 배열 렌더링 할때는 key값이 반드시 필요
        />
      )
    )

    return (
      <div>      
        {todoList}    
      </div>
    )
  }
}

export default TodoItemList;