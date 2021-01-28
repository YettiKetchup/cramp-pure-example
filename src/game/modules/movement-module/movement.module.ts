import ComponentChangesController from "../../../libs/cramp/component-changes-controller/component-changes.controller";
import { ComponentEvent } from "../../../libs/cramp/type-definitions/component-event.enum";
import { IComponent, ICrampModule, IEntity, IEntityStorage, ISystemsContainer } from "../../../libs/cramp/type-definitions/interfaces";
import Direction2DComponent from "./components/direction-2d.component";
import Position2DComponent from "./components/position-2d.component";
import Speed2DComponent from "./components/speed-2d.component";
import Move2DContainer from "./containers/move-2d.container";



export default class MovementModule implements ICrampModule<undefined> {
  
  private _entityStorage: IEntityStorage<IEntity<IComponent>> = null;
  private _moveContainer: ISystemsContainer<undefined> = null;

  constructor(entityStorage: IEntityStorage<IEntity<IComponent>>) {
    this._entityStorage = entityStorage;
    this._moveContainer = new Move2DContainer().create(this._entityStorage);
  }

  /**
   * При инициализации Моудля происходит подписка на событие изменения данных в Компоненте
   * Direction2DComponent, который находится в Сущностях у которых есть Компоненты
   * Direction2DComponent, Speed2DComponent, Position2DComponent.
   * Когда событие произойдет, проихойдет выподнение Контейнера со всеми 
   * Системами внутри. Каждая СИстема будет выполнена поочередно
   */
  public init(): void {
    ComponentChangesController.subscribe({
      on: ComponentEvent.CHANGE,
      in: [Direction2DComponent, Speed2DComponent, Position2DComponent],
      component: Direction2DComponent,
      execute: () => this.execute()
    });
  }

  public execute(): void {
    this._moveContainer.execute()
  }

  public destroy(): void {
    ComponentChangesController.unsubscribe({
      on: ComponentEvent.CHANGE,
      in: [Direction2DComponent, Speed2DComponent, Position2DComponent],
      component: Direction2DComponent,
      execute: () => this.execute()
    });
  }

}