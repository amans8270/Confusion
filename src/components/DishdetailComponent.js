import React from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Button, FormGroup, 
    Label, Modal, ModalBody, ModalHeader,Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';



const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
        isModalOpen: !this.state.isModalOpen
    });
  }
  
  handleSubmit(event) {
      console.log('Current State is: ' + JSON.stringify(this.state));
      this.props.addComment(this.props.dishId, event.rating, event.author, event.comment);
  }

  render() {
    return (
      <div className="container" >
        <Button outline onClick={this.toggleModal} outline color="secondary"><span className="fa fa-pencil fa-fw"></span>Submit Comment</Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader><h3>Submit comment</h3></ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
            <Row className="form-group">
                <Label htmlFor="rating">Rating</Label>
                <Control.select model=".rating" id="rating" name="rating"
                className="form-control" 
                >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    </Control.select>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author">Your Name</Label>
                <Control.text model=".author" id="author" name="author"
                placeholder="Your Name"
                className="form-control"
                validators={{required, minLength: minLength(3), maxLength: maxLength(15)}} />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 2 letters',
                      maxLength: 'Must be 15 letters or less' }} />
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment">Comment</Label>
                <Control.textarea model=".comment" id="comment" name="comment" rows="6"
                className="form-control"/>
              </Row>
              <Button type="submit" value="submit" color="primary">Submit</Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
   function RenderComments({comments,addComment, dishId}) {
        if (comments != null) {
            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comments.map((comment)=>{
                            return(
                    <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit'
                        }).format(new Date(Date.parse(comment.date)))}
                    </p>
                </li>
                  );
                })}
                </ul>
                <CommentForm dishId={dishId} addComment={addComment}/>
                </div>
            );
        }
        else{
            return(
                <div>

                </div>
            );
        }
    }
    function  RenderDish({dish}) {
            return (
                <div className='col-12 col-md-5 m-1 '>
                    <Card>
                        <CardImg width="100%"top src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }

        const DishDetail = (props) => {
            if (props.dish != null) {
              return (
                <div class="container">
                  <div className="row">
                    <Breadcrumb>
                      <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                      <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                      <h3>{props.dish.name}</h3>
                      <hr />
                    </div>  
                  </div>
                  <div class="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments}
        addComment={props.addComment}
        dishId={props.dish.id}
      />
                  </div>
                </div>
              );
            } else {
              return(
                <div></div>
              );
            }
          }



export default DishDetail 