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

  componentDidMount() {
    // Load questionnaires from backend to initialize this component
    fetch(this.props.serverUrl)
    .then(response =>
      response.json()
    )
    .then(qs =>
      this.setState(
        {questionnaires: qs}
    ))
    .catch(error => {
      console.warn('Error :' + error);
    })
  };

  create(questionnaire) {
    var qs = this.state.questionnaires;
    var request = new Request(this.props.serverUrl, {
      method: 'POST',
      headers: new Headers({
		      'Content-Type': 'application/json'
	    }),
      body: JSON.stringify(questionnaire)
    });
    fetch(request).then(response =>
        response.json()
    )
    .then(q => {
      qs.push(q);
      this.setState(
        {questionnaires: qs}
      );
    });
  };
  update(questionnaire) {
    var qs = this.state.questionnaires;
    var request = new Request(this.props.serverUrl + '/' + questionnaire.id, {
      method: 'PUT',
      headers: new Headers({
		      'Content-Type': 'application/json'
	    }),
      body: JSON.stringify(questionnaire)
    });
    fetch(request).then(response => {
      if (response.ok) {
        var tmp = qs.find(function (q) {
          return q.id === questionnaire.id;
        });
        tmp.title = questionnaire.title;
        tmp.description = questionnaire.description;
        this.setState(
          {questionnaires: qs}
        );
        console.log("QuestionnaireContainer: Update questionnaire with id=" + questionnaire.id);
      } else {
        console.log("QuestionnaireContainer: Could not update questionnaire with id=" + questionnaire.id);
      }
    });
  };
  delete(id) {
    var qs = this.state.questionnaires;
    var request = new Request(this.props.serverUrl+'/'+id, {
      method: 'DELETE',
    });
    fetch(request).then(response => {
      if (response.ok) {
        qs = qs.filter(q => q.id !== id);
        this.setState(
          {questionnaires: qs}
        );
        console.log("QuestionnaireContainer: Delete questionnaire with id=" + id);
      } else {
        console.log("QuestionnaireContainer: Could not delete questionnaire with id=" + id);
      }
    });
  };

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

  createLocal(questionnaire) {
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

  updateLocal(questionnaire) {
    let qs = this.state.questionnaires;
    let tmp = qs.find(q => q.id === questionnaire.id);
    tmp.title = questionnaire.title;
    tmp.description = questionnaire.description;
    this.setState({questionnaires:qs});
  }

  deleteLocal(id) {
    let qs = this.state.questionnaires;
    // filter out questionnaire with given id
    qs = qs.filter(q => q.id !== id);
    this.setState({
      questionnaires: qs
    })
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
