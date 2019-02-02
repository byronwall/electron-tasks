export interface Task {
  id: number;
  title: string;
  children?: Task[];

  isComplete: boolean;
}
