import React from "react";

export default class ProductPreview extends React.Component {
  render() {
    const style = {
      "--product-image": `url(${this.props.image})`
    };

    return (
      <div className="product-preview" style={style}>
        <button
          className="product-preview__add"
          onClick={() => this.props.onClick(this.props.id)}
          title="Add to the offer"
        >
          <span>+</span>
        </button>
        <span className="product-preview__name">{this.props.name}</span>
        <span className="product-preview__price">from {this.props.price}</span>
        <span>from {this.props.price}</span>
      </div>
    );
  }
}
