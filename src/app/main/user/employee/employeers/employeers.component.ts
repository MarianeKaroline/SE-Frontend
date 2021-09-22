import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { RegisteredModel } from './../../models/registered.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../user.service';
import { Subscription } from 'rxjs';

@UntilDestroy()
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
      .pipe(untilDestroyed(this))
      .subscribe(employees => this.employees = employees);
  }

}
