import React from 'react';
import { Table } from 'react-bootstrap';
import QuestionnaireTableElement from './QuestionnaireTableElement';

export default class QuestionnaireTable extends React.Component {
  render() {
    return <Table bordered condensed hover>
        <tbody>
          {/* IMPORTANT: use the 'key' property to be able to update the list dynamically */}
          {this.props.questionnaires.map(questionnaire =>
            <QuestionnaireTableElement key={questionnaire.id}
                questionnaire={questionnaire}
                update={this.props.update}
                delete={this.props.delete}
              />
            )
          }
        </tbody>
      </Table>
  }
}