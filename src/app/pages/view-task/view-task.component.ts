import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit{
  task: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Retrieve the task ID from the route parameters
    const taskId = this.route.snapshot.paramMap.get('id');

    // Fetch the task data from local storage using the ID
    this.task = this.getTaskById(taskId);
    debugger
  }

  private getTaskById(taskId: string | null): any | undefined {
    // Retrieve tasks from local storage
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const tasks: any[] = JSON.parse(storedTasks);

      // Find the task by ID
      return tasks.find(task => task.id == taskId);
    } else {
      return undefined;
    }
  }
}
