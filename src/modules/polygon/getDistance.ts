import * as turf from '@turf/turf'
import { Edges, EdgeObj } from '../../types/Edge';

const getDistance = ({ edge, id }: EdgeObj) => {
    const [startPoint, endPoint] = edge
    const distance = turf.distance(
        turf.point(startPoint),
        turf.point(endPoint),
        { units: 'degrees' },
    )
    return { edgeId: id, distance: +distance.toString().slice(0, 19) }
}

export default (edges: Edges) => edges.map(getDistance)
