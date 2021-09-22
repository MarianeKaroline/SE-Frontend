import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from 'src/app/main/user/authentication/authentication.service';
import { UserService } from 'src/app/main/user/user.service';

@UntilDestroy()
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  employee: boolean;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.authService.employee
    .pipe(untilDestroyed(this))
    .subscribe(res => this.employee = res);
  }

  loggOut() {
    this.userService.LoggOut();
  }

}
