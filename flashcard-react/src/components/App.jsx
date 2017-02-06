import React from 'react';
import Header from './Header';
import QuestionnaireContainer from './QuestionnaireContainer';

export default class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header
          title="Flashcard Client with React"
          subtitle="Version 1"/>
        <QuestionnaireContainer />
      </div>
    )
  }
}
