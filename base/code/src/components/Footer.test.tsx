import React from 'react';
import ReactDOM from 'react-dom';
import { create } from "react-test-renderer";

import { Footer } from './Footer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Footer />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("Footer component snapshot", () => {
  test("Matches the snapshot", () => {
    const footer = create(<Footer />);
    expect(footer.toJSON()).toMatchSnapshot();
  });
});

describe("Footer component content", () => {
  test("Matches the content", () => {
    const footerComponent = create(<Footer />);
    const footerInstance = footerComponent.root;

    const content = footerInstance.findByType('span');

    expect(content.children[0]).toBe("❤️");
  });
});