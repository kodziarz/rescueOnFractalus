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
        this.adjustToNewVerticesValues();
    }

    /**
     * Determines whether the face is front-facing or back-facing.
     * @returns True if face is front-facing to the camera.
     */
    isFrontFacing() {
        let cameraToFaceVector = this.middle.subtract(new Point(0, 0, 0));
        return cameraToFaceVector.dotProduct(this.normal) < 0;
    }

    /**
     * Recalculates inner values such as {@link normal} vector.
     */
    adjustToNewVerticesValues() {
        this.middle = new Point(
            (this.vertexA.x + this.vertexB.x + this.vertexC.x) / 3,
            (this.vertexA.y + this.vertexB.y + this.vertexC.y) / 3,
            (this.vertexA.z + this.vertexB.z + this.vertexC.z) / 3
        );

        let vectorAB = this.vertexB.subtract(this.vertexA);
        let vectorAC = this.vertexC.subtract(this.vertexA);
        this.normal = vectorAB.crossProduct(vectorAC);
        this.normal.initialPoint = this.middle;
    }

    translate(vector: Point | Vector) {
        if (vector instanceof Point) {
            this.middle = this.middle.add(vector);
            this.normal.initialPoint = this.middle;
            this.normal.terminalPoint = this.normal.initialPoint.add(this.normal.coordinates);
        } else { //vector instanceof Vector
            this.middle = this.middle.add(vector);
            this.normal.initialPoint = this.middle;
            this.normal.terminalPoint = this.normal.initialPoint.add(this.normal.coordinates);
        }
    }

    rotate(angleAroundX: number, angleAroundY: number, angleAroundZ: number) {
        this.vertexA = this.vertexA.rotate(angleAroundX, angleAroundY, angleAroundZ);
        this.vertexB = this.vertexB.rotate(angleAroundX, angleAroundY, angleAroundZ);
        this.vertexC = this.vertexC.rotate(angleAroundX, angleAroundY, angleAroundZ);
        this.middle = this.middle.rotate(angleAroundX, angleAroundY, angleAroundZ);
        this.normal.initialPoint = this.middle;
        this.normal.terminalPoint = this.normal.terminalPoint.rotate(angleAroundX, angleAroundY, angleAroundZ);
        this.normal.coordinates = this.normal.terminalPoint.add(this.normal.initialPoint.negate());
    }
}