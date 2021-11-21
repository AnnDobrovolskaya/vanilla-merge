import { isEqual } from 'lodash';
import { Input, PolygonObj } from '../../types/Input';

const validate = (validated: Input, polygon: PolygonObj, currentIndex: number) => {
    if (currentIndex === 0) {
        validated.push(polygon)
        return validated
    }
    const alreadyInArray = validated.find((secondPolygon) => isEqual(secondPolygon, polygon))
    if (alreadyInArray) return validated
    validated.push(polygon)
    return validated
}

export default (data: Input) => data.reduce(validate, [])
