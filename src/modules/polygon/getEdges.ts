import { isEqual } from 'lodash'
import { uuid } from 'uuidv4'
import { Vertex, Vertices } from '../../types/Vertex';
import { Edges } from '../../types/Edge';

const getEdge = (edges: Edges, current: Vertex, currentIndex: number, input: Vertices) => {
    if (currentIndex === input.length - 1 && isEqual(current, input[0])) return edges
    if (currentIndex === input.length - 1) {
        edges.push({ edge: [current, input[0]], id: uuid() })
        return edges
    }
    edges.push({ edge: [current, input[currentIndex + 1]], id: uuid() })
    return edges
}

export default (vertices: Vertices) => vertices.reduce(getEdge, [])
