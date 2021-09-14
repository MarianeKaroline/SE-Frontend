import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/main/user/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  employee: boolean;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.employee = this.userService.employee;
  }

}
