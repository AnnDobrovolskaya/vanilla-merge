import { ArrayOfPoints } from '../../../types/Input';
import { Edge } from '../../../types/Edge';

export type ComposedPolygon = {
    aOperand: ArrayOfPoints;
    bOperand: ArrayOfPoints;
    aEdge: Edge;
    bEdge: Edge;
}
