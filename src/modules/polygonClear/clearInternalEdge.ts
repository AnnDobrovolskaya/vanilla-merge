import { isEqual } from 'lodash';
import getSliceLength from '../polygonClear/getSliceLength';
import { ArrayOfPoints } from '../../types/Input';

export default (polygon: ArrayOfPoints) => {
    return polygon.reduce((cleared, current) => {
        if (isEqual(current, cleared[0])) return cleared
        if (isEqual(current, cleared[cleared.length - 1])) return cleared
        const indexInCleared = cleared.indexOf(current)
        const duplicate = cleared.find(e => isEqual(e, current) && cleared.indexOf(e) !== indexInCleared)
        if (!duplicate) return cleared
        const indexOfDuplicate = cleared.indexOf(duplicate)
        const sliceFromCurrentToDuplicate = cleared.slice(indexInCleared + 1, indexOfDuplicate)
        const sliceFromDuplicateToCurrent = [...cleared.slice(indexOfDuplicate + 1), ...cleared.slice(0, indexInCleared)]

        if (sliceFromCurrentToDuplicate.length === 0 || sliceFromCurrentToDuplicate.length === 1) {
            return [...cleared.slice(0, indexInCleared), ...cleared.slice(indexOfDuplicate)]
        }

        if (sliceFromDuplicateToCurrent.length === 0 || sliceFromDuplicateToCurrent.length === 1) {
            return cleared.slice(indexInCleared, indexOfDuplicate + 1)
        }

        const leftSum = getSliceLength(sliceFromCurrentToDuplicate)
        const rightSum = getSliceLength(sliceFromDuplicateToCurrent)

        if (leftSum < rightSum) {
            return [...cleared.slice(0, indexInCleared), ...cleared.slice(indexOfDuplicate)]
        }
        return cleared.slice(indexInCleared, indexOfDuplicate + 1)
    }, [...polygon])
}
