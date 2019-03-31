import { IRawModel, Model, prop, PureCollection } from 'datx';

export class User extends Model {
  public static type = 'user';

  @prop
  public name!: string;
}
