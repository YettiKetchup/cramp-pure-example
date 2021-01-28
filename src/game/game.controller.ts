import EntityStorage from "../libs/cramp/storage/entity.storage";
import { IComponent, ICrampModule, IEntity, IEntityStorage } from "../libs/cramp/type-definitions/interfaces";
import { v4 as uuidv4 } from 'uuid';
import GlobalEntitiesStorage from "../libs/cramp/storage/global-entities.storage";
import { EntityStorages } from "./types/entity-storages.enum";
import CarEntity from "./entities/car.entity";
import { CarEntityData } from "./types/entities-data.type";
import CarsData from "./data/cars";
import MovementModule from "./modules/movement-module/movement.module";
import { Direction2D } from "./modules/change-direction-module/types/change-direction-2d.type";
import ChangeDirectionModule from "./modules/change-direction-module/change-direction.module";



export default class GameController {

  private _entityStorage: IEntityStorage<IEntity<IComponent>> = null;
  private _changeDirectionModule: ICrampModule<Direction2D> = null;
  private _movementModule: ICrampModule<undefined> = null;

  public init(): void {
    /**
     * Создаем Сущности автомобилей и передаем их в созданное Хранилище.
     * Фабрике необходимы даннные для компонентов, поэтому мы их определим 
     * в отдельном объекте CarsData
     */
    const carEntities: IEntity<IComponent>[] = this._createCarEntities(CarsData);
    this._entityStorage = GlobalEntitiesStorage.create(EntityStorages.GAME);
    this._entityStorage.add(...carEntities);

    // Создание модуля отвечающего за изменение направления движения и обработку событий нажатия кдавиш управления
    this._changeDirectionModule = new ChangeDirectionModule(this._entityStorage);

    // Сооздание модуля, отвечающего за движение Сущностей машин.
    this._movementModule = new MovementModule(this._entityStorage);
  }

  public start(): void {
    /**
     * Инициализация модуля, отвечающего за смену направления движения Сущностей машин.
     * Внутри метода init() в этом модуле происходит подписка на события нажатия клавишь
     * и вызов Контейнера смены направления движения, когда эти события происходят.
     */
    this._changeDirectionModule.init();

    /**
     * Инициализация модуля, отвечающего за движение Сущностей машин.
     * Внутри метода init() в этом модуле происходит подписка на событие
     * изменение данных в Компоненте. Когда событие прозойдет, Контейнер и все
     * установленные в него Системы отработают.
     **/ 
    this._movementModule.init();
  }

  /**
   * Создание Сущностей через Фабрику. 
   */
  private _createCarEntities(data: CarEntityData[]): IEntity<IComponent>[] {
    const entities: IEntity<IComponent>[] = [];

    for(let i = 0; i < data.length; i++) {
      const id: string = uuidv4();
      const entity: IEntity<IComponent> = new CarEntity().create(id, data[i]);
      entities.push(entity);
    }

    return entities;
  }

}