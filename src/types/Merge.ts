import { ArrayOfPoints } from './Input';

export type MergeResult = {
    separated: false;
    coordinates: ArrayOfPoints;
} | {
    separated: true;
    coordinates: Array<ArrayOfPoints>;
}
