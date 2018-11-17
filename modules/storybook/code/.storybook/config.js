import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

setOptions({
  hierarchySeparator: /\//,
  hierarchyRootSeparator: /\|/,
});

const reqComponents = require.context('../src/components', true, /stories\.(j|t)s(x?)$/);
const reqContainers = require.context('../src/containers', true, /stories\.(j|t)s(x?)$/);

function loadStories() {
  reqComponents.keys().forEach((filename) => reqComponents(filename));
  reqContainers.keys().forEach((filename) => reqContainers(filename));
}

configure(loadStories, module);
