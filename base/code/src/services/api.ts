import { IAbout } from '../interfaces/IAbout';

export function getApiData(): Promise<IAbout> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title: 'JS-CRA-STARTER',
        content: 'Some text, since someone said lorem ipsum is deprecated.'
      })
    }, 500);
  })
}