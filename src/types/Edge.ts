import { Vertex } from './Vertex';

export type Edge = [Vertex, Vertex]
export type EdgeObj = { edge: Edge, id: string }
export type Edges = Array<EdgeObj>
