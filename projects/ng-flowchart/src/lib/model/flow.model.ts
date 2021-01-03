import { NgFlowchartCanvasService } from '../ng-flowchart-canvas.service';
import { NgFlowchartStepComponent } from '../ng-flowchart-step/ng-flowchart-step.component';

export namespace NgFlowchart {
    export class Flow {
        constructor(private canvas: NgFlowchartCanvasService) {

        }

        toJSON() {
            return JSON.stringify({
                root: this.canvas.flow.rootStep.toJSON()
            });
        }

        /**
         * Returns the root step of the flow chart
         */
        getRoot() {
            return this.canvas.flow.rootStep;
        }

        /**
         * Finds a step in the flow chart by a given id
         * @param id 
         */
        getStep(id) {
            return this.canvas.flow.allSteps.find(child => child.id == id);
        }

        /**
         * Re-renders the canvas. Generally this should only be used in rare circumstances
         */
        render() {
            this.canvas.reRender();
        }

        /**
         * Clears all flow chart, reseting the current canvas
         */
        clear() {
            if (this.canvas.flow?.rootStep) {
                this.canvas.flow.rootStep.destroy(true, false);
                this.canvas.reRender();
            }

        }

    }    

    export class Options {
        /** The gap (in pixels) between flow steps*/
        stepGap?: number = 40;

        /** An inner deadzone radius (in pixels) that will not register the hover icon  */
        hoverDeadzoneRadius?: number = 20;

        /** Is the flow sequential? If true, then you will not be able to drag parallel steps */
        isSequential?: boolean = false;

        /** When true steps will not snap to 'pretty' positions and instead remain where dropped */
        rootPosition?: 'TOP_CENTER' | 'CENTER' | 'DEFAULT' = 'TOP_CENTER';

        showSnapIndicators?: boolean = true;

        /** Theme/color of the drop icons and connectors */
        theme?: {
            connectors?: string,
            dropIcon?: string,
            dropIconBackground?: string
        } = {
                connectors: 'lightgrey',
                dropIcon: 'darkred',
                dropIconBackground: 'rgb(192, 123, 123)'
            }

    }

    // export type DropEvent = {
    //     step: Step,
    //     adjacent?: Step,
    //     position?: DropPosition,
    //     status: DropStatus,
    //     error?: string
    // }

    export type DropTarget = {
        step: NgFlowchartStepComponent,
        position: DropPosition
    }

    export type DropStatus = 'SUCCESS' | 'PENDING' | 'FAILED';
    export type DropPosition = 'RIGHT' | 'LEFT' | 'BELOW' | 'ABOVE';

    export type Callbacks = {
        // canAddStep?: (dropCandidate: DropEvent) => boolean;
        // canMoveStep?: (moveCandidate: DropEvent) => boolean;
        // // canDeleteStep?: (step: Step) => boolean;
        // onDropError?: (drop: DropEvent) => void;

        // //TODO
        // onDropStep?: (drop: DropEvent) => void;
        // onMoveStep?: (drop: DropEvent) => void;
    };
}




