import { IRawModel, Model, prop, PureCollection } from 'datx';

export class User extends Model {
  public static type = 'user';

  @prop
  public name!: string;

  // Workaround for a babel issue (feature?)
  constructor(data?: IRawModel, collection?: PureCollection) {
    super(data, collection);
    if (data) {
      this.update(data);
    }
  }
}
