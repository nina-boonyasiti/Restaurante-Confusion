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

    render() {
        if(this.props.chosenDish != null) {
            return(
                <div className="row">
                    {this.renderDish(this.props.chosenDish)}
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
