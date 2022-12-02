import Observable from "./Observable";
import Point from "./Point";

/**Used to determine what is inside field of view of the {@link Camera~Camera} */
export default class FieldOfView {
    /**View angle in radians. */
    readonly viewAngle: number;
    /**Tangens of view angle (it is often used). */
    readonly viewAngleTangent: number;

    constructor(viewAngle: number) {
        this.viewAngle = viewAngle;
        this.viewAngleTangent = Math.tan(viewAngle);
    }

    /**
     * Determines, whether the given object is in field of view.
     * @param object Object to examine.
     * @returns True, if object is in field of view.
     */
    isVisible(object: Observable) {

        return !object.getExtremePoints().every((point) => {
            return !this.contains(point);
        });
    }

    /**
     * Determine wheather the given point is inside field of view.
     * @param point Checked point.
     * @returns True if point is visible.
     */
    contains(point: Point) {

        return point.z > 0
            && Math.abs(point.x / point.z) < this.viewAngleTangent
            && Math.abs(point.y / point.z) < this.viewAngleTangent;
    }

}