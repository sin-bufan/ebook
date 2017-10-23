import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  数据
*/
@Injectable()
export class BooksData {

  data: any;
  api_url: string = "assets/data/books.json";
  constructor(private http: Http) {
    this.data = null;
  }

  getBooks() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get(this.api_url)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }
}
