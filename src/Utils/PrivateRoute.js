import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenService from '../services/token-service'

export default function PrivateRoute({ component: Component, componentProps, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        TokenService.hasAuthToken() ? (
          <Component {...props} {...componentProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/log-in",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}