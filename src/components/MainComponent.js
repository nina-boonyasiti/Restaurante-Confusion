import { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';

// NOTE: Switch is replaced by Routes and Redirect is replaced by Navigate in the latest version of react-router-dom
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
    };
  }

  render() {

    const HomePage = () => {
      return(
        <Home />
      );
    }

    return(
      <div>
        <Header />
           <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
              <Redirect to="/home" />
          </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
