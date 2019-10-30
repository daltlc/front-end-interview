import React from "react";
import { render } from "react-dom";
class Space extends React.Component {
  render() {
    return (
      <rect
        fill={this.props.shade ? "green" : "lightgray"}
        height={this.props.size}
        width={this.props.size}
        x={this.props.x}
        y={this.props.y}
      />
    );
  }
}
export default Space;
