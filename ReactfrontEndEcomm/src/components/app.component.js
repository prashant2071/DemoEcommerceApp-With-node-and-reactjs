import  React  from 'react';
import AppRouting from './app.routing';
import  {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



const App=(props)=>{
    console.log(props)
return (
  <>
    <ToastContainer></ToastContainer>
    <AppRouting/>
  </>
);
}
export default App;