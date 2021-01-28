import { 
  IComponent, 
  IEntity, 
  IEntityStorage, 
  ISystemContainerFactory, 
  ISystemsContainer 
} from "../../../../libs/cramp/type-definitions/interfaces";
import SystemsContainer from "../../../../libs/cramp/systems-container/systems.container";
import Move2DSystem from "../systems/move-2d.system";



/**
 * Это Фабрика Контейнера, который будет срабатывать в тот момент, когда
 * У какой-то из Сущностей поменяется значение в Компоненте Direction2DComponent.
 * Важно понимать, что бы отследить изменения, неободимо подписаться на их изменение
 * через статический класс ComponentChangesController. И изменения необходимо вносить,
 * через этот класс.
 */
export default class Move2DContainer implements ISystemContainerFactory {

  public create(entityStorage: IEntityStorage<IEntity<IComponent>>): ISystemsContainer<IComponent> {
    const container: ISystemsContainer<undefined> = new SystemsContainer(entityStorage);

    container.add(Move2DSystem)

    return container;
  }

}