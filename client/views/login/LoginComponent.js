import React from 'react';
import 'skeleton-css-webpack';

var loginFormStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};

var loginButtonStyle = {
    width: '100px'
}

var containerStyle = {
    
}

class LoginComponent extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <form style={loginFormStyle} className="offset-by-three six columns">
                        <label for="emailInput">Email</label>
                        <input id="emailInput" type="email" className=""/>
                        <label for="passwordInput">Password</label>
                        <input id="passwordInput" type="password" className=""/>
                        <button type="submit" style={loginButtonStyle} className="button-primary">Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginComponent
