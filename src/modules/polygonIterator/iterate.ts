import { isEmpty } from 'lodash';
import { uuid } from 'uuidv4';
import step from '../step';
import { merge } from '../merge/index';
import { clearInternalEdge } from '../polygonClear';
import { updateVertices } from '../verticesUpdate';
import {
    getVertices,
    getEdges,
    getDistance,
} from '../polygon';
import { ArrayOfPoints } from '../../types/Input';
import { Polygons } from '../../types/Polygon';

type Boundaries = ArrayOfPoints | Array<ArrayOfPoints>

const iterate = (polygons: Polygons ): Boundaries => {
    if (polygons.length === 2) {
        const merged = merge(polygons[0], polygons[1])
        if (merged.separated) {
            return merged.coordinates.map(clearInternalEdge)
        }
        return [clearInternalEdge(merged.coordinates)]
    }

    const unionStep = step(polygons)
    if (isEmpty(unionStep) && polygons[0].updated) {
        return polygons.map(({ polygon }) => polygon)
    }
    if (isEmpty(unionStep)) {
        const polygonsWithUpdatedVertices = updateVertices(polygons)
        return iterate(polygonsWithUpdatedVertices)
    }

    let filteredPolygons = [...polygons]
    const union = unionStep.map(pair => {
        const { current, secondOperand } = pair
        const polygon = clearInternalEdge(merge(current, secondOperand).coordinates as ArrayOfPoints)
        const vertices = getVertices(polygon)
        const edges = getEdges(vertices)
        const distances = getDistance(edges)
        filteredPolygons = filteredPolygons.filter(p => p.id !== current.id && p.id !== secondOperand.id)
        return {
            id: uuid(),
            union: true,
            polygon,
            vertices,
            edges,
            distances,
        }
    })

    return iterate([...filteredPolygons, ...updateVertices(union)])
}

export default iterate
