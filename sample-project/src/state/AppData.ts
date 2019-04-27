import { Collection } from 'datx';
import { jsonapi } from 'datx-jsonapi';

import { User } from './models';

export class AppData extends jsonapi(Collection) {
  public static types = [User];
}
