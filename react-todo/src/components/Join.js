import React, { Component } from 'react';

class Join extends Component{
    constructor(props){
        super(props)
        // this.state = {

        // }
    }

    handleJoin=()=>{
        console.log("handleJoin")
    }


    render(){
        return(
            <div className="join_form">
                <input className="user_name" placeholder="user_name"/>
                <input className="password" placeholder="password" />
                <div type="button" className="join-button" onClick={this.handleJoin}>
                작성
                </div>
            </div>
        );
    }
}

export default Join