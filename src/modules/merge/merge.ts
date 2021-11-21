import { compact } from 'lodash';
import { Polygon } from '../../types/Polygon';
import { MergeResult } from '../../types/Merge';
import makeInternalEdgeFirstInPolygonArray from '../merge/makeInternalEdgeFirstInPolygonArray';
import composePolygon from '../merge/composePolygon';

export default (current: Polygon, secondOperand: Polygon): MergeResult => {
    const [internalEdge] = compact(current.distances.map(cd => {
        const sd = secondOperand.distances.find(d => d.distance === cd.distance)
        if (sd) return { sd, cd }
        return null
    }))
    if (!internalEdge) return { separated: true, coordinates: [current.polygon, secondOperand.polygon] }
    const currentEdgeObj = current.edges.find(e => e.id === internalEdge.cd.edgeId)
    const secondEdgeObj = secondOperand.edges.find(e => e.id === internalEdge.sd.edgeId)

    const formattedA = makeInternalEdgeFirstInPolygonArray(current.polygon, currentEdgeObj!.edge)
    const formattedB = makeInternalEdgeFirstInPolygonArray(secondOperand.polygon, secondEdgeObj!.edge)
    return {
        separated: false,
        coordinates: composePolygon(
            {
                aOperand: formattedA,
                bOperand: formattedB,
                aEdge: currentEdgeObj!.edge,
                bEdge: secondEdgeObj!.edge
            },
        )
    }
}
