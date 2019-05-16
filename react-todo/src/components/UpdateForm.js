import React, { Component } from 'react';
import './Form.css';


class  UpdateForm extends Component{

  render(){
    const {title, content, onChange, onUpdate} = this.props

    return (
      <div className="updateForm">
        <input className="put_title" value={title} onChange={onChange}/>

        <textarea className="put_content" value={content} onChange={onChange} />

        <div className="update-button" onClick={onUpdate}>
          반영
        </div>
      </div>
    );
  }
};

export default UpdateForm;