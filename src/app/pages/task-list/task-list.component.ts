import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddEditTaskComponent} from "../add-edit-task/add-edit-task.component";
import {Router} from "@angular/router";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {MatTable} from "@angular/material/table";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  tasksData: any[] = [];
  displayedColumns: string[] = ['position', 'title', 'description', 'status', 'priority', 'dueDate', 'actions'];
  statusFilter: string = 'all';
  priorityFilter: string = 'all';
  dueDateFilter!: Date | null;

  @ViewChild('table', { static: true }) table!: MatTable<any>;

  dragDisabled = true;

  constructor(public dialog: MatDialog, private router: Router) {
  }

  ngOnInit(): void {
    this.getTaskList();
  }

  getTaskList(){
    // Retrieve tasks from local storage
    const data = localStorage.getItem('tasks');
    this.tasks = data ? JSON.parse(data) : [];
    this.tasksData = data ? JSON.parse(data) : [];
  }

  filterTasks() {
    this.tasks = this.tasksData.filter((task) =>
      (this.statusFilter === 'all' || task.status === this.statusFilter) &&
      (this.priorityFilter === 'all' || task.priority === this.priorityFilter) &&
      (!this.dueDateFilter || task.dueDate === this.dueDateFilter)
    );
  }

  /// OPEN ADD NEW TODO BOX
  addEditTask(item?: any): void {
    const dialogRef = this.dialog.open(AddEditTaskComponent, {
      height: '500px',
      width: '500px',
      data: {taskData: item ? item : null}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTaskList();
      }
    });
  }

  deleteTask(task: any) {
    // Handle the delete operation
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      // Update local storage
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
    this.getTaskList();
  }

  markAsCompleted(task: any) {
    // Find the task by its unique identifier (e.g., task.id) and update its status.
    const updatedTasks = this.tasks.map((t) => {
      if (t.id === task.id) {
        t.status = 'completed';
      }
      return t;
    });

    // Save the updated task list to local storage.
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Update the component's task list with the modified data.
    this.tasks = updatedTasks;
  }

  viewTaskDetail(task: any) {
    // Navigate to the task detail view with the task ID as a parameter
    this.router.navigate(['/task-detail', task.id]);
  }

  drop(event: any) {
    // Return the drag container to disabled.
    this.dragDisabled = true;

    const previousIndex = this.tasks.findIndex((d) => d === event.item.data);

    moveItemInArray(this.tasks, previousIndex, event.currentIndex);
    this.table.renderRows();
  }
}
