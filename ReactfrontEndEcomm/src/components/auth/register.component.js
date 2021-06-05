import { Component } from "react";
import Button from "../common/submitButton/submitButton.component";
import {Link} from 'react-router-dom'
import { httpClient } from "../../utilities/httpClient/httpClient";
import { notify } from "../../utilities/notify";
import { handleError } from "../../utilities/error.handler";

const defaultForm = {
  username: "",
  password: "",
  confirmpassword: "",
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  temporaryAddress: "",
  dob: "",
  mobileNumber:""
};
export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data:{
        ...defaultForm
      },
      error:{
        ...defaultForm
      },
      isSubmitting: false,
      isValidForm: false,
    };
  }


  handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name is >> ", name);
    console.log("value is >> ", value);

    this.setState((prevState) => ({
      data:{
        ...prevState.data,
        [name]:value
      }
    }),
    ()=>{
      console.log(this.state.data)
      this.validateForm('',name) //yo callback moi lagaunu purxa asynchronous natra late data dinxa
      
    }
    )
  };


  validateForm = (type,feildName) =>{
    let errMsg


    switch (feildName) {
      case "username":
        errMsg = this.state.data[feildName]
          ? this.state.data[feildName].length > 5
            ? ""
            : "username must be 5 characters long"
          : "required field *";
        break;
      case 'password':
        errMsg = this.state.data[feildName]
          ? this.state.data["confirmpassword"]
            ? this.state.data[feildName] === this.state.data["confirmpassword"]
              ? ""
              : "password did not match"
            : this.state.data[feildName].length > 5
            ? ""
            : `${feildName} must be greter then 5`
          : `${feildName} required*`;
        break;
      case "confirmpassword":
          errMsg=this.state.data[feildName]
          // ?this.state.data[feildName]==this.state.data['password']
          ?this.state.data['password']
          ?this.state.data[feildName]===this.state.data['password']
          ?''
          :'password did not match'
          :this.state.data[feildName].length>5
          ?''
          :'password length must be greater then 5'
          :'required feild*'
        break;
        case 'email':
        errMsg=this.state.data[feildName]
        ?this.state.data[feildName].includes('@') && this.state.data[feildName].includes('.com') && this.state.data[feildName].length>10
        ?''
        :'invalid Email format'
        :'required feild'
        break;
      default:
        break;
    }
         if (type === "submit") {
           let usernameErr;
           let passwordErr;
           let emailErr;
           let dobErr;
           let isValidForm = true;

           if (!this.state.data.username) {
             usernameErr = "require feild*";
             isValidForm = false;
           }
           if (!this.state.data.password) {
             passwordErr = "require feild*";
             isValidForm = false;
           }
           if (!this.state.data.email) {
             emailErr = "require feild*";
             isValidForm = false;
           }
           if (!this.state.data.dob) {
             dobErr = "require feild*";
             isValidForm = false;
           }
           this.setState({
             error: {
               username: usernameErr,
               password: passwordErr,
               email: emailErr,
               dob: dobErr,
             },
           });
           return isValidForm;
         }

    this.setState(prevState => ({
      error:{
          ...prevState.error,
          [feildName]:errMsg
      }
    }),()=>{
      let errors=Object
      .values(this.state.error)
      .filter(err=>err)
      console.log('error length',errors)
      this.setState({
       isValidForm:errors.length===0
      })
      

    })

  }


  handleSubmit = (e) => {
    e.preventDefault();
    console.log("this props>> ", this.state.data);
    if(this.validateForm('submit'))
    
    this.setState({
      isSubmitting: true,
    });


      httpClient.POST('auth/register',this.state.data)
      .then(response =>{
        notify.showSuccess('registration successful please login')
        this.props.history.push('/')
      })
      .catch(err=>{
        handleError(err)
        this.setState({
          isSubmitting:false
        })
      })

  //   setTimeout(() => {
  //     this.setState({
  //       isSubmitting: false,
  //     });
  //   }, 3000);
  };

  render() {
    // let button = this.state.isSubmitting ? (
    //   <button type="submit" className="btn btn-primary" disabled>
    //     submitting..
    //   </button>
    // ) : (
    //   <button type="submit" className="btn btn-primary">
    //     submit
    //   </button>
    // );
    return (
      <div>
        <h2>Register</h2>
        <p>please register to continue</p>
        <form className="form-group" onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            className="form-control"
            type="text"
            placeholder="Username"
            name="username"
            id="username"
            onChange={this.handleChange}
          />
          <p className="error">{this.state.error.username}</p>
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            onChange={this.handleChange}
          />
          <p className="error">{this.state.error.password}</p>
          <label htmlFor="confirmpassword">confirmpassword</label>
          <input
            className="form-control"
            type="password"
            placeholder="confirmpassword"
            name="confirmpassword"
            id="confirmpassword"
            onChange={this.handleChange}
          />
          <p className="error">{this.state.error.confirmpassword}</p>
          <label htmlFor="firstName">FirstName</label>
          <input
            className="form-control"
            type="text"
            placeholder="FirstName"
            name="firstName"
            id="firstName"
            onChange={this.handleChange}
          />
          <p className="error">{this.state.error.firstName}</p>
          <label htmlFor="lastName">lastName</label>
          <input
            className="form-control"
            type="text"
            placeholder="lastName"
            name="lastName"
            id="lastName"
            onChange={this.handleChange}
          />
          <p className="error">{this.state.error.lastName}</p>
          <label htmlFor="temporaryAddress">temporaryAddress</label>
          <input
            className="form-control"
            type="text"
            placeholder="temporaryAddress"
            name="temporaryAddress"
            id="temporaryAddress"
            onChange={this.handleChange}
          />
          <p className="error">{this.state.error.temporaryAddress}</p>
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            type="text"
            placeholder="Email"
            name="email"
            id="email"
            onChange={this.handleChange}
          />
          <p className="error">{this.state.error.email}</p>
          <label htmlFor="gender">gender</label>
          <br></br>
          <label htmlFor="other"> Male</label>
          &nbsp;&nbsp;
          <input
            name="gender"
            type="radio"
            value="male"
            onChange={this.handleChange}
          />
          <label htmlFor="female"> female</label>
          &nbsp;&nbsp;
          <input
            name="gender"
            type="radio"
            value="female"
            onChange={this.handleChange}
          />
          <label htmlFor="other"> other</label>
          &nbsp;&nbsp;
          <input
            name="gender"
            type="radio"
            value="other"
            onChange={this.handleChange}
          />
          <p className="error">{this.state.error.gender}</p>
          <label htmlFor="dob">Date Of Birth</label>
          <input
            className="form-control"
            type="date"
            placeholder="dob"
            name="dob"
            id="dob"
            onChange={this.handleChange}
          />
          <p className="error">{this.state.error.dob}</p>
          <label htmlFor="mobileNumber">mobileNumber</label>
          <input
            className="form-control"
            type="number"
            placeholder="98********"
            name="mobileNumber"
            id="mobileNumber"
            onChange={this.handleChange}
          />
          <p className="error">{this.state.error.mobileNumber}</p>
          <br></br>
          <Button
            isSubmitting={this.state.isSubmitting}
            isDisabled={!this.state.isValidForm}
            enableLable="register"
          />
        </form>
        <p>Aready Registered?</p>
        <p>
          {" "}
          Back to <Link to="/"> login</Link>
        </p>
      </div>
    );
  }
}
