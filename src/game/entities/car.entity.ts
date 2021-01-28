import BaseEntity from "../../libs/cramp/core/entity/base.entity";
import { IComponent, IEntity, IEntityFactory } from "../../libs/cramp/type-definitions/interfaces";



export default class CarEntity implements IEntityFactory<IComponent, IEntity<IComponent>, undefined> {
  create(id: string): IEntity<IComponent> {
    const entity = new BaseEntity(id);

    return entity;
  }

}