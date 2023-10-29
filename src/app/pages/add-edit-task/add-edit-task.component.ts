import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.scss']
})
export class AddEditTaskComponent implements OnInit {
  // @Input() taskData: any; // Input property to pass task data for editing
  taskForm!: FormGroup;
  taskData: any;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddEditTaskComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
      this.taskData =  data.taskData ? {...data.taskData} : null; // Create a copy of the data to prevent modifying the original task
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [this.taskData ? this.taskData.title : '', Validators.required],
      description: [this.taskData ? this.taskData.description : '', Validators.required],
      status: [this.taskData ? this.taskData.status : 'open'],
      priority: [this.taskData ? this.taskData.priority : 'low'],
      dueDate: [this.taskData ? this.taskData.dueDate : null, Validators.required],
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      // Handle form submission (e.g., update the task with this.taskForm.value)
      console.log(this.taskForm.value);

      // Save the form data to localStorage
      const localTask = localStorage.getItem('tasks');
      const tasks = localTask ? JSON.parse(localTask) : [];
      const formData = this.taskForm.value;

      if (this.taskData) {
        // Editing existing task - update it in the tasks array
        const index = tasks.findIndex((task: any) => task.id === this.taskData.id);
        if (index !== -1) {
          tasks[index] = {id: this.taskData.id, ...formData};
        }
      } else {
        // Adding a new task
        const newTask = {id: new Date().getTime(), ...formData};
        tasks.push(newTask);
      }

      localStorage.setItem('tasks', JSON.stringify(tasks));

      // Optionally, you can navigate back to the task list or perform other actions
      this.dialogRef.close(true);
    }
  }

  onCancel() {
    // Handle form cancellation
    this.dialogRef.close(false);
  }
}
