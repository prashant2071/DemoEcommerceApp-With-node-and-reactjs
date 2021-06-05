import React from 'react';
import {BrowserRouter ,Route, Switch} from 'react-router-dom'
import { Login } from './auth/login.component';
import { Register } from './auth/register.component';
import { Header } from './common/header/header.component';

const Home =(props) =>{
  console.log('histroy sangai data')
  console.log('props in home',props)

    return(
        <div>Home Page</div>
    )
} 
const Dashboard = (props) => {
  console.log("props in Dahboard", props);
  const name=process.env.REACT_APP_APP_NAME;
  return(<div>
    <h2>Welcome to {name}</h2>
    <p>please use side navigation or contact system administrator</p>
  </div>)
}; 

const About = (props) => {
  return (<div>About Page </div>);
}; 
const Services = (props) => {
  return (<div>Services</div>);
}; 
const Contact = (props) => {
  return (<div>Contact Page</div>);
}; 
const Setting = (props) => {
  console.log('props in setting >>',props)
  return (<div>
      Setting page
  </div>);
}; 
const NotFound = (props) =>{
   console.log('the props in not found',props);
   return (
     <div>
       <p>Not Found</p>
       <img
         src="./images/pagenotfound.png"
         className="img-fluid img-thumbnail"
         alt="page not found"
         heigth="400px"
         width="1000px"
       ></img>
     </div>
   );
} 



const  AppRouting= ()=> {

    return (
      <div>
        <BrowserRouter>
          <Header isLoggedIn={false} />
          <Switch>
            <Route path="/" exact component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/home" component={Home}></Route>
            <Route path="/dashboard" component={Dashboard}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/setting/:name" component={Setting}></Route>
            <Route path="/services" component={Services}></Route>
            <Route path="/contact" component={Contact}></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
}
export default AppRouting
