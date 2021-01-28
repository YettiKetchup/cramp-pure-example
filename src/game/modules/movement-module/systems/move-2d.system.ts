import BaseSystem from "../../../../libs/cramp/core/system/base.system";
import { IComponent, IEntity } from "../../../../libs/cramp/type-definitions/interfaces";
import { ComponentFilter } from "../../../../libs/cramp/type-definitions/types";
import Direction2DComponent from "../components/direction-2d.component";
import Position2DComponent from "../components/position-2d.component";
import Speed2DComponent from "../components/speed-2d.component";



/**
 * Система, которая запрашивает у Хранилища Сущностей все Сущности с Компонентами
 * Direction2DComponent, Speed2DComponent, Position2DComponent
 * и получив их меняет значение позиции. В нашем случае, этими Сущностями
 * являются CarEntity, которые мы создали в GameController и передали Хранилищу
 */
export default class Move2DSystem extends BaseSystem<undefined, IEntity<IComponent>> {

  protected readonly componentFilter: ComponentFilter = {
    include: [
      Direction2DComponent, 
      Speed2DComponent, 
      Position2DComponent
    ]
  }

  public execute(entities: IEntity<IComponent>[]): void {
    for(let i = 0; i < entities.length; i++) {
      const direction: Direction2DComponent = entities[i].get(Direction2DComponent);
      const speed: Speed2DComponent = entities[i].get(Speed2DComponent);
      const position: Position2DComponent = entities[i].get(Position2DComponent);

      position.x += speed.x * direction.x;
      position.y += speed.y * direction.y;
    }
  }

}