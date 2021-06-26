import  React  from 'react';
import AppRouting from './app.routing';
import  {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
//join react app with redux
import {Provider} from 'react-redux'
import { store } from '../store';
//provider provide redux to react application 
//it provides store only under <Provider></Provider> scope 





const App=(props)=>{
return (
  <>
  <Provider store={store}>   
    <ToastContainer></ToastContainer>
    <AppRouting/>
    </Provider>
  </>
);
}
export default App;