import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "./../../common/submitButton/submitButton.component";
import {httpClient} from "./../../../utilities/httpClient/httpClient"
import { handleError} from "./../../../utilities/error.handler";
import { notify } from "../../../utilities/notify";

const defaultForm ={
    password:'',
    confirmPassword:''
}

export class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
        data:{
            ...defaultForm,
        },
        error:{
            ...defaultForm
        },      isSubmitting:false,
      isValid:false
    };
  }
  componentDidMount = () =>{
      this.token=this.props.match.params['token'] //
      console.log('props in resetcomponent',this.props)
      console.log('token is ',this.token)
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
        isValid:false
    })
    this.setState(prevState=>(
      {
          data:{
              ...prevState.data,
              [name]:value
          },
          error:{
              ...defaultForm,
              [name]:value
          }

      }),()=>{this.ValidateForm(name)}

    )};
  ValidateForm = (feildName) =>{
      const {data} =this.state
    let errMsg;
    switch (feildName){
        case 'password':
            errMsg = 
            data[feildName]
              ? data["confirmPassword"]
                ? data[feildName] === data["confirmPassword"]
                  ? ""
                  : "password did not match"
                : data[feildName].length > 5
                ? ""
                : `${feildName} must be greter then 5`
              : `${feildName} required*`;
            break;
          case "confirmPassword":
              errMsg=
              data[feildName]
              ?data['password']
              ?data[feildName]===data['password']
              ?''
              :'password did not match'
              :data[feildName].length>5
              ?''
              :'password length must be greater then 5'
              :'required feild*'
            break;

            default:
            break;
        
    }
    console.log('errmessage is',errMsg)

      this.setState((prevState) =>({
            error:{
                ...prevState.error,
                [feildName]:errMsg
            }

      }),()=>{

        let errors=Object.values(this.state.error).filter(err=>err)
        console.log(errors)
    
        
          if(errors.length===0){
 this.setState({
            isValid:true
          })}
      })
      console.log('only error',this.state.error)

  }
  handleSubmit = (e) => {
        e.preventDefault();

        this.setState({
            isSubmitting:true
        })
        const {password} =this.state.data
        httpClient.POST(`/auth/reset_password/${this.token}`, {password})
      .then(response =>{
          notify.showInfo('password reset successfully')
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
        <h1> Reset Password</h1>
        <p>Please enter new password and confirm password correctly</p>
        <form className="form-group" onSubmit={this.handleSubmit}>
          <label>New Password</label>
          <input
            type="text"
            className="form-control"
            name="password"
            onChange={this.handleChange}
          ></input>
          <p className="error">{this.state.error.password}</p>
          <label>Confirm Password</label>
          <input
            type="text"
            className="form-control"
            name="confirmPassword"
            onChange={this.handleChange}
          ></input>
          <p className="error">{this.state.error.confirmPassword}</p>
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
