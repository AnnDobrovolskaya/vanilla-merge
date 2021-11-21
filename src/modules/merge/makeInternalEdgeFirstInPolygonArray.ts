import { isEqual } from 'lodash'
import { ArrayOfPoints } from '../../types/Input';
import { Edge } from '../../types/Edge';

export default (polygon: ArrayOfPoints, edge: Edge) => {
    const [firstPoint, lastPoint] = edge
    const firstPointIndex = polygon.indexOf(firstPoint)
    const secondPointIndex = polygon.indexOf(lastPoint)
    const lastArrayElementIndex = polygon.length - 1

    if (firstPointIndex === 0 &&
        secondPointIndex === firstPointIndex + 1 &&
        isEqual(polygon[lastArrayElementIndex], firstPoint)) {
        return polygon
    }
    return [...polygon.slice(firstPointIndex), ...polygon.slice(1, firstPointIndex), firstPoint]
}
