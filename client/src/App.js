import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Customers from './components/Customers';
import Footer from './components/Footer';
import Transfer from './components/Transfer';
import Transactions from './components/Transactions';
import CustomerState from './context/customers/CustomerState';
import Success from './components/Success';
import CreateCustomer from './components/CreateCustomer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <CustomerState>
      <Router>
        <div className="container text-center">
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/customers">
              <Customers />
            </Route>
            <Route exact path="/transfer/:sender">
              <Transfer />
            </Route>
            <Route exact path="/transactions">
              <Transactions />
            </Route>
            <Route exact path="/create">
              <CreateCustomer />
            </Route>
            <Route exact path="/transfer/:sender/:receiver/:amount/:tag/:sname/:rname/success">
              <Success />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </CustomerState>
  );
}

export default App;