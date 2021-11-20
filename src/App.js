import './App.css';
import React, { createContext ,useReducer } from 'react';
import Home from './compnent/Home';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css'
import { initialState,reducer } from './reducer/useReducer';
import 'react-toastify/dist/ReactToastify.css';

const UserContext= createContext()

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  // hi
  return (
    <>
    <UserContext.Provider value={{state,dispatch}}>
      <Router>
       <Switch>
         <Route path="/" exact component={Home} />
       </Switch>
       </Router>
       </UserContext.Provider>
     
    </>
  );
}

export default App;
export {UserContext}
