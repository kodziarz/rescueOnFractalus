import FieldOfView from "./FieldOfView";
import Map from "./Map";
import Mountain from "./Mountain";
import Path from "./Path";
import Point from "./Point";
import SETTINGS from "./settings.json";

/**
 * Draws view of 3d world on given {@link canvas:member}.
 */
export default class Camera {

    /**Canvas on which the view of the 3d world is drawn. */
    private canvas: HTMLCanvasElement;
    /**Context from {@link canvas} */
    private context: CanvasRenderingContext2D;
    /**Map where are the all 3d objects. */
    private map: Map;
    /**Object to determine whether objects are in the field of view. */
    private fieldOfView: FieldOfView;
    /**
     * Value used to calculate point's x coordinate from <-1,1> number from
     * {@link Observable~Observable}. Equal to half of canvas width.
     */
    private middleX: number;
    /**
     * Value used to calculate point's y coordinate from <-1,1> number from
     * {@link Observable~Observable}. Equal to half of canvas height.
     */
    private middleY: number;

    private renderedFramesInThisSecond: number = 0;
    private readonly minFrameRenderTime: number = 1000 / SETTINGS.maxFPS;


    constructor(canvas: HTMLCanvasElement, map: Map) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.fieldOfView = new FieldOfView(Math.PI / 2);
        this.map = map;
        this.middleX = canvas.width / 2;
        this.middleY = canvas.height / 2;

        setInterval(() => {
            console.log("rendered frames: ", this.renderedFramesInThisSecond);
            this.renderedFramesInThisSecond = 0;
        }, 1000);
        this.renderFrame();

    }
    /**Takes care of not using too much resources. */
    renderFrame = () => {
        let timestamp = Date.now();
        this.redrawView();
        this.renderedFramesInThisSecond++;
        let renderTime = Date.now() - timestamp;
        if (renderTime < this.minFrameRenderTime) {
            setTimeout(this.renderFrame, this.minFrameRenderTime - renderTime + 1);
        }
        else {
            setTimeout(this.renderFrame, 1);
        }
    };

    /**Redraws canvas. */
    redrawView() {

        //clear canvas
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        let visible = this.getObservablesToRender();
        visible.forEach((observable) => {
            if (observable instanceof Mountain) {
                let backgroundPaths = observable.renderPaths(this.fieldOfView);

                backgroundPaths.forEach((backgroundPath) => {
                    this.context.beginPath();
                    this.context.moveTo(
                        this.middleX + backgroundPath.points[0].x * this.middleX,
                        this.canvas.height - (this.middleY + backgroundPath.points[0].y * this.middleY)
                    );
                    for (let i = 1; i < backgroundPath.points.length; i++) {
                        this.context.lineTo(
                            this.middleX + backgroundPath.points[i].x * this.middleX,
                            this.canvas.height - (this.middleY + backgroundPath.points[i].y * this.middleY)
                        );
                    }
                    this.context.closePath();
                    this.context.fillStyle = "#ff00ff";
                    this.context.strokeStyle = "#000000";
                    this.context.lineWidth = 2;
                    this.context.fill();
                    this.context.stroke();
                });

                // edgesPaths.forEach((edgePath) => {
                //     this.context.beginPath();
                //     this.context.moveTo(
                //         this.middleX + edgePath.points[0].x * this.middleX,
                //         this.canvas.height - (this.middleY + edgePath.points[0].y * this.middleY)
                //     );
                //     for (let i = 1; i < edgePath.points.length; i++) {
                //         this.context.lineTo(
                //             this.middleX + edgePath.points[i].x * this.middleX,
                //             this.canvas.height - (this.middleY + edgePath.points[i].y * this.middleY)
                //         );
                //     }
                //     this.context.closePath();
                //     this.context.strokeStyle = "#000000";
                //     this.context.stroke();
                // });

            }
        });
    }

    private getObservablesToRender() {
        // console.log("this.map.getObjects(): ", this.map.getObjects());

        return this.map.getObjects().filter((observable) => {
            return this.fieldOfView.isVisible(observable);
        });
    }

}