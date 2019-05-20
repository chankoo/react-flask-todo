import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import * as util from '../utils';
import './Join.css';

class Join extends Component{
    constructor(props){
        super(props)
        this.state = {
            input_userName:'',
            input_pwd:''
        }
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.className]: e.target.value 
        })
    }

    handleJoin=()=>{
        console.log("handleJoin")
        const {input_userName, input_pwd} = this.state
        fetch('http://0.0.0.0:5001/users/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: input_userName,
                password: input_pwd,
            })
        })
        .then(util.handleResponse)
        .then(response => {return JSON.parse(response)})
        .then(()=>{ // 전송이 끝나면 입력 폼을 초기화한다
            this.setState({
                input_userName:'',
                input_pwd:''
            })
            alert("가입되었습니다")
        })
        // .then(()=>{<Redirect to="/"/>})
        .catch(error => {
            alert("실패했습니다")
            console.log(error)
        })
    }

    handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            this.handleJoin()
        }
    }

    render(){
        const {handleJoin, handleChange, handleKeyPress} = this
        return(
            <div className="join_form" onKeyPress={handleKeyPress}>
                <input className="input_userName" placeholder="user_name" onChange={handleChange}/>
                <input className="input_pwd" placeholder="password" onChange={handleChange} />
                <div type="button" className="join-button" onClick={handleJoin}>Join</div>
            </div>
        )
    }
}

export default Join