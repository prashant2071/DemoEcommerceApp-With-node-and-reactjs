import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "../common/submitButton/submitButton.component";
import {httpClient} from "./../../utilities/httpClient/httpClient"
import { handleError} from "./../../utilities/error.handler";
import { notify } from "../../utilities/notify";

export class ForgetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      emailErr: "",
      isSubmitting:false,
      isValid:false
    };
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      isValid:false
    })
    this.setState(prevState=>(
      {
          ...prevState,
        [name]: value
      }),
      () =>{ this.ValidateForm(name)}

    )};
  ValidateForm = (feildName) =>{
    let errMsg;
         errMsg=this.state.email
        ?this.state.email.includes('@') && this.state.email.includes('.com')
        ?''
        :'invalid Email format'
        :'required feild'
    console.log('errmessage is',errMsg)

      this.setState((prevState) =>({
          ...prevState,
          emailErr:errMsg,

      }),()=>{
          if(!this.state.emailErr){
 this.setState({
            isValid:true
          })}
      })

  }
  handleSubmit = (e) => {
        e.preventDefault();
        console.log('hello error')

        this.setState({
            isSubmitting:true
        })
        const { email } = this.state;
        httpClient.POST('/auth/forgot_password', { email })
      .then(response =>{
          notify.showInfo('please check your email')
          this.props.history.push('/')

      })
      .catch(err => {
        handleError(err);
        this.setState({
          isSubmitting: false,
        });
      });

  };

  render() {
    const { isSubmitting,isValid} = this.state;
    return (
      <div>
        <h1>ForgetPassword</h1>
        <p>Please enter email to reset your password</p>
        <form className="form-group" onSubmit={this.handleSubmit}>
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            name="email"
            onChange={this.handleChange}
          ></input>
          <p className="error">{this.state.emailErr}</p>
          <Button 
          isSubmitting={isSubmitting}
          isDisabled={!isValid}
          ></Button>
        </form>

        <p>Back to <Link to ='/'>Login</Link></p>
      </div>
    );
  }
}
