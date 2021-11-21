import coordinatesFromEdges from '../verticesUpdate/coordinatesFromEdges';
import { Polygons, Polygon } from '../../types/Polygon';

const updateVertices = (e: Polygon) => ({
    ...e,
    polygon: coordinatesFromEdges(e.edges),
    updated: true,
})

export default (polygons: Polygons) => polygons.map(updateVertices)
