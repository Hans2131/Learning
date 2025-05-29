export enum TaskStatus {
  COMPLETED = "Completed",
  IN_PROGRESS = "In Progress",
  PENDING = "Pending",
}

export interface Task extends TaskDto {
  id: number;
  status?: TaskStatus;
}

export interface TaskDto {
  userId: number;
  description: string;
  title: string;
}
