import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { GeneratePDF } from "./components/common/pdf";
import Login from "./pages/login";

import { MakeRate } from './components/make-rates/list'
import { User } from './pages/users'
import { CreateQuotation } from './components/make-rates/create/'
import PageNotFound from './components/common/page-not-found'
import { Menu } from './components/common/nav-bar'
import { Clients } from './components/clients/client'
import { ProductComponent } from './pages/products'
import { PrivateRoute } from './router/privateRoute'
import "./App.css";

function App() {
  const DefaultContainer = () => (
    <Menu >
      <Switch>
        <PrivateRoute exact path="/cotizaciones" component={MakeRate} />
        <PrivateRoute exact path="/usuarios" component={User} />
        <PrivateRoute exact path="/cotizaciones/crear" component={CreateQuotation} />
        <PrivateRoute exact path="/clientes" component={Clients} />
        <PrivateRoute exact path="/productos" component={ProductComponent} />
        <PrivateRoute component={PageNotFound} />
      </Switch>
    </Menu>
  )

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/cotizacion" component={GeneratePDF} />
          <PrivateRoute exact path="/cotizacion/:id" component={GeneratePDF} />
          <PrivateRoute component={DefaultContainer} />
        </Switch>
      </Router>
    </div>
  );

}

export default App;
