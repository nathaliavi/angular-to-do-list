import { Component, DoCheck } from '@angular/core';

//Interface
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})

export class TodoListComponent implements DoCheck {
  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]') 
  
  ngDoCheck() {
    this.setLocalStorage()
  }

  public setLocalStorage(){
    if (this.taskList) {
      this.taskList.sort((first, last) => Number(first.checked) - Number(last.checked))
      localStorage.setItem("list", JSON.stringify(this.taskList))
    }
  }

  public validationInput(event: string, index: number) {
    if (!event.length) {
      const confirm = window.confirm("Empty task. Would you like to delete it?")

      if (confirm) {
        this.deleteItemTaskList(index)
      }
    }
  }

  public deleteItemTaskList(event: number) {
    this.taskList.splice(event, 1)
  }

  public deleteAllTasks() {
    const confirm = window.confirm('Do you really want to delete all tasks?')
    if (confirm)
      this.taskList = []

  }

  public setEmitTaskList(event: string) {
    this.taskList.push({ task: event, checked: false })
  }

}
