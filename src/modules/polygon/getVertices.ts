import * as turf from '@turf/turf'
import { ArrayOfPoints, Point } from '../../types/Input';

type TempVertexObj = {
    angle: number,
    current: Point,
}
type CompletedPolygons = Array<TempVertexObj>

const completePolygonDataWithAngle = (acc: CompletedPolygons, current: Point, currentIndex: number, array: ArrayOfPoints) => {
    if (currentIndex === 0) {
        acc.push({ current, angle: turf.angle(array[array.length - 2], current, array[currentIndex + 1]) })
        return acc
    }
    if (currentIndex === array.length - 1) {
        acc.push({ current, angle: turf.angle(array[currentIndex - 1], current, array[1]) })
        return acc
    }
    acc.push({ current, angle: turf.angle(array[currentIndex - 1], current, array[currentIndex + 1]) })
    return acc
}

const onlyVertices = ({ angle }: TempVertexObj) => angle >= 181 || angle <= 177
const destructurePoint = ({ current }: TempVertexObj) => current

export default (polygon: ArrayOfPoints) => {
    return polygon
        .reduce(completePolygonDataWithAngle, [])
        .filter(onlyVertices)
        .map(destructurePoint)
}
