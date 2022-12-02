import Settings from "./settings.json"

/**
 * Manages the 2d User Interface surface of the application.
 */
export default class UIManager {

    /** Root element where the UI elements are placed in. */
    private rootDiv: HTMLDivElement

    private mainDiv: HTMLDivElement
    private canvas: HTMLCanvasElement

    constructor(rootDiv: HTMLDivElement) {
        this.rootDiv = rootDiv
        this.createUI()
    }

    /**
     * Creates all needed for UI purposes DOM elements.
     * @remarks Some created DOM elements are directly put to class fields (are not
     * returned anywhere).
     */
    private createUI() {

        this.mainDiv = document.createElement("div") as HTMLDivElement
        this.rootDiv.appendChild(this.mainDiv)
        this.mainDiv.id = "uiMainDiv"

        this.canvas = document.createElement("canvas") as HTMLCanvasElement
        this.mainDiv.appendChild(this.canvas)
        this.canvas.width = Settings.paneCanvasWidth
        this.canvas.height = Settings.paneCanvasHeight
        this.canvas.id = "paneCanvas"

        let cockpitDiv = document.createElement("div")
        this.mainDiv.appendChild(cockpitDiv)
        cockpitDiv.id = "cockpitDiv"
    }

    /**
     * @returns Canvas, on which the view outside the cockpit can be drawn.
     */
    getPaneCanvas() {
        return this.canvas
    }
}