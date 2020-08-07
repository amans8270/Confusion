import React, { Component } from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { COMMENTS } from '../shared/Comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import Header1 from './Header';
import Footer1 from './Footer';
import {Switch ,Route, Redirect } from 'react-router-dom';
import About from './aboutusComponent'
  
class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
        Comments: COMMENTS,
        promotions: PROMOTIONS,
        leaders: LEADERS
    };
  }
 
  render() {
    const HomePage = () => {
      return(
          <Home 
              dish={this.state.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
              leader={this.state.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    }
    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            Comments={this.state.Comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };
    return (
      <div>
        <Header1/>
        <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
              <Route path='/menu/:dishId' component={DishWithId}/>
              <Route exact path='/contactus' component={Contact} />
              <Route exact path='/aboutus' component={() => <About leaders={this.state.leaders}/>}/>
              <Redirect to="/home" />
          </Switch>
        <Footer1/>
      </div>
    );
  }
}

export default Main;