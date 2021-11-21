import { ArrayOfPoints } from './Input'
import { Vertices } from './Vertex';
import { Edges } from './Edge';
import { Distances } from './Distance';

export type Polygon = {
    id: string,
    polygon: ArrayOfPoints,
    vertices: Vertices,
    edges: Edges,
    distances: Distances,
    updated?: boolean,
}

export type Polygons = Array<Polygon>

