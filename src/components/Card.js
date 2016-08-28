import React from 'react';

class Card extends React.Component {
  render() {
    let divStyle = {
      boxShadow: '0 1px 6px rgba(0,0,0,.2)',
      padding: '40px 40px 40px',
    };
    return (
      <div style={divStyle} className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}

export default Card;
