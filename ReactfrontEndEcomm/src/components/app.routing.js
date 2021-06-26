import React from 'react';
import {BrowserRouter ,Route, Switch,Redirect} from 'react-router-dom'
import { Login } from './auth/login.component';
import { Register } from './auth/register.component';
import { Header } from './common/header/header.component';
import { Sidebar } from './common/sidebar/sidebar.component';
import './auth/login.component.css'
import { AddProduct } from './products/Addproducts/addproduct.component';
import { ViewProduct } from './products/ViewProducts/viewproduct.component';
import { EditProduct } from './products/editProduct/editproduct.component';
// import { ProductDetails } from './products/productDetails/productDetails.component';
import { SearchProduct } from './products/SearchProducts/searchproduct.component';
import { ForgetPassword } from './auth/forgetPassword.component';
import { ResetPassword } from './auth/resetPassword/resetpassword.component';
import { Messages } from './users/messages/message.component';
import ProductDetailsLanding from './products/productDetails/productDetailsLanding.component';

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
  return(<div  className="box">
    <h2>Welcome to {name}</h2>
    <p>please use side navigation or contact system administrator</p>
  </div>)
}; 

const About = (props) => {
  return <div>About Page </div>;
}; 
const Services = (props) => {
  return <div>Services</div>;
}; 
const Contact = (props) => {
  return <div>Contact Page</div>;
}; 
const Setting = (props) => {
  console.log('props in setting >>',props)
  return <div className="box">Setting page</div>;
}; 
const NotFound = (props) =>{
   console.log('the props in not found',props);
   return (
     <div className="box">
       <p>Not Found</p>
       <img
         src="./images/pagenotfound.png"
         className="img-fluid img-thumbnail"
         alt="page not found"
         height="500px"
         width="500px"
       ></img>
     </div>
   );
} 
const ProtectedRoute = ({component:Component ,...rest}) =>{
 return (<Route {...rest} render={(routeProps)=>{
  return localStorage.getItem('token')
  ?<div>
    <Header isLoggedIn={true}></Header>
    <Sidebar></Sidebar>
    {/* Component vaneko sano component {...router} ma histroy match location aauxa */}
    <div className="box">
    <Component {...routeProps}></Component>
    </div>
  </div>
  :<Redirect to='/' ></Redirect>
}}
></Route>)
}
const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        return (
          <div>
            <Header
              isLoggedIn={localStorage.getItem("token") ? true : false}
            ></Header>
            {/*  this will handle all the classes "box" component classes */}
            <div className="box">
              <Component {...routeProps}></Component>
            </div>
          </div>
        ); 
      }}
    ></Route>
  );
};
const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        return (
          <div>
            <Header
              isLoggedIn={false}
            ></Header>
            {/*  this will handle all the classes "box" component classes */}
            <div className="box">
              <Component {...routeProps}></Component>
            </div>
          </div>
        );
      }}
    ></Route>
  );
};



const  AppRouting= ()=> {

    return (
      <div>
        <BrowserRouter>
          <Switch>
            <AuthRoute path="/" exact component={Login}></AuthRoute>
            <AuthRoute path="/forget_password"  component={ForgetPassword}></AuthRoute>
            <AuthRoute path="/reset_password/:token"  component={ResetPassword}></AuthRoute>

            <AuthRoute path="/register" component={Register}></AuthRoute>
            <PublicRoute path="/home" component={Home}></PublicRoute>
            <ProtectedRoute
              path="/dashboard"
              component={Dashboard}
            ></ProtectedRoute>
            <PublicRoute path="/about" component={About}></PublicRoute>
            <PublicRoute
              path="/setting/:name"
              component={Setting}
            ></PublicRoute>
            <PublicRoute path="/services" component={Services}></PublicRoute>
            <PublicRoute path="/contact" component={Contact}></PublicRoute>
            <ProtectedRoute
              path="/productDetails/:id"
              component={ProductDetailsLanding}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/add_product"
              component={AddProduct}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/view_product"
              component={ViewProduct}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/edit_products/:id"
              component={EditProduct}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/search_product"
              component={SearchProduct}
            ></ProtectedRoute>
               <ProtectedRoute
              path="/message"
              component={Messages}
            ></ProtectedRoute>

            {/* <ProtectedRoute path="/product_Details/:id" component={NotFound}></ProtectedRoute> */}
            <PublicRoute component={NotFound}></PublicRoute>
          </Switch>
        </BrowserRouter>
      </div>
    );
}
export default AppRouting
