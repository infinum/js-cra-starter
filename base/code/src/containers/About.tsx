import * as React from 'react';

import { getApiData } from '../services/api';

const About: React.FC<{}> = () => {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

  React.useEffect(() => {
    const fetchData = async () => {
      const aboutPageContent = await getApiData();
      const { title, content } = aboutPageContent;

      setTitle(title);
      setContent(content);
    }

    fetchData();
  }, [title]);

  return (
    <React.Fragment>
      <div>
        <h1>{title}</h1>
        <p>{content}</p>
      </div>
    </React.Fragment>
  );
}

export default About;
