import { ComposedPolygon } from './types/composePolygon';

export default (polygon: ComposedPolygon) => {
    const { bEdge, aEdge, bOperand, aOperand } = polygon
    const lastPointBEdge = bEdge[1]
    const lastPointAEdge = aEdge[1]
    const indexOfLastPointBEdge = bOperand.indexOf(lastPointBEdge)
    const indexOfLastPointAEdge = aOperand.indexOf(lastPointAEdge)
    return [...bOperand.slice(indexOfLastPointBEdge), ...aOperand.slice(indexOfLastPointAEdge + 1)]
}
