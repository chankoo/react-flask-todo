import React, { Component } from 'react';
import './Form.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class  UpdateForm extends Component{
  constructor(props){
    super(props)
    const date_obj = (this.props.put_deadLine === null ?  new Date() : new Date(this.props.put_deadLine))
    this.state = {
      deadLine: date_obj
    }
  }

  // 입력 받은 deadLine을 보여주고 상위 컴포넌트인 App으로 deadLine을 넘긴다
  handleDateChange = (date) =>{ 
    this.setState({
        deadLine: date
    })
    this.props.callbackFromTodoList(date, 'UpdateForm')
  }

  // props로 받은 onCreate를 부르고, 입력 폼의 deadLine을 초기화한다
  handleUpdate = () =>{ 
    this.props.onUpdate()
    this.setState({
      deadLine: null
    })
  }

  // props로 받은 onDeadline에 현재 컴포넌트가 'UpdateForm'임을 넘겨준다
  handleDeadLineOn = () =>{
    this.props.onDeadline('UpdateForm')
  }

  render(){
    const {title, content, onChange, onUpdate
      , put_deadLineCheck} = this.props

    return (
      <div className="updateForm">
        <input className="put_title" placeholder="title" value={title} onChange={onChange}/>

        <textarea className="put_content" placeholder="content" value={content} onChange={onChange} />

        <div>
          {put_deadLineCheck &&
            <DatePicker
              selected={this.state.deadLine}
              onChange={this.handleDateChange}
            />
          }
        </div>

        <div className="update-button" onClick={onUpdate}>
          반영
        </div>

        <p>마감 기한
          <input type="checkbox" checked={put_deadLineCheck} className="deadline_checkbox-update" onChange={this.handleDeadLineOn}></input>
        </p>
      </div>
    );
  }
};

export default UpdateForm;