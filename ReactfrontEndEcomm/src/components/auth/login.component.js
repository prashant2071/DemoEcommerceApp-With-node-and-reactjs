import  { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { handleError } from "./../../utilities/error.handler";
import Button from "../common/submitButton/submitButton.component";
import "./login.component.css";
import { notify } from "../../utilities/notify";
import {redirecttoDashBoard} from '../../utilities/util.user.token.redirect'
const base_url = process.env.REACT_APP_BASE_URL;







const defaultForm = {
  username: "",
  password: "",
};


export class Login extends Component {
  constructor(props) {
    console.log(base_url);
    console.log(" the component is always at first");
    super(props);
    this.state = {
      data: {
        ...defaultForm,
      },
      error: {
        ...defaultForm,
      },
      isSubmitting: false,
      isValidForm: false,
      remember_me: false,
    };
  }

  validateForm = (type, feildName) => {
    // const { error } = this.state;

    if (type === "submit") {
      let usernameErr;
      let passwordErr;
      let isValidForm = true;

      if (!this.state.data.username) {
        usernameErr = "require feild*";
        isValidForm = false;
      }
      if (!this.state.data.password) {
        passwordErr = "require feild*";
        isValidForm = false;
      }
      this.setState({
        error: {
          username: usernameErr,
          password: passwordErr,
        },
      });
      return isValidForm;
    }

    let errMsg = this.state.data[feildName] ? "" : "required feild*";

    this.setState((prevState) => ({
      error: {
        ...prevState.error,
        [feildName]: errMsg,
      },
    }));

    //   console.log("the error are :", error);

    // let errors = Object
    // .values(this.state.error)
    // .filter((err) => err);

    //   // console.log("errors is >>", error);
    //   // console.log('the length is >>',errors.length)
    //   var validForm=errors.length===0

    // return validForm
  };

  submitForm = (e) => {
    e.preventDefault();
    // notify.showSuccess('logging in progress')
    const isValidForm = this.validateForm("submit");
    if (!isValidForm) return;
    this.setState({
      isSubmitting: true,
    });
    // setInterval aafai Interval ma run vai rako hunxa

    axios
      .post(`${base_url}/auth/login`, this.state.data, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {},
        timeout: 10000,
        responseType: "json",
        timeoutErrorMessage: "server unreachable",
      })
      .then((response) => {
        console.log("respose >>>", response);
        localStorage.setItem('token',response.data.token);
        localStorage.setItem('user',JSON.stringify(response.data.user))
        localStorage.setItem('remember_me',this.state.remember_me)
        notify.showSuccess(`welcome ${response.data.user.firstName}`);
        // this.props.history.push("/dashboard");
        redirecttoDashBoard(this.props.history)
      })
      .catch(err => {
        handleError(err);
        this.setState({
          isSubmitting: false,
        });
      });
    // this.abcd=setInterval(() => {
    //   notify.showSuccess('login successfully')
    //    //If Incase of setInterval
    //   //once we have response from we put it to local storage
    //   //json.stringfy it convert the json object into string
    //   localStorage.setItem("remember_me", JSON.stringify(this.state.remember_me));
    //   this.props.history.push({
    //     pathname: "/dashboard",
    //     state: {
    //       name: "prashant",
    //     },
    //   });
    // }, 1500);
  };

  handleChange = (e) => {
    var { name, value, checked } = e.target;
    console.log("the name is", name);
    console.log("the value is ", value);
    // if(type==='checkbox')
    if (name === "remember_me") {
      return this.setState({
        [name]: checked, //checked le booolean return garxa
      });
    }
    this.setState(
      (prevState) => ({
        data: {
          ...prevState.data,
          [name]: value,
        },
      }),
      () => {
        console.log("once the state is modified", this.state.error);
        this.validateForm("change", name);
      }
    );
  };

  componentDidMount() {
    console.log("this will render at third");
    console.log("the props is >>", this.props);
    var isRememberme = JSON.parse(localStorage.getItem("remember_me"));
    console.log("the remember me value>>>", typeof isRememberme);
    if (isRememberme) {
      this.props.history.push("/dashboard");
    }
    //   let i=0
    //  this.abcd= setInterval(() => {
    //     i++;
    //     this.setState({
    //       count:i
    //     })

    //   },1000);
    //   console.log('this count is :',this.state.count)
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log('prev state count ',prevState.count)
    // console.log('once updated! ',this.state.count)
  }
  componentWillUnmount() {
    clearInterval(this.abcd);
    // console.log('Component Destroyed !!')
  }

  render() {
    console.log("this will render at second");
    // const button=this.state.isSubmitting? 'logging in': 'login'
    return (
      <div className="authbox">
        <h2>Login</h2>
        <p>please login to start</p>
        <form className="form-group" onSubmit={this.submitForm}>
          <label htmlFor="username">Username</label>
          <input
            className="input"
            type="text"
            name="username"
            placeholder="Enter Username"
            id="username"
            onChange={this.handleChange}
          />
          <p className="error">{this.state.error.username}</p>
          <label htmlFor="password">Password</label>
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Enter Password"
            id="password"
            onChange={this.handleChange}
          ></input>
          <p className="error">{this.state.error.password}</p>
          <input
            type="checkbox"
            name="remember_me"
            onChange={this.handleChange}
          ></input>
          <label> &nbsp;Remember me</label>
          <br></br>
          <br></br>
          <Button
            isSubmitting={this.state.isSubmitting}
            enableLabel="login"
            disabledLabel="logging in.."
          />
        </form>
        <p>don't have an account?</p>
        <p className="floatleft">
          Register <Link to="/register">here</Link>
        </p>
        <p className="floatright">
          <Link to="/forgetpassword">Forget password</Link>
        </p>
      </div>
    );
  }
}
