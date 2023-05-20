import * as React from 'react';

interface IHoverProps {
  children: (hovering: boolean) => React.ReactNode;
}

interface IHoverState {
  hovering: boolean;
}

export default class Hover extends React.Component<IHoverProps, IHoverState> {
  state: IHoverState = {
    hovering: false,
  };

  mouseOver = () => {
    this.setState({ hovering: true });
  };

  mouseOut = () => {
    this.setState({ hovering: false });
  };

  render() {
    return (
      <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        {this.props.children(this.state.hovering)}
      </div>
    );
  }
}
