import BaseEntity from "../../libs/cramp/core/entity/base.entity";
import { IComponent, IEntity, IEntityFactory } from "../../libs/cramp/type-definitions/interfaces";
import Direction2DComponent from "../modules/movement-module/components/direction-2d.component";
import Position2DComponent from "../modules/movement-module/components/position-2d.component";
import Speed2DComponent from "../modules/movement-module/components/speed-2d.component";
import { CarEntityData } from "../types/entities-data.type";



export default class CarEntity implements IEntityFactory<IComponent, IEntity<IComponent>, CarEntityData> {

  create(id: string, data: CarEntityData): IEntity<IComponent> {
    const entity = new BaseEntity(id);

    const speed: Speed2DComponent = new Speed2DComponent(data.speed.x, data.speed.y);
    const position: Position2DComponent = new Position2DComponent(data.position.x, data.position.y);
    const direction: Direction2DComponent = new Direction2DComponent();

    entity.components.push(speed, position, direction);

    return entity;
  }

}