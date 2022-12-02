import Point from "./Point";
import SETTINGS from "./settings.json";

/**Emits evnts connected to user's interaction. */
export default class UserInteractionManager {

    /**
     * Stores a resultant vector of all pressed keys determining the direction to turn.
     * Its dimentions are only 0s or 1s.
     */
    readonly rotationVector: Point;
    private acceleration: number;

    constructor() {

        this.rotationVector = new Point(0, 0, 0);
        this.acceleration = 0;

        window.onkeydown = (event) => {
            switch (event.key) {
                case SETTINGS.controlKeys.TURN_LEFT:
                    this.rotationVector.y = -1;
                    break;
                case SETTINGS.controlKeys.TURN_DOWN:
                    this.rotationVector.x = 1;
                    break;
                case SETTINGS.controlKeys.TURN_RIGHT:
                    this.rotationVector.y = 1;
                    break;
                case SETTINGS.controlKeys.TURN_UP:
                    this.rotationVector.x = -1;
                    break;
                case SETTINGS.controlKeys.ACCELERATE:
                    this.acceleration = 1;
                    break;
                case SETTINGS.controlKeys.SLOW_DOWN:
                    this.acceleration = -1;
                    break;
            }
        };
        window.onkeyup = (event) => {
            switch (event.key) {
                case SETTINGS.controlKeys.TURN_LEFT:
                case SETTINGS.controlKeys.TURN_RIGHT:
                    this.rotationVector.y = 0;
                    break;
                case SETTINGS.controlKeys.TURN_DOWN:
                case SETTINGS.controlKeys.TURN_UP:
                    this.rotationVector.x = 0;
                    break;
                case SETTINGS.controlKeys.ACCELERATE:
                case SETTINGS.controlKeys.SLOW_DOWN:
                    this.acceleration = 0;
                    break;
            }
        };
    }

    getAcceleration() {
        return this.acceleration;
    }

}