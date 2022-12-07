import Vector from "./Vector";

/**
 * Contains 3-dimentional position of specific point.
 */
export default class Point {

    x: number;
    y: number;
    z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * Moves Point along vector.
     * @param vector Vector along which the Point should be moved.
     * @returns New Point calculated from Point on which the method is invoked and given vector.
     */
    add(vector: Vector): Point;
    /**
     * Adds two Points.
     * @param point Point to add to Point on which the method is invoked.
     * @returns New Point with coordinates calculated as a sum of respective coordinates of given Points.
     */
    add(point: Point): Point;

    /**@internal */
    add(input: Point | Vector) {
        if (input instanceof Point)
            return new Point(
                this.x + input.x,
                this.y + input.y,
                this.z + input.z);
        else
            return new Point(
                this.x + input.coordinates.x,
                this.y + input.coordinates.y,
                this.z + input.coordinates.z);
    }

    /**
     * Creates {@link Vector~Vector} as a subtraction between point on which the method is
     * invoked and given point.
     * @param point Initial point of result {@link Vector}
     * @returns Vector pointing form a point on which the method is invoked to the given point.
     */
    subtract(point: Point) {
        return new Vector(point, new Point(
            this.x - point.x,
            this.y - point.y,
            this.z - point.z
        ));
    }

    /** @returns New point with all coordinates multiplied by -1. */
    negate() {
        return new Point(-this.x, -this.y, -this.z);
    }

    /**
     * Returns new point rotated around center of coordinate system.
     * @param angleAroundX Angle (in radians) through whitch the point is rotated around
     * X axis (counterclockwise).
     * @param angleAroundY Angle (in radians) through whitch the point is rotated around
     * Y axis (counterclockwise).
     * @param angleAroundZ Angle (in radians) through whitch the point is rotated around
     * Z axis (counterclockwise).
     * @returns New rotated point.
     */
    rotate(angleAroundX: number, angleAroundY: number, angleAroundZ: number) {
        let result = new Point(this.x, this.y, this.z);
        if (angleAroundX != 0) {
            result.z = this.z * Math.cos(angleAroundX) - this.y * Math.sin(angleAroundX);
            result.y = this.z * Math.sin(angleAroundX) + this.y * Math.cos(angleAroundX);
        }
        if (angleAroundY != 0) {
            result.x = this.x * Math.cos(angleAroundY) - this.z * Math.sin(angleAroundY);
            result.z = this.x * Math.sin(angleAroundY) + this.z * Math.cos(angleAroundY);
        }
        if (angleAroundZ != 0) {
            result.y = this.y * Math.sin(angleAroundZ) + this.x * Math.cos(angleAroundZ);
            result.x = this.y * Math.cos(angleAroundZ) - this.x * Math.sin(angleAroundZ);

        }
        return result;
    }

    /**@returns Deep copy of the object */
    copy(): Point {
        return new Point(this.x, this.y, this.z);
    }

}