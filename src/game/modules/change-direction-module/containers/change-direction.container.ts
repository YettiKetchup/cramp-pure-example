import SystemsContainer from "../../../../libs/cramp/systems-container/systems.container";
import { 
  IComponent, 
  IEntity, 
  IEntityStorage, 
  ISystemContainerFactory, 
  ISystemsContainer 
} from "../../../../libs/cramp/type-definitions/interfaces";
import ChangeDirection2DSystem from "../systems/change-direction-2d.system";
import { Direction2D } from "../types/change-direction-2d.type";



export default class ChangeDirection2DContainer implements ISystemContainerFactory {
  
  public create(entityStorage: IEntityStorage<IEntity<IComponent>>): ISystemsContainer<IComponent> {
    const container: ISystemsContainer<Direction2D> = new SystemsContainer(entityStorage);

    container.add(ChangeDirection2DSystem)

    return container;
  }

}