export interface Project {
  id: string;
  name: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  name: string;
  completedAt?: Date; // completedAt is optional (it can be undefined)
}
