import Point from "./Point";
import Vector from "./Vector";

/**
 * Contains data about a triangular single-sided face.
 */
export default class Face {
    private vertexA: Point;
    private vertexB: Point;
    private vertexC: Point;

    private middle: Point;
    private normal: Vector;

    constructor(vertexA: Point, vertexB: Point, vertexC: Point) {
        this.vertexA = vertexA;
        this.vertexB = vertexB;
        this.vertexC = vertexC;
        this.middle = new Point(
            (this.vertexA.x + vertexB.x + vertexC.x) / 3,
            (this.vertexA.y + vertexB.y + vertexC.y) / 3,
            (this.vertexA.z + vertexB.z + vertexC.z) / 3
        );

        let vectorAB = vertexB.subtract(vertexA);
        let vectorAC = vertexC.subtract(vertexA);
        this.normal = vectorAB.crossProduct(vectorAC);
        this.normal.initialPoint = this.middle;
    }

    /**
     * Determines whether the face is front-facing or back-facing.
     * @returns True if face is front-facing to the camera.
     */
    isFrontFacing() {
        let cameraToFaceVector = this.middle.subtract(new Point(0, 0, 0));
        return cameraToFaceVector.dotProduct(this.normal) < 0;
    }
}