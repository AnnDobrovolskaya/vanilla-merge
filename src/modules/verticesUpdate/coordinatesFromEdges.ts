import { isEqual } from 'lodash'
import { Edges } from '../../types/Edge';
import { ArrayOfPoints } from '../../types/Input';

export default (edges: Edges) => {
    return edges.reduce((coordinates: ArrayOfPoints, current, currentIndex, input) => {
        if (currentIndex === 0) {
            coordinates.push(...current.edge)
            return coordinates
        }
        if (currentIndex === input.length - 1) {
            coordinates.push(coordinates[0])
            return coordinates
        }
        const [startPoint, endPoint] = current.edge
        const duplicatesStartPoint = coordinates.find(cd => isEqual(cd, startPoint))
        const duplicatesEndPoint = coordinates.find(cd => isEqual(cd, endPoint))
        if (!duplicatesStartPoint) {
            coordinates.push(startPoint)
        }
        if (!duplicatesEndPoint) {
            coordinates.push(endPoint)
        }
        return coordinates
    }, [])
}
