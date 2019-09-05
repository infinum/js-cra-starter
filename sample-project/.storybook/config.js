import { configure } from '@storybook/react';

import '../src/index.css';

const reqComponents = require.context('../src/components', true, /stories\.(j|t)s(x?)$/);
const reqContainers = require.context('../src/containers', true, /stories\.(j|t)s(x?)$/);

function loadStories() {
  reqComponents.keys().forEach((filename) => reqComponents(filename));
  reqContainers.keys().forEach((filename) => reqContainers(filename));
}

configure(loadStories, module);
