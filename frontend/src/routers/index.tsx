import React from 'react';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Route from './Route';

import { RoutesWeb } from './createrouter';
import { ProdutoProvider } from '../hooks/Produtos';
import { CategoriaProvider } from '../hooks/Categories';

import DashboardPage from '../pages/Dashboard';
import LoginPage from '../pages/Login';
import CategoriesPage from '../pages/Categorias';

const Routers: React.FC = () => {
    return (
        <Router>
            <Switch>

                <Route
                    path={RoutesWeb.DASHBOARD}

                    exact
                    component={DashboardPage}
                    isPrivate
                />

                <Route
                    path={RoutesWeb.CATEGORY}

                    exact
                    component={CategoriesPage}
                    isPrivate />
                <Route path={RoutesWeb.INDEX} exact component={LoginPage} />
            </Switch>
        </Router>
    );
}

export default Routers;