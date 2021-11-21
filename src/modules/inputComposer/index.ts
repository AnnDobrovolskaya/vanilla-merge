import { uuid } from 'uuidv4';
import { getVertices, getEdges, getDistance } from './../polygon/index';
import { Input, PolygonObj } from '../../types/Input';

const completeInputData = (polygon: PolygonObj) => {
    const vertices = getVertices(polygon)
    const edges = getEdges(vertices)
    const distances = getDistance(edges)
    return {
        id: uuid(),
        polygon,
        vertices,
        edges,
        distances,
    }
}

export default (polygons: Input) => polygons.map(completeInputData)
