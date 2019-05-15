import React, { Component } from 'react';
import './Form.css';


class Form extends Component{

  handleKeyPress = (e) => {
    // 눌려진 키가 Enter 면 handleCreate 호출
    if(e.key === 'Enter') {
      this.handleCreate();
    }
  }

  handleCreate = () => {
    const {next_id, title, content} = this.props;
    const handleResponse = response => {
      return response.text().then(text => {
        const data = text && JSON.parse(text)
        if (!response.ok) {
          if (response.status === 401) {
            // auto logout if 401 response returned from api
            return Promise.reject(response)
          }
          const error = (data && data.message) || response.statusText
          return Promise.reject(error)
        }
        return data
      })
    };

    fetch('http://0.0.0.0:5000/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: next_id,
        title: title,
        content:content
      })
    })
      .then(handleResponse)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        })
    window.location.reload();
  };

  render(){
    const {title, content, onChange} = this.props;
    const {handleCreate, handleKeyPress} = this;

    return (
      <div className="form">
        <input className="input_title" placeholder="title" value={title} onChange={onChange}/>

        <textarea className="input_content" placeholder="content" value={content} onChange={onChange} onKeyPress={handleKeyPress}/>

        <div className="create-button" onClick={handleCreate}>
          작성
        </div>
      </div>
    );
  }
};

export default Form;