import EntityStorage from "../libs/cramp/storage/entity.storage";
import { IComponent, IEntity, IEntityStorage } from "../libs/cramp/type-definitions/interfaces";

export default class GameController {

  private _entityStorage: IEntityStorage<IEntity<IComponent>>

  public init(): void {
    this._entityStorage = new EntityStorage();
  }

  public start(): void {

  }

}