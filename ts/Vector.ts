import Point from "./Point";

export default class Vector {
    initialPoint: Point;
    coordinates: Point;
    terminalPoint: Point;

    constructor(initialPoint: Point, coordinates: Point, terminalPoint?: Point) {
        this.initialPoint = initialPoint;
        this.coordinates = coordinates;
        if (terminalPoint != undefined && terminalPoint != undefined)
            this.terminalPoint = terminalPoint;
        else this.terminalPoint = initialPoint.add(coordinates);
    }

    /**
     * Determines cross product of two {@link Vector~Vector | Vectors}.
     * @param vector Second vector to calculate cross product.
     * @returns Cross product of vector on which the method is invoked and given vector with initial point in (0, 0, 0).
     */
    crossProduct(vector: Vector) {
        let initialPoint = new Point(0, 0, 0);
        return new Vector(initialPoint, new Point(
            this.coordinates.y * vector.coordinates.z - this.coordinates.z * vector.coordinates.y,
            this.coordinates.z * vector.coordinates.x - this.coordinates.x * vector.coordinates.z,
            this.coordinates.x * vector.coordinates.y - this.coordinates.y * vector.coordinates.x
        ));
    }

    /**
     * Determines dot product of two {@link Vector~Vector | Vectors}.
     * @param vector Second vector to calculate dot product.
     * @returns dot product of vector on which the method is invoked and given vector with initial point in (0, 0, 0).
     */
    dotProduct(vector: Vector) {
        return this.coordinates.x * vector.coordinates.x +
            this.coordinates.y * vector.coordinates.y +
            this.coordinates.z * vector.coordinates.z;
    }
}