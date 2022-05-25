import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


//TASK 1.1: NEW CLASS COMPONENT COMMENTFORM
class CommentForm extends Component{
    constructor(props) {
        super(props);

        this.state = {
            isCommentFormOpen: false
        };

        //TASK 1.2: TOGGLE MODAL/HANDLERS
        this.toggleCommentForm = this.toggleCommentForm.bind(this);
        this.handleCommentForm = this.handleCommentForm.bind(this);

    }

    //TASK 1.2: COMMENT HANDLERS
    handleCommentForm(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    //TASK 1.2: TOGGLE MODAL
    toggleCommentForm() {
        this.setState({
            isCommentFormOpen: !this.state.isCommentFormOpen
        });
    }

    render() {
        return(

            /* TASK 2.1: SET UP A LOCAL FORM W/ AUTHOR, RATING, COMMENT */ 
            <React.Fragment>
                <Button outline onClick={this.toggleCommentForm}>
                    <span className="fa fa-comments fa-lg"></span>
                        Submit Comment
                </Button>

                <Modal isOpen={this.state.isCommentFormOpen} toggle={this.toggleCommentForm}>
                    <ModalHeader toggle={this.toggleCommentForm}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleCommentForm(values)}>
                            {/* TASK 2.2: RATINGS IMPLEMENTED USING SELECT */}
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" className="form-control" name="rating" id="rating" validators={{required}}>
                                        <option>Please Select</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>

                                    </Control.select>
                                    {/* TASK 3.3: SHOWS INVALID MESSAGE DISPLAYED AT THE BOTTOM OF THE FIELD */}
                                    <Errors className="text-danger" model=".author" show="touched" messages={{required: 'Required '}} />
                                </Col>
                            </Row>

                            {/* TASK 2.2: AUTHORS IMPLEMENTED USING TEXT FIELD */}
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={12}>

                                    {/* TASK 3.1-3.2: AUTHORS VALIDATION - FIELD > 3 CHARS && <= 15 CHARS */}
                                    <Control.text model=".author" id="author" name="author" placeholder="First Name" className="form-control" validators={{required, minLength: minLength(3), maxLength: maxLength(15)}} />
                                    
                                    {/* TASK 3.3: SHOWS INVALID MESSAGE DISPLAYED AT THE BOTTOM OF THE FIELD */}
                                    <Errors className="text-danger" model=".author" show="touched" messages={{required: 'Required ', minLength: 'Must be greater than 2 characters', maxLength: 'Must be 15 characters for less'}} />
                                </Col>
                            </Row>

                            {/* TASK 2.2: COMMENTS IMPLEMENTED USING TEXT FIELD AND SIX ROWS */}
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment" placeholder="Comment Here" className="form-control" rows = "6" validators={{required}} />

                                    {/* TASK 3.3: SHOWS INVALID MESSAGE DISPLAYED AT THE BOTTOM OF THE FIELD */}
                                    <Errors className="text-danger" model=".author" show="touched" messages={{required: 'Required '}} />
                                </Col>
                            </Row>

                            {/* TASK 1.3: COMMENTFORM COMPONENT IS USED BY RENDERCOMMENTS */}
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>

                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}



    function RenderDish({dish}) {
        return(
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    function RenderComments({comments, addComment, dishId}) {
        if(comments != null) {
            const dishComments = comments.map((comment) => {
                return(
                    <li key={comment.id}>
                        <p>{comment?.comment}</p>
                        <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </li>
                );
            });

            return (
                <div className='col-12 col-md-5 m-1'>
                    <h4>Comments</h4>
                    <ul className='list-unstyled'>
                        {dishComments}
                    </ul>
                    {/* TASK 1.3: COMMENTFORM COMPONENT IS USED BY RENDERCOMMENTS */}
                    <CommentForm dishId={dishId} addComment={addComment} />
                </div>
            );
        }
        else {
            return(
                <div></div>
            );
        }
    };

    const DishDetail = (props) => {
        console.log('DishDetail Component render is invoked');

        if(props.dish) {
            return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments}
                        addComment={props.addComment}
                        dishId={props.dish.id}
                    />
                </div>
                </div>
            );
        }
        else {
            return(
                <div></div>
            );
        }
    }

export default DishDetail;
