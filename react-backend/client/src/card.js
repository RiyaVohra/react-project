import React, { Component } from "react";

export class Card extends Component {
    render() {
        return (
            <div className="card" style={this.props.hideHeader ? {marginBottom: '-25px'} : {marginBottom: '15px'}}>
                {!this.props.hideHeader && <div className="header">
                    <h4 className="title">{this.props.title}</h4>
                    <p className="category">{this.props.category}</p>
                </div>}
                <div className={"content"  + (this.props.hideHeader ? 'x' : '')}>
                    {this.props.content}
                </div>
            </div>
        );
    }
}

export default Card;