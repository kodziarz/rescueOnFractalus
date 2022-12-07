import Point from "./Point";
import SETTINGS from "./settings.json";

/**
 * Contains information about line in space representing egde of a mountain.
 */
export default class Edge {

    points: Point[];
    constructor() {
        this.points = [];
    }

    /**@returns Deep copy of the object. */
    copy(): Edge {
        let edge = new Edge();
        edge.points = this.points.map((point) => { return point.copy(); });
        return edge;
    }

    static createRandomEdge(peak: Point, directionVector: Point) {

        if (directionVector.y != 1) throw new Error("direction Vector needs to have y coordinate equal to 1");

        let edge = new Edge();
        edge.points.push(peak);
        let lastPoint = edge.points[edge.points.length - 1];
        let unit = 1 / SETTINGS.verticalDensity;

        //scale vector
        let scaledVector = new Point(
            directionVector.x * unit,
            directionVector.y, //should be one
            directionVector.z * unit
        );

        while (lastPoint.y > 0) {
            let newPoint = new Point(
                lastPoint.x + scaledVector.x + (1 - Math.random() * 2) * unit,
                lastPoint.y - unit,
                lastPoint.z + scaledVector.z + (1 - Math.random() * 2) * unit
            );
            edge.points.push(newPoint);
            lastPoint = newPoint;
            //todo
        }

        console.log("generated Egde: ", edge);


        return edge;
    }
}