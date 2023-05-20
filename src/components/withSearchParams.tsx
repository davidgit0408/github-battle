import * as React from 'react';
import { useSearchParams } from 'react-router-dom';

export interface WithSearchParams {
  searchParams: URLSearchParams;
}

export default function withSearchParams<ComponentProps>(
  Component: React.ComponentType<ComponentProps & WithSearchParams>
) {
  const displayName = Component.displayName || Component.name || 'Component';

  const WithSearchParams = (props: ComponentProps) => {
    const [searchParams] = useSearchParams();

    return <Component searchParams={searchParams} {...props} />;
  };

  WithSearchParams.displayName = `withSearchParams(${displayName})`;

  return WithSearchParams;
}
