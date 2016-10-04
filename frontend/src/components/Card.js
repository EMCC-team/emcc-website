import React from 'react';

class Card extends React.Component {
  render() {
    let { className, children, ...other } = this.props;
    let divStyle = {
      boxShadow: '0 1px 6px rgba(0,0,0,.2)',
      padding: '40px 40px 40px',
    };
    return (
      <div {...other} style={{ margin: "10px", ...divStyle, ...other.style }} className={className}>
        {children}
      </div>
    );
  }
}

export default Card;
