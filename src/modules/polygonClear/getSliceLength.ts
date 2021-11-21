import { getVertices, getEdges, getDistance } from '../polygon/index';
import { ArrayOfPoints } from '../../types/Input';

export default (slice: ArrayOfPoints) => {
    return getDistance(getEdges(getVertices(slice)))
        .map(({ distance }) => distance)
        .reduce((a,b) => a + b, 0)
}
