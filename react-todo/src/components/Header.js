import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div>
                <Link to="/join">회원가입</Link>
                <Link to="/">Todo List</Link>
                <Link to="/login">로그인</Link>
            </div>
        );
    }
}

export default Header;
