import * as React from 'react';

interface IDelayedProps {
  children: React.ReactNode;
  wait: number;
}

interface IDelayedState {
  show: boolean;
}

export default class Delayed extends React.Component<
  IDelayedProps,
  IDelayedState
> {
  static defaultProps = {
    wait: 300,
  };

  timeout: ReturnType<typeof setTimeout> | undefined;

  state: IDelayedState = {
    show: false,
  };

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({ show: true });
    }, this.props.wait);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    return this.state.show === true ? this.props.children : null;
  }
}
