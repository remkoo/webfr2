import React from 'react';
import { Button, Glyphicon, Modal, Form, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';

export default class QuestionnaireCreateDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      title: '',
      description: ''
    }
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    return (
      <div>
        <Button bsStyle="primary" onClick={this.open}>
          <Glyphicon glyph="plus" />
        </Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Create Questionnaire</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
               <FormGroup controlId="formTitle">
                 <Col componentClass={ControlLabel} md={2}>
                   Title
                 </Col>
                 <Col md={10}>
                   <FormControl type="text" placeholder="Title" autoFocus
                     value={this.state.title} onChange={this.handleChange}/>
                 </Col>
               </FormGroup>

               <FormGroup controlId="formDescription">
                 <Col componentClass={ControlLabel} md={2}>
                   Description
                 </Col>
                 <Col md={10}>
                   <FormControl type="text" placeholder="Description"
                     value={this.state.description} onChange={this.handleChange}/>
                 </Col>
               </FormGroup>

               <FormGroup>
                 <Col mdPush={10} md={2} className="text-right">
                   <Button bsStyle="primary" onClick={this.submit}>Submit</Button>
                 </Col>
               </FormGroup>
             </Form>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
  handleChange(e) {
    if (e.target.id === 'formTitle') {
      this.setState({ title: e.target.value });
    } else if (e.target.id === 'formDescription') {
      this.setState({ description: e.target.value });
    }
  }
  close() {
    this.setState({ showModal: false, title: '', description: '' });
  }
  submit() {
    this.props.onCreate({title:this.state.title,description:this.state.description});
    this.setState({ showModal: false, title: '', description: '' });
  }
  open() {
    this.setState({ showModal: true });
  }
}
