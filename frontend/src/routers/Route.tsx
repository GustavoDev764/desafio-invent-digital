import React from 'react';
import {
    Route as ReactDOMRoute,
    RouteProps as ReactDOMRouteProps,
    Redirect
} from 'react-router-dom'
import { useAuth } from '../hooks/Auth';
import { RoutesWeb } from './createrouter'

interface RouteProps extends ReactDOMRouteProps {
    isPrivate?: boolean;
    component: React.ComponentType;
    provider?: any;
}

const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, provider: Provider, ...rest }) => {
    const { isAuth } = useAuth();
    return (
        <ReactDOMRoute {...rest} render={() => {
            return isPrivate === isAuth() ? (
                !!Provider ? (
                    <Provider>
                        <Component />
                    </Provider>
                ) : <Component />
            ) : (
                    <Redirect to={{ pathname: isPrivate ? RoutesWeb.INDEX : RoutesWeb.DASHBOARD }} />
                )
        }} />
    );
}

export default Route;