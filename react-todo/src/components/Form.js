import React, { Component } from 'react';
import './Form.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class Form extends Component{
  constructor(props){
    super(props)
    this.state = {
      deadLine: new Date()
    }
  }

  // 입력 받은 deadLine을 보여주고 상위 컴포넌트인 App으로 deadLine을 넘긴다
  handleDateChange = (date) =>{ 
    this.setState({
        deadLine: date
    })
    this.props.callbackFromTodoList(date, 'Form')
  }

  // props로 받은 onCreate를 부르고, 입력 폼의 deadLine을 초기화한다
  handleCreate = () =>{ 
    this.props.onCreate()
    this.setState({
      deadLine: null
    })
  }

  // props로 받은 onDeadline에 현재 컴포넌트가 'Form'임을 넘겨준다
  handleDeadLineOn = () =>{
    this.props.onDeadline('Form')
  }

  render(){
    const {title, content, onChange, deadLineCheck, } = this.props;
    
    return (
      <div className="form">
        <input className="input_title" placeholder="title" value={title} onChange={onChange}/>

        <textarea className="input_content" placeholder="content" value={content} onChange={onChange} />

        <div>
          {deadLineCheck &&
            <DatePicker
              selected={this.state.deadLine}
              onChange={this.handleDateChange}
            />
          }
        </div>

        <div className="create-button" onClick={this.handleCreate}>
          작성
        </div>
        
        <p>마감 기한
          <input type="checkbox" checked={deadLineCheck} className="deadline_checkbox-create" onChange={this.handleDeadLineOn}></input>
        </p>
      </div>
    );
  }
};

export default Form;