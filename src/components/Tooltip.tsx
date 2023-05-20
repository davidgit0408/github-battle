import * as React from 'react';
import Hover from './Hover';

const container: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
};

interface ITooltipProps {
  children: React.ReactNode;
  element: JSX.Element;
}

export default function ToolTip(props: ITooltipProps) {
  return (
    <Hover>
      {(hovering) => {
        return (
          <div style={container}>
            {hovering === true && props.element}
            {props.children}
          </div>
        );
      }}
    </Hover>
  );
}
