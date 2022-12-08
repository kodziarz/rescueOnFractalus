import Edge from "./Edge";
import Face from "./Face";
import FieldOfView from "./FieldOfView";
import Observable from "./Observable";
import Path from "./Path";
import Point from "./Point";
import Vector from "./Vector";

/**
 * Contains mountain shape.
 */
export default class Mountain implements Observable {

    private peak: Point;
    /**
     * Edges of mountain. Should be in anticlockwise order (otherwise the {@link faces:member}
     *  will be facing towards interior of the mountain).
     */
    private edges: Edge[];
    /**Faces of mountain. They contain peak and end points of two neighbour edges.*/
    private faces: Face[];

    private tmp: number = 0;

    /**
     * Creates new Mountain.
     * @param peak Peak {@link Point~Pont} of the mountain.
     * @param edges Edges of the mointain. Need to start in the peak.
     * @throws Error if any edge does not start in the peak.
     */
    constructor(peak: Point, edges: Edge[]) {

        if (!edges.every((edge) => { return edge.points[0] == peak; }))
            throw new Error("All edges of the mountain need to start in the peak point.");

        this.peak = peak;
        this.edges = edges;

        this.faces = this.edges.map((edge, index, edges) => {
            let edge1: Edge = index > 0 ? edges[index - 1] : edges[edges.length - 1];
            return new Face(
                edge1.points[edge1.points.length - 1],
                peak,
                edge.points[edge.points.length - 1]);
        });
        //console.log("this.faces: ", this.faces);

    }

    getExtremePoints(): Point[] {
        let result = [];
        result.push(this.peak);
        this.edges.forEach((edge) => {
            result.push(edge.points[edge.points.length - 1]);
        });
        return result;
    }

    getEgdes(): Edge[] {
        return this.edges;
    }

    renderPaths(fieldOfView: FieldOfView): Path[] {

        let backgroundPaths: Path[] = [];

        // get proper edges
        // let edgesToProject = [...this.edges.map((edge) => { return edge.copy(); })];
        let edgesToProject = new Set<Edge>();


        let firstEdge = this.edges[0].copy();
        let secondEdge = this.edges[this.edges.length - 1].copy();

        firstEdge.points = firstEdge.points.filter((point) => { return fieldOfView.contains(point); });
        secondEdge.points = secondEdge.points.filter((point) => { return fieldOfView.contains(point); });

        let isFacingCount = 0;
        if (this.tmp % 100 == 1) console.log("this.faces: ", this.faces.map((face) => { return face.copy(); }));
        this.tmp++;

        this.faces.forEach((face, index) => {
            if (face.isFrontFacing()) {
                isFacingCount++;
                // let earlierIndex = index > 0 ? index - 1 : this.edges.length - 1;

                edgesToProject.add(firstEdge);
                edgesToProject.add(secondEdge);
                let backgroundPath = new Path();
                backgroundPath.points.push(...firstEdge.points);
                backgroundPath.points.push(...[...secondEdge.points].reverse());
                backgroundPaths.push(backgroundPath);
                secondEdge = firstEdge;
                firstEdge = this.edges[index < this.edges.length - 1 ? index + 1 : this.edges.length - 1].copy();
                firstEdge.points = firstEdge.points.filter((point) => { return fieldOfView.contains(point); });
            }
        });
        //console.log("isFacingCount: ", isFacingCount);

        backgroundPaths = backgroundPaths.filter((backgroundPath) => { return backgroundPath.points.length > 0; });

        //project points from proper edges
        // transforms also points from backgroundPath, because they share points
        edgesToProject.forEach((edge) => {

            edge.points.forEach((point, index, points) => {
                point.x /= point.z;
                point.y /= point.z;
                point.z = 1;
            });
        });


        // renderowanie wektorów
        this.faces.forEach((face) => {
            let vectorPoints = face.getNormalVectorPoints();
            let path = new Path();
            path.points.push(...vectorPoints);
            path.points.forEach((point, index, points) => {
                point.x /= point.z;
                point.y /= point.z;
                point.z = 1;
            });
            backgroundPaths.push(path);
        });

        return backgroundPaths;
    }

    translate(vector: Point | Vector): void {
        if (vector instanceof Point) {
            this.peak.move(vector);

            // //if (this.edges[0].points[0] != this.peak) console.error("to nie jest to samo kurczę");
            // if (this.tmp % 120 == 0) {
            //     console.log("peak: ", this.peak.copy());
            //     console.log("this.edges[0].points[0]: ", this.edges[0].points[0]);
            // }

            this.edges.forEach((edge) => {
                for (let i = 1; i < edge.points.length; i++) {
                    edge.points[i].move(vector);
                }
            });
            this.faces.forEach((face) => { face.adjustToNewVerticesValues(); });
        } else { //vector instanceof Vector
            this.peak.move(vector.coordinates);

            // //if (this.edges[0].points[0] != this.peak) console.error("to nie jest to samo kurczę");
            // if (this.tmp % 120 == 0) {
            //     console.log("peak: ", this.peak.copy());
            //     console.log("this.edges[0].points[0]: ", this.edges[0].points[0]);
            // }

            this.edges.forEach((edge) => {
                for (let i = 1; i < edge.points.length; i++) {
                    edge.points[i].move(vector.coordinates);
                }
            });
            this.faces.forEach((face) => { face.adjustToNewVerticesValues(); });
        }
    }

    rotate(vector: Point | Vector, angle: number): void {
        if (vector instanceof Point) {
            this.peak.rotateDestructively(
                vector.x * angle,
                vector.y * angle,
                vector.z * angle
            );
            this.edges.forEach((edge) => {
                for (let i = 1; i < edge.points.length; i++) {
                    edge.points[i].rotateDestructively(
                        vector.x * angle,
                        vector.y * angle,
                        vector.z * angle
                    );
                }
            });
            this.faces.forEach((face) => { face.adjustToNewVerticesValues(); });
        } else { //vector instanceof Vector
            this.peak.rotateDestructively(
                vector.coordinates.x * angle,
                vector.coordinates.y * angle,
                vector.coordinates.z * angle
            );
            this.edges.forEach((edge) => {
                for (let i = 1; i < edge.points.length; i++) {
                    edge.points[i].rotateDestructively(
                        vector.coordinates.x * angle,
                        vector.coordinates.y * angle,
                        vector.coordinates.z * angle
                    );
                }
            });
            this.faces.forEach((face) => { face.adjustToNewVerticesValues(); });
        }
    }

    static createRandomMountain() {
        let peak = new Point(0, 10, 50);
        let edge1 = Edge.createRandomEdge(peak, new Point(-1, 1, 1));
        // edge1.points.push(peak, new Point(-40, -60, 150));
        let edge2 = Edge.createRandomEdge(peak, new Point(-0.5, 1, -1));
        // edge2.points.push(peak, new Point(10, -60, 60));
        let edge3 = Edge.createRandomEdge(peak, new Point(1, 1, -1));
        // edge3.points.push(peak, new Point(50, -60, 110));

        if (peak != edge1.points[0]) console.error("zły początek krawędzi");
        if (peak != edge2.points[0]) console.error("zły początek krawędzi");
        if (peak != edge3.points[0]) console.error("zły początek krawędzi");
        return new Mountain(peak, [edge1, edge2, edge3]);
    }

}