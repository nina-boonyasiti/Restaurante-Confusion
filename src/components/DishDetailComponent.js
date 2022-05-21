import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    renderDish(chosenDish) {
        return(
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={chosenDish.image} alt={chosenDish.name}></CardImg>
                    <CardBody>
                        <CardTitle>{chosenDish.name}</CardTitle>
                        <CardText>{chosenDish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    renderComments(comments) {
        if(comments != null) {
            const chosenDishComments = comments.map((comment) => {
                return(
                    <li>
                        <p>{comment?.comment}</p>
                        <p>-- {comment.author}, {comment.date}</p>
                    </li>
                );
            });

            return (
                <div className='col-12 col-md-5 m-1'>
                    <h4>Comments</h4>
                    <ul className='list-unstyled'>
                        {chosenDishComments}
                    </ul>
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
        if(this.props.chosenDish !== null) {
            console.log('chosendishes', this.props.chosenDish);
            return(
                <div className="row">
                    {this.renderDish(this.props.chosenDish)}
                    {this.renderComments(this.props.chosenDish.comments)}
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
