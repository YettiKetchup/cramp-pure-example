import { IComponent, ICrampModule, IEntity, IEntityStorage, ISystemsContainer } from "../../../libs/cramp/type-definitions/interfaces";
import ChangeDirection2DContainer from "./containers/change-direction.container";
import { Direction2D } from "./types/change-direction-2d.type";



export default class ChangeDirectionModule implements ICrampModule<Direction2D> {
  
  private _entityStorage: IEntityStorage<IEntity<IComponent>> = null;
  private _changeDirectionContainer: ISystemsContainer<Direction2D> = null;

  private _direction: Direction2D = {x: 0, y: 0};

  constructor(entityStorage: IEntityStorage<IEntity<IComponent>>) {
    this._entityStorage = entityStorage;
    this._changeDirectionContainer = new ChangeDirection2DContainer().create(this._entityStorage);
  }

  public init(): void {
    document.addEventListener('keydown', event => this._onKeyDown(event), false);
    document.addEventListener('keyup', event => this._onKeyUp(event), false);
  }

  public execute(data?: Direction2D): void {
    this._changeDirectionContainer.execute(data);
  }

  public destroy(): void {
    document.removeEventListener('keydown', event => this._onKeyDown(event), false);
    document.removeEventListener('keyup', event => this._onKeyUp(event), false);
  }

  private _onKeyDown(event: KeyboardEvent): void {
    if(event.key === 'ArrowLeft') { this._direction.x = -1; }
    if(event.key === 'ArrowRight') { this._direction.x = 1; }
    if(event.key === 'ArrowUp') { this._direction.y = 1; }
    if(event.key === 'ArrowDown') { this._direction.y = -1; }

    this.execute(this._direction);
  }

  private _onKeyUp(event: KeyboardEvent): void {
    if(event.key === 'ArrowLeft') { this._direction.x = 0; }
    if(event.key === 'ArrowRight') { this._direction.x = 0; }
    if(event.key === 'ArrowUp') { this._direction.y = 0; }
    if(event.key === 'ArrowDown') { this._direction.y = 0; }

    this.execute(this._direction);
  }

}