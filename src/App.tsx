import React, { useReducer } from 'react';
import routes from './routes'
import reducer from './context/auth/reducer'
import HeaderComp from './components/HeaderComp';

import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css';
import { DUserContext } from './interfaces/auth/context';
import { AuthContextProvider } from './context/auth/context';
import ProtectedComponent from './components/ProtectedComponents';

function App() {

  const [ userState,userDispatch ] = useReducer(reducer,DUserContext)
  const UserContextValue = { userState,userDispatch }


  return (
    <AuthContextProvider value = { UserContextValue }>
      <BrowserRouter>
        <div className = 'box'>
        <HeaderComp />
        <Routes>
          {
            routes.map((route,index) => {
              if ( route.auth === true) 
                {
                  return (
                    <Route 
                      key = { index }
                      element = 
                        {
                          <ProtectedComponent>
                            <route.element />
                          </ProtectedComponent>
                        }
                      path = { route.path }
                    />
                  )
                }
              else
                { 
                  return (
                    <Route 
                    key = { index }
                    element = { <route.element /> }
                    path = { route.path }
                    />
                  )
                }
            }) 
          } 
        </Routes>
        </div>
      </BrowserRouter> 
    </AuthContextProvider>
  );
}

export default App;
