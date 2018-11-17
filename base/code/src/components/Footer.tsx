import * as React from 'react';

export class Footer extends React.Component<{
  className?: string;
}> {
  public render() {
    const { className } = this.props;

    return (
      <div className={className}>
        Made with ❤️by Infinum
      </div>
    );
  }
}
