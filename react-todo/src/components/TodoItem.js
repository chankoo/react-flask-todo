import React, { Component } from 'react'
import * as util from './../utils'
import './TodoItem.css'
import {Icon} from 'antd'


class TodoItem extends Component {

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.props !== nextProps;
  // }

  
  render() {
    const { title, content, checked, id, deadLine, onToggle, onRemove, onUpdateMode, onIdxChange } = this.props;
    return (
      <div className="todo-item" onClick={() => onToggle(id)}>
        <div className="remove" onClick={(e) => {
          e.stopPropagation(); // 부모의 이벤트인 onToggle 이 실행되지 않도록 함
          onRemove(id)}
        }>&times;</div>
        <div className={`todo-text ${ checked ? ' checked' : '' }`}>
          <div>{title}</div>
          <div>{content}</div>
          <div>마감: {deadLine}</div>
        </div>
        
        {(deadLine < util.getNowStrDate()) && <div><Icon type="hourglass" /></div>}
        {
          !checked && 
          <div>  
            <div className="update-button" onClick={(e) => {
              e.stopPropagation();
              onUpdateMode(id)}
            }>
              수정            
            </div>
            <div>
              <div><Icon type="caret-up" onClick={(e) => {
                e.stopPropagation()
                onIdxChange(id, 'up')
              }}/></div>
              <div><Icon type="caret-down" onClick={(e)=>{
                e.stopPropagation()
                onIdxChange(id, 'down')
              }}/></div>
            </div>
          </div>
        }
        {
          checked && (<div className="check-mark">&#x2713;</div>) //checked True일때 check-mark 보여줌
        }
      </div>
    );
  }
}

export default TodoItem;