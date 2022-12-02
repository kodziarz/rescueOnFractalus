import Edge from "./Edge";
import FieldOfView from "./FieldOfView";
import Path from "./Path";
import Point from "./Point";
import Vector from "./Vector";

/**
 * Contains set of methods which every 3d object has to implement, to be drawn by {@link Camera~Camera}.
 */
export default interface Observable {

    /**
     * Used by {@link Camera~Camera}, to determine, whether the object is in
     * {@link FieldOfView~FieldOfView} or not. If none of these {@link Point~Point | Points}
     * is inside, object will not be rendered.
     * @returns List of extreme {@link Point~Point | Points}.
     */
    getExtremePoints(): Point[];
    getEgdes(): Edge[];
    /**
     * @param fieldOfView Field of view of {@link Camera~Camera}.
     * @returns List of {@link Path~Path | Paths} for canvas to draw projected on plane
     * z - 1 = 0. These {@link Path~Path | Paths} are treated as closed (will be
     * filled with some color inside).
     */
    renderPaths(fieldOfView: FieldOfView): Path[];
    /**
     * Translates the object along given vector.
     * @param vector Vector along which the object will be translated.
     */
    translate(vector: Point | Vector): void;
    /**
     * Rotates the object around center of coordinate system.
     * @param vector Direction of the rotation (positive means anticlockwise looking
     * in the direction of axis, negative clockwise and zero - no rotation).
     * X coordinate means rotation around X axis, Y around Y axis and Z axis is ignored.
     * @param angle Angle through which the object is rotated.
     */
    rotate(vector: Point | Vector, angle: number): void;

}