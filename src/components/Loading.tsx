import * as React from 'react';
import Delayed from './Delay';

const styles: React.CSSProperties = {
  fontSize: '14px',
  position: 'absolute',
  left: '0',
  right: '0',
  marginTop: '20px',
  textAlign: 'center',
};

interface ILoadingProps {
  text: string;
  speed: number;
}

interface ILoadingState {
  content: string;
}

export default class Loading extends React.Component<
  ILoadingProps,
  ILoadingState
> {
  static defaultProps = {
    text: 'Loading',
    speed: 300,
  };

  interval: ReturnType<typeof setInterval> | undefined;

  state: ILoadingState = {
    content: this.props.text,
  };

  componentDidMount() {
    const { text, speed } = this.props;

    this.interval = setInterval(() => {
      this.state.content === text + '...'
        ? this.setState({ content: text })
        : this.setState((prevState) => {
            return {
              ...prevState,
              content: prevState.content + '.',
            };
          });
    }, speed);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <Delayed>
        <p style={styles}>{this.state.content}</p>
      </Delayed>
    );
  }
}
