import Observable from "./Observable";
import Point from "./Point";
import Vector from "./Vector";

/**
 * Contains information about object on the map and provides methods to transform it.
 */
export default class Map {

    private objects: Observable[];
    constructor() {
        this.objects = [];
    }

    /**
     * Adds object to map.
     * @param object Object to add.
     */
    addObject(object: Observable) {
        this.objects.push(object);
    }

    /**
     * Removes object from map.
     * @param object Object to remove.
     * @returns True, if succeeded in removing the object. False, if the object is not present.
     */
    removeObject(object: Observable) {
        let index = this.objects.indexOf(object);
        if (index == -1)
            return false;
        this.objects.splice(index, 1);
        return true;
    }

    translate(vector: Point | Vector) {
        this.objects.forEach((object) => {
            object.translate(vector);
        });
    }

    rotate(vector: Point | Vector, angle: number) {
        this.objects.forEach((observable) => {
            observable.rotate(vector, angle);
        });
    }

    /**
     * Gets objects from the map.
     * @returns Array of objects from the map.
     */
    getObjects() {
        return this.objects;
    }
}