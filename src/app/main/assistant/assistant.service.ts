import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SendMessageModel } from './models/send-message.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AssistantService {
  constructor(private http: HttpClient) {}

  public sendEmail(sendMessage: SendMessageModel) {
    return this.http
      .post<boolean>(`${apiUrl}/email`, sendMessage)
      .pipe(take(1));
  }
}
