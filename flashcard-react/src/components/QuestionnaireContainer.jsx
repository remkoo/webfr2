import React from 'react';
import Footer from './Footer';
import { Grid, Row, Col } from 'react-bootstrap';
import QuestionnaireTable from './QuestionnaireTable';
import QuestionnaireCreateDialog from './QuestionnaireCreateDialog';

export default class QuestionnaireContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionnaires: this.props.qs
    }
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  create(questionnaire) {
    let newId = 0;
    if(this.state.questionnaires.length > 0 ) {
      // Generate new ID from highest questionnare-ID
      let index = this.state.questionnaires.length - 1;
      newId = this.state.questionnaires[index].id + 1;
    } 
    let qs = this.state.questionnaires;
    questionnaire.id = newId;
    qs.push(questionnaire);
    this.setState({questionnaires:qs});
  }

  update(questionnaire) {
    let qs = this.state.questionnaires;
    let tmp = qs.find(q => q.id === questionnaire.id);
    tmp.title = questionnaire.title;
    tmp.description = questionnaire.description;
    this.setState({questionnaires:qs});
  }

  delete(id) {
    let qs = this.state.questionnaires;
    // filter out questionnaire with given id
    qs = qs.filter(q => q.id !== id);
    this.setState({
      questionnaires: qs
    })
  }

  render() {
    const rowStyle = { paddingTop: '10px' };
    let msg = 'Total of '+this.state.questionnaires.length+' questionnaires';
    return (
      <div>
        <Grid>
          <Row>
            <Col mdPush={11} md={1} className="text-right">
              <QuestionnaireCreateDialog onCreate={this.create}/>
            </Col>
          </Row>
          <Row style={rowStyle}>
            <Col md={12}>
              <QuestionnaireTable
                questionnaires={this.state.questionnaires}
                update={this.update}
                delete={this.delete}
              />
            </Col>
          </Row>
        </Grid>
        <Footer leftMessage="The FHNW Team" rightMessage={msg}/>
      </div>
    )
  }
}

QuestionnaireContainer.defaultProps = {
  qs:[
    {'id': 1, 'title': 'Test Title 1', 'description': 'Test Description 1'},
    {'id': 2, 'title': 'Test Title 2', 'description': 'Test Description 2'},
    {'id': 3, 'title': 'Test Title 3', 'description': 'Test Description 3'},
    {'id': 4, 'title': 'Test Title 4', 'description': 'Test Description 4'},
    {'id': 5, 'title': 'Test Title 5', 'description': 'Test Description 5'},
    {'id': 6, 'title': 'Test Title 6', 'description': 'Test Description 6'},
  ]
}
