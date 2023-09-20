import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import { Provider } from 'react-redux'
import './index.css';
import {createStore} from 'redux';
import reportWebVitals from './reportWebVitals';
import { act } from 'react-dom/test-utils';
import "bootstrap/dist/css/bootstrap.min.css";
const quotes = [
  ['Start where you are. Use what you have. Do what you can.', 'Arthur Ashe'],
  ['What’s money? A man is a success if he gets up in the morning and goes to bed at night and in between does what he wants to do', 'Bob Dylan'],
  ['In order to succeed, your desire for success should be greater than your fear of failure.', 'Bill Cosby'],
  ['There are no traffic jams along the extra mile.', 'Roger Staubach'],
  ['We must balance conspicuous consumption with conscious capitalism.', 'Kevin Kruse'],
  ['You may be disappointed if you fail, but you are doomed if you don’t try', 'Beverly Sills'],
  ['Life shrinks or expands in proportion to one’s courage.', 'Anais Nin'],
  ['Life is what we make it, always has been, always will be.', 'Grandma Moses'],
  ['Definiteness of purpose is the starting point of all achievement.', 'W. Clement Stone'],
  ['Winning isn’t everything, but wanting to win is.', 'Vince Lombardi']
];

const CHANGE = 'CHANGE';
let firstRandInd = Math.floor(Math.random() * (quotes.length - 1));
const changeQuote = () => {
  let randInd = Math.floor(Math.random() * (quotes.length - 1));
  return {
    type: CHANGE,
    currentQuote: quotes[randInd][0],
    currentAuthor: quotes[randInd][1]
  };
}

const Reducer = (state = {currentQuote: quotes[firstRandInd][0], currentAuthor: quotes[firstRandInd][1]}, action) => {
  switch(action.type) {
    case CHANGE:
      const newState = {
        currentQuote: action.currentQuote,
        currentAuthor: action.currentAuthor
      };
      return newState
    default:
      return state;
  }
};

const store = createStore(Reducer);

class Presentational extends React.Component {
  constructor(props) {
    super(props);
    let randInd = Math.floor(Math.random() * (quotes.length - 1));
    console.log(randInd);
    this.state = {
      currentQuote: quotes[randInd][0],
      currentAuthor: quotes[randInd][1]
    };
    this.newQuote = this.newQuote.bind(this);
  };

  newQuote() {
    
    this.props.buttonClick();
    //console.log(this.props);
    this.setState({
      currentQuote: this.props.quote,
      currentAuthor: this.props.author
    });
  }

  render() {
    return (
      
      <div className='container'>
        
        
          <div id="quote-box" className='myQuote'>
            <div id="text">
              <p id="quote">{this.props.currentQuote}</p>
            </div>
            <div id="author">
              <p>{this.props.currentAuthor}</p>
            </div>
            <a className="link" id="tweet-quote" title="Tweet this quote!" target="_top" href="twitter.com/intent/tweet">
            <i className="fa-brands fa-tumblr"></i>
          </a>
            <a className='link' id="tumblr-quote" title="Post this quote on tumblr!" target="_blank" href="https://www.tumblr.com/widgets/share/tool?posttype=quote&amp;tags=quotes,freecodecamp&amp;caption=Abigail%20Van%20Buren&amp;content=If%20you%20want%20your%20children%20to%20turn%20out%20well%2C%20spend%20twice%20as%20much%20time%20with%20them%2C%20and%20half%20as%20much%20money.&amp;canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&amp;shareSource=tumblr_share_button">
            <i class="fa-brands fa-twitter"></i>
          </a>
            <div  id="new-quote">
              <button className='' onClick={this.newQuote}>New quote</button>
            </div>
          </div>
      
    </div>
    );
  }
};

const mapStateToProps = (state) =>{
  return {currentQuote: state.currentQuote,
          currentAuthor: state.currentAuthor}
};

const mapDispatchToProps = (dispatch) => {
  return {
    buttonClick: () =>{
      dispatch(changeQuote());
    }
  };
}

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container/>
       
      </Provider>
    );
  };
};

ReactDOM.render(<AppWrapper />, document.getElementById('root'));
