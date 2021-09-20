import { RegisteredModel } from './../../models/registered.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employeers',
  templateUrl: './employeers.component.html',
  styleUrls: ['./employeers.component.scss']
})
export class EmployeersComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  employees: RegisteredModel[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.userService.getEmployees()
      .subscribe(employees => this.employees = employees));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

}
