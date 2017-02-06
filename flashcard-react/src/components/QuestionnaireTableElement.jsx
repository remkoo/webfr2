import React from 'react';
import QuestionnaireShowDialog from './QuestionnaireShowDialog';
import QuestionnaireUpdateDialog from './QuestionnaireUpdateDialog';
import {Button, Glyphicon} from 'react-bootstrap';

const textStyle = { verticalAlign: 'middle' };
const colStyle = { width: '10px' };

export default class QuestionnaireTableElement extends React.Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(id) {
    this.props.delete(this.props.questionnaire.id);
  }  

  render() {
    return <tr>
      <td colSpan="1" style={textStyle}>
        {this.props.questionnaire.id}
      </td>
      <td colSpan="3" style={textStyle}>
        {this.props.questionnaire.title}
      </td>
      <td colSpan="10" style={textStyle}>
        {this.props.questionnaire.description}
      </td>
      <td style={colStyle}>
        <QuestionnaireShowDialog questionnaire={this.props.questionnaire}/>
      </td>
      <td style={colStyle}>
        <QuestionnaireUpdateDialog 
          questionnaire={this.props.questionnaire}
          onUpdate={this.props.update}
          />
      </td>
      <td style={colStyle}>
        <Button bsStyle="link" onClick={this.onDelete}>
          <Glyphicon glyph="remove"/>
        </Button>
      </td>
    </tr>
  }
}
