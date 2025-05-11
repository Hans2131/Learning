export interface TaskDto {
    title: string;
    description: string;
}

export interface Task extends TaskDto {
    id: number;
    status?: TaskStatus;
}

export enum TaskStatus {
    PENDING = "Pending",
    IN_PROGRESS = "In Progress",
    COMPLETED = "Completed",
}