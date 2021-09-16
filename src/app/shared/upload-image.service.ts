import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private http: HttpClient) { }

  public postFile(file: File) {
    const formData = new FormData();
    formData.append('image', file, file.name);

    return this.http
      .post(`${apiUrl}/image`, formData)
      .pipe(
        take(1)
      );
  }
}
