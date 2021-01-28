import { IComponent } from "../../../../libs/cramp/type-definitions/interfaces";



export default class Speed2DComponent implements IComponent {
    
    public x: number = 0;
    public y: number = 0;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
    
}