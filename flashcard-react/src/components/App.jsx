import React from 'react';
import Header from './Header';
import QuestionnaireContainer from './QuestionnaireContainer';
import Loader from './misc/Loader';
import Message from './misc/Message';

export default class App extends React.Component {
  constructor() {
    super();
    //console.log("URL is: " + Configuration.url);
    this.state = {
      url: '',
      error: '',
      subTitle: ''
    }
  }

  componentDidMount() {
    // Prepare a reference to the App instance to be able to refer to it
    // within the callback functions
    var self = this;
    fetch('application.json').then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(config => {
      console.log(config.url);
      self.setState(
        {url:config.url,
          subTitle: config.subtitle}
        )}
      )
      .catch(ex => {
          //console.log(ex);
          self.setState(
            {error: 'Error while trying to load config file'}
          )
      })
  }

  render() {
    var comp;
    if(this.state.error === '') {
      comp = <Loader/>;
    } else {
      comp = <Message message={this.state.error}/>;
    }
    return (
      <div className="container-fluid">
        <Header
          title="Flashcard Client with React"
          subtitle={this.state.subTitle}/>
        {(this.state.url !== '') ? (
          <QuestionnaireContainer serverUrl={this.state.url}/>
        ) : (
          comp
        )}
      </div>
    )
  }
}
