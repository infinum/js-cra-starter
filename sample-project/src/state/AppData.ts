import { Collection } from 'datx';

import { User } from './models';

export class AppData extends Collection {
  public static types = [User];
}
