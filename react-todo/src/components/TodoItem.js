import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps;
  }
  
  render() {
    const { title, content, checked, id, onToggle, onRemove, onUpdateMode } = this.props;
    return (
      <div className="todo-item" onClick={() => onToggle(id)}>
        <div className="remove" onClick={(e) => {
          e.stopPropagation(); // 부모의 이벤트인 onToggle 이 실행되지 않도록 함
          onRemove(id)}
        }>&times;</div>
        <div className={`todo-text ${ checked ? ' checked' : '' }`}>
          <div>{title}</div>
          <div>{content}</div>
        </div>
        {
          !checked && (
          <div className="update-button" onClick={(e) => {
            e.stopPropagation();
            onUpdateMode(id)}
          }>
            수정
          </div>)
        }
        {
          checked && (<div className="check-mark">&#x2713;</div>) //checked True일때 check-mark 보여줌
        }
      </div>
    );
  }
}

export default TodoItem;