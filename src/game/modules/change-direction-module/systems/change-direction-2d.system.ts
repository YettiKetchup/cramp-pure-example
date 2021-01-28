import ComponentChangesController from "../../../../libs/cramp/component-changes-controller/component-changes.controller";
import BaseSystem from "../../../../libs/cramp/core/system/base.system";
import { IComponent, IEntity } from "../../../../libs/cramp/type-definitions/interfaces";
import { ComponentFilter } from "../../../../libs/cramp/type-definitions/types";
import Direction2DComponent from "../../movement-module/components/direction-2d.component";
import { Direction2D } from "../types/change-direction-2d.type";



/**
 * Данная Система будет вызвана в тот момент, когда пользователь нажмет на клавишу передвижения машин.
 * Из особенностей Системы можн овыделить то, что она принимает некоторые данные в метод execute()
 * и то, что она не меняет данные Компонента напрямую. Для изменения данных Система использует
 * статический класс ComponentChangesController, уоторый уведомит всех подписчиков об измнениях.
 * В данном случае, подписчиком является MovementModule, который при возникновении события
 * запустит в работу Move2DContainer.
 **/ 

export default class ChangeDirection2DSystem extends BaseSystem<Direction2D, IEntity<IComponent>> {

  protected readonly componentFilter: ComponentFilter = {
    include: [Direction2DComponent]
  }

  public execute(entities: IEntity<any>[], data?: Direction2D): void {
    for(let i = 0; i < entities.length; i++) {
      ComponentChangesController.change(entities[i], Direction2DComponent, {x: data.x, y: data.y})
    }
  }

}