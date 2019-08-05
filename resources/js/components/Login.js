import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import history from '../history';
import Navigation from './Navigation';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            accessToken: localStorage.getItem('access_token') || null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        //console.log(this.state);
        axios.post('/api/login',{
            username: this.state.username,
            password: this.state.password,
        }).then(response =>{
            const token = response.data.access_token;
            localStorage.setItem('access_token', token);
            this.setState({
                accessToken: token
            })
            this.props.history.push('/main');
            //console.log(response);
        }).catch(error =>{
            console.log(error);
        })
        //this.props.history.push('/main');
    }
    handleChange(e){
        this.setState({ [e.target.name]: e.target.value });
        //console.log(this.state);
    }
    render() {
        return (
            <div>
                <Navigation/>
                <form onSubmit={this.handleSubmit}>
                    
                    <h3>Log in</h3>
                    <input 
                        type="email" 
                        name="username" 
                        placeholder="enter your email" 
                        value={this.state.username}
                        onChange={this.handleChange}/>

                    <input 
                        type="password" 
                        name="password" 
                        placeholder="enter password" 
                        value={this.state.password}
                        onChange={this.handleChange}/>

                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}
export default Login;