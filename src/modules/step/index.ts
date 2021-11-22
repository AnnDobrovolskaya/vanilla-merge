import { isEmpty } from 'lodash';
import { Polygon, Polygons } from '../../types/Polygon';

type Pair = Array<{ secondOperand: Polygon , current: Polygon }>

export default (polygons: Polygons) => {
    return polygons
        .reduce((pairs: Pair, currentPolygon) => {
            const pair = currentPolygon.distances.reduce((acc: Pair, distanceObj) => {
                const secondOperand = polygons
                    .filter(p => p.id !== currentPolygon.id)
                    .find(p => p.distances.map(d => d.distance).includes(distanceObj.distance))

                if (secondOperand && isEmpty(acc)) {
                    acc.push({ secondOperand, current: currentPolygon })
                    return acc
                }

                if (secondOperand && acc.length !== 0) {
                    if (!acc.map(e => [e.secondOperand.id, e.current.id]).flat().includes(secondOperand.id) &&
                        !acc.map(e => [e.secondOperand.id, e.current.id]).flat().includes(currentPolygon.id)) {
                        acc.push({ secondOperand, current: currentPolygon })
                        return acc
                    }
                    return acc
                }

                return acc
            }, [])
            if ((pair.length > 0) && pairs.length > 0) {
                const alreadyExist = pairs.map(pair => [pair.secondOperand.id, pair.current.id]).flat()
                const [currentPair] = pair
                if (!alreadyExist.includes(currentPair.current.id) && !alreadyExist.includes(currentPair.secondOperand.id)) {
                    pairs.push(pair[0])
                    return pairs
                }
                return pairs
            }
            if ((pair.length > 0) && pairs.length === 0) {
                pairs.push(pair[0])
                return pairs
            }
            return pairs
        }, [])
}
