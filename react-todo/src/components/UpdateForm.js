import React, { Component } from 'react';
import './Form.css';


class  UpdateForm extends Component{ 

  handleKeyPress = (e) => {
    // 눌려진 키가 Enter 면 handleUpdate 호출
    if(e.key === 'Enter') {
      this.handleUpdate();
    }
  }

  handleUpdate = () => {
    const {put_id, title, content} = this.props;
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
      });
    }
    
    fetch('http://0.0.0.0:5000/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id:put_id,
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
  }

  render(){
    const {title, content, onChange} = this.props
    const {handleUpdate, handleKeyPress} = this;

    return (
      <div className="updateForm">
        <input className="put_title" value={title} onChange={onChange}/>

        <textarea className="put_content" value={content} onChange={onChange} onKeyPress={handleKeyPress}/>

        <div className="update-button" onClick={handleUpdate}>
          반영
        </div>
      </div>
    );
  }
};

export default UpdateForm;