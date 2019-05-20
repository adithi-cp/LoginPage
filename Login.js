import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { config } from './Config'

class Login extends Component {

    constructor(props){
        super(props);
        this.state={
            phoneNo:'',
            password:''
        }
    }

	handleClick(event){
		var self = this;
		var payload={
			"phoneNo":this.state.phoneNo,
			"password":this.state.password
		}
		axios.post(config.baseUrl+'authorization/generate', payload)
		.then(function (response) {
			console.log(response);
			if(response.data.code === 200){
				console.log("Login successfull");
				var uploadScreen=[];
				uploadScreen.push(<uploadScreen appContext={self.props.appContext}/>)
				self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
			}
			else if(response.data.code === 204){
				console.log("phoneno password do not match");
				alert("phoneno password do not match")
			}
			else{
				console.log("phoneno does not exists");
				alert("phoneno does not exist");
			}
		})
		.catch(function (error) {
			console.log(error);
		});
	}

    render() {

        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Login"
                            showMenuIconButton={false}
                         />
                         <TextField
                           hintText="Enter your phoneno"
                           floatingLabelText="phoneno"
                           onChange = {(event,newValue) => this.setState({phoneNo:newValue})}
                           />
                         <br/>
                           <TextField
                             type="password"
                             hintText="Enter your Password"
                             floatingLabelText="Password"
                             onChange = {(event,newValue) => this.setState({password:newValue})}
                             />
                           <br/>
                           <RaisedButton label="Submit"
                                         primary={true}
                                         style={style}
                                         onClick={(event) => this.handleClick(event)}/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
      }
}

const style = {
 margin: 15,
};

export default Login;
