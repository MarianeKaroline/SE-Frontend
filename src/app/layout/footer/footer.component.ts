import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/main/user/authentication/authentication.service';
import { UserService } from 'src/app/main/user/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  employee: boolean;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.authService.employee.subscribe(res => this.employee = res));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  loggOut() {
    this.userService.LoggOut();
  }

}
