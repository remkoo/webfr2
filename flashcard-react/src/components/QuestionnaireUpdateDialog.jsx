import React from 'react';
import { Button, Glyphicon, Modal, Form, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';

export default class QuestionnaireUpdateDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      title: props.questionnaire.title,
      description: props.questionnaire.description
    }
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  render() {
    return (
      <div>
        <Button bsStyle="link" onClick={this.open}>
          <Glyphicon glyph="edit" />
        </Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Update Questionnaire</Modal.Title>
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
                   <Button bsStyle="primary" onClick={this.submit}>Update</Button>
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
    this.setState({ showModal: false });
  }
  submit() {
    this.props.onUpdate({id:this.props.questionnaire.id,
      title:this.state.title, description:this.state.description});
    this.setState({ showModal: false });
  }
  open() {
    this.setState({ showModal: true });
  }
}
