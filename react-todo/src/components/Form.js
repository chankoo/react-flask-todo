import React, { Component } from 'react';
import './Form.css';


class Form extends Component{

  render(){
    const {title, content, onChange, onCreate} = this.props;

    return (
      <div className="form">
        <input className="input_title" placeholder="title" value={title} onChange={onChange}/>

        <textarea className="input_content" placeholder="content" value={content} onChange={onChange} />

        <div className="create-button" onClick={onCreate}>
          작성
        </div>
      </div>
    );
  }
};

export default Form;