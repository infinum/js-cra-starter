import * as React from 'react';

interface IFooterProps {
  className?: string;
}

export const Footer: React.FC<IFooterProps> = ({ className }) => (
  <div className={className}>Made with <span role="img" aria-label="love">❤️</span> by Infinum</div>
);
