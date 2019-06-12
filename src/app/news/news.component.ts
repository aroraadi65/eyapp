import { Component, OnInit } from '@angular/core';

import { NewsService } from '../news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  news;
  showLoader = true;

  constructor(private _news: NewsService) { }

  ngOnInit() {
    this._news.fetchNews()
      .subscribe(data => {
        this.showLoader = false;
        this.news = data;
      });
  }

}
