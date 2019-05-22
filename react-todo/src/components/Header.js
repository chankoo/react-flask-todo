import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import * as util from '../utils';


class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            input_userName:'',
            input_pwd:'',
            has_token: props.has_token,
            token: props.token,
            userName: props.userName
        }
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.className]: e.target.value 
        })
    }
    
    handleLogin=()=>{
        const {input_userName, input_pwd} = this.state
        const {callbackFromApp} = this.props

        fetch('http://52.79.191.15:5001/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: input_userName,
                password: input_pwd,
            })
        })
        .then(util.handleResponse)
        .then(response=>{return JSON.parse(response)})
        .then(response=>{
            this.setState({
                token: response.token, 
                userName: response.name,
                has_token: true
            })
            callbackFromApp(response.token ,response.name, true) // 토큰과 현재 상태를 상위 컴포넌트인 App으로 넘겨준다
        })
        .then(()=>{ // 전송이 끝나면 입력 폼을 초기화한다
            this.setState({
                input_userName:'',
                input_pwd:''
            })
        })
        .then(()=>{
            // ()=>{<Redirect to="/" push/>}
        }
        )
        .catch(error => {
            alert("로그인에 실패했습니다")
            // console.log(error)
        })
    }

    handleLogout=()=>{
        const {callbackFromApp} = this.props
        this.setState({
            token: null, 
            userName: null,
            has_token: false
        })
        callbackFromApp(null, null, false)
    }

    render() {
        const {has_token, userName} = this.state
        const {handleChange, handleLogin, handleLogout} = this
        
        return (
            <div className="header">
                <div className="header-table">
                    <div className="header-table-item">
                        <Link  to="/join">회원가입</Link>
                    </div>
                    <div className="header-table-item">
                        <Link to="/todos">Todos</Link>
                    </div>
                </div>
                <section className="login">
                    {!has_token 
                    &&
                    <div className="logouted">
                        <input className="input_userName" placeholder="user_name" onChange={handleChange}/>
                        <input className="input_pwd" placeholder="password" onChange={handleChange}/>
                        <div type="button" className="login-button" onClick={handleLogin}>
                            Login
                        </div>
                    </div>
                    }
                    {has_token 
                    && 
                    <div className="logged">
                        <div type="button" className="logout-button" onClick={handleLogout}>
                            Logout
                        </div>
                        <div type="button" className="user_status" >
                            {userName} 님
                        </div>
                    </div>
                    }
                </section>
            </div>
            
        );
    }
}

export default Header;
