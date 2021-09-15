import { RegisteredModel } from './../../models/registered.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-employeers',
  templateUrl: './employeers.component.html',
  styleUrls: ['./employeers.component.scss']
})
export class EmployeersComponent implements OnInit {
  employees: RegisteredModel[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getEmployees()
    .subscribe(employees => this.employees = employees);
  }

}
