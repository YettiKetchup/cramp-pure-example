import EntityStorage from "../libs/cramp/storage/entity.storage";
import { IComponent, IEntity, IEntityStorage } from "../libs/cramp/type-definitions/interfaces";
import { v4 as uuidv4 } from 'uuid';
import GlobalEntitiesStorage from "../libs/cramp/storage/global-entities.storage";
import { EntityStorages } from "./types/entity-storages.enum";
import CarEntity from "./entities/car.entity";


export default class GameController {

  private _entityStorage: IEntityStorage<IEntity<IComponent>>

  public init(): void {
    /**
     * Создаем Сущности автомобилей и передаем их в созданное Хранилище
     */
    const carEntities: IEntity<IComponent>[] = this._createCarEntities(2);
    this._entityStorage = GlobalEntitiesStorage.create(EntityStorages.GAME);
    this._entityStorage.add(...carEntities);
  }

  public start(): void {

  }

  private _createCarEntities(count: number): IEntity<IComponent>[] {
    const entities: IEntity<IComponent>[] = [];

    for(let i = 0; i < count; i++) {
      const entity: IEntity<IComponent> = new CarEntity().create(uuidv4());
      entities.push(entity);
    }

    return entities;
  }

}