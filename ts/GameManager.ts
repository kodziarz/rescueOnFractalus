import Camera from "./Camera";
import Map from "./Map";
import Mountain from "./Mountain";
import UIManager from "./UIManager";
import SETTINGS from "./settings.json";
import Point from "./Point";
import UserInteractionManager from "./UserInteractionManager";

/**
 * Contains and coordinates all components which provide the game functionality.
 */
export default class GameManager {

    private uiManager: UIManager;
    private map: Map;
    private camera: Camera;
    private userInteractionManager: UserInteractionManager;

    private playerVelocity: number = SETTINGS.initialVelocity;
    private playerMovingInterval: NodeJS.Timer;
    private playerMovingIntervalDelay: number = 1000 / SETTINGS.moveFrequency;

    constructor() {
        this.uiManager = new UIManager(document.getElementById("main") as HTMLDivElement);
        this.map = new Map();
        this.map.addObject(Mountain.createRandomMountain());
        this.camera = new Camera(this.uiManager.getPaneCanvas(), this.map);
        this.userInteractionManager = new UserInteractionManager();
        this.startMoving();
    }

    private startMoving() {
        this.playerMovingInterval = setInterval(() => {
            let resultantVector = new Point(0, 0, -this.playerVelocity / SETTINGS.moveFrequency);
            this.map.translate(resultantVector);
            // console.log("this.userInteractionManager.rotationVector: ", this.userInteractionManager.rotationVector);

            this.map.rotate(this.userInteractionManager.rotationVector, SETTINGS.baseRotationAngle / SETTINGS.moveFrequency);
            if (this.userInteractionManager.getAcceleration() > 0)
                this.playerVelocity++;
            else if (this.userInteractionManager.getAcceleration() < 0)
                this.playerVelocity--;

        }, this.playerMovingIntervalDelay);
    }
}