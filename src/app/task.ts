import { Step } from './step';
export class Task {
    id: number;
    name: string;
    nameSuffix: string;
    isFinished: boolean;
    steps: Step[];
}
