import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component,...rest  // means all the remaining props
}) => {
             const userInfo=localStorage.getItem('userInfo')
             return (
                <Route          
                  {...rest}  
                  render={props =>
                       !userInfo ? (
                      <Redirect to='/login' />
                    ) : (
                      <Component {...props} />
                    )
                  }
                />
              );
}

export default PrivateRoute