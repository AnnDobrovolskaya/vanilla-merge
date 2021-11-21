import { ArrayOfPoints, Input } from './types/Input';
import inputValidator from './modules/inputValidator/index';
import inputComposer from './modules/inputComposer/index';
import { iterate } from './modules/polygonIterator';

export default (polygons: Input) => {
    const completedPolygons = inputComposer(inputValidator(polygons))
    let boundaries: ArrayOfPoints | ArrayOfPoints[] = []
    try {
        boundaries = iterate(completedPolygons)
    } catch (e) {
        console.error(e)
    }
    return boundaries
}

