import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import axios from 'axios';

import Login from './Login';
import { config } from './Config'

class Register extends Component {
    constructor(props){
    super(props);
        this.state={
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            phoneNo:'',
            panNo:'',
            pincode:'',
			otp: '',
            transactionId: '',
            showOtp: false,
            showMessage: false,
			showSubmit: true,
        }
        this.handleClick = this.handleClick.bind(this);
    }

    generateOtp(event) {
        this.setState({
						showOtp: true,
						showSubmit: false})
        var apiBaseUrl = config.baseUrl,
            params = {"phone_no": this.state.phoneNo};

        axios.post(apiBaseUrl + 'otp/generate', params)
         .then(function (response) {
             console.log(response)
            if(response.data.code === 200){

                this.setState({showMessage: response.data.message})
            }
         })
         .catch(function (error) {
             console.log(error);
         });
    }

    updateTransactionId = (transationId) => {
    }

    handleClick = (event) => {
        var apiBaseUrl = config.baseUrl;
		var payload = {
			"phone_no": this.state.phoneNo,
			"otp": this.state.otp
		}
        axios.post(apiBaseUrl + 'otp/verify', payload)
         .then(function (response) {
                debugger;
            if(response.data.message === "OTP verified successfully."){
                this.setState({
                                transactionId: response.data.transation_id,
                                showOtp: false,
                                showRegister: true})
                    }
         })
         .catch(function (error) {
             console.log(error);
         });
    }
	
	handleRegister(event) { 
        var apiBaseUrl = config.baseUrl;
        //To be done:check for empty values before hitting submit
        var self = this;
        var payload={
            "first_name": this.state.first_name,
            "last_name": this.state.last_name,
            "email": this.state.email,
            "password": this.state.password,
            "pincode": this.state.pincode,
            "pan_no": this.state.panNo,
            "phone_no": this.state.phoneNo,
            "transaction_id": this.state.transactionId
        }
        axios.post(apiBaseUrl + 'register', payload)
         .then(function (response) {
            if(response.data.code === 200){
                var loginscreen=[];
                loginscreen.push(<Login parentContext={this}/>);
                var loginmessage = "Not Registered yet.Go to registration";
                self.props.parentContext.setState({loginscreen:loginscreen,
                    loginmessage:loginmessage,
                    buttonLabel:"Register",
                    isLogin:true
                });
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
             title="Register"
             showMenuIconButton={false}
           />
           <TextField
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             onChange = {(event,newValue) => this.setState({firstName:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Last Name"
             floatingLabelText="Last Name"
             onChange = {(event,newValue) => this.setState({lastName:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Email"
             type="email"
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Phone number"
             floatingLabelText="Phone no"
             onChange = {(event,newValue) => this.setState({phoneNo:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Pan number"
             floatingLabelText="Pan no"
             onChange = {(event,newValue) => this.setState({panNo:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your pin code"
             floatingLabelText="Pin code"
             onChange = {(event,newValue) => this.setState({pincode:newValue})}
             />
           <br/>
		   { this.state.showSubmit ?
			   <RaisedButton label="Submit"
							 primary={true}
							 style={style}
							 onClick={(event) => this.generateOtp(event)}/>
			: null}
          </div>
          {this.state.showOtp ?
              <div>
                   <TextField
                     hintText="Enter your pin code"
                     floatingLabelText="Enter the OTP"
                     onChange = {(event,newValue) => this.setState({otp:newValue})}
                     />
                   <br/>
                   <RaisedButton label="Submit OTP"
                                 primary={true}
                                 style={style}
                                 onClick={(event) => this.handleClick(event)}/>
              </div> : null
          }
          { this.state.showMessage ?
				<Snackbar
					bodyStyle={{ backgroundColor: 'green' }} 
          			anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					  }}
					  open={true}
					  autoHideDuration={1000}
					  message={<span id="message-id">OTP Sent to given number</span>}
				/> : null }
		  { this.state.showRegister ?
              <div>
                   <RaisedButton label="Submit OTP"
                                 primary={true}
                                 style={style}
                                 onClick={(event) => this.handleRegister(event)}/>
              </div> : null
}

         </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Register;
