import Point from "./Point";

/**
 * Contains list of {@link Point~Point | Points}.
 * Used by {@link Camera~Camera}, to draw on Canvas.
 */
export default class Path {
    points: Point[];
    constructor() {
        this.points = [];
    }


}