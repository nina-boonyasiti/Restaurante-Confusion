import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    renderDish(chosenDish) {
        return(
            <div className="col-12 col-md-5 mt-1">
                <Card>
                    <CardImg width="100%" src={chosenDish.image} alt={chosenDish.name}></CardImg>
                    <CardBody>
                        <CardTitle header>{chosenDish.name}</CardTitle>
                        <CardText>{chosenDish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    renderComments(comments) {
        if(comments != null) {
            const chosenDishComments = comments.map((comments) => {
                return(
                    <li key={comments.id}>
                        <p>{comments.comment}</p>
                        <p>-- {comments.author}, {comments.date}</p>
                    </li>
                );
            });

            return (
                <div className="col-12 col-md-5 mt-1">
                    <h4>Comments</h4>
                    <u1 className="list-unstyled">
                        {chosenDishComments}
                    </u1>
                </div>
            );
        }
        else {
            return(
                <div></div>
            );
        }
    };

    render() {
        if(this.props.chosenDish != null) {
            return(
                <div className="row">
                    {this.renderDish(this.props.chosenDish)}
                    {this.renderComments(this.props.comments)}
                </div>
            );
        }
        else {
            return(
                <div></div>
            );
        }
    }
}

export default DishDetail;
