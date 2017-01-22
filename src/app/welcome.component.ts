import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';

import { AppRoutingModule } from 'app/app.routing.module';

@Component({
  moduleId: module.id,
  template: `{{ 'ui.main.message' | translate }} ({{timestamp}})
  <br><a [routerLink]="routesMap['featureA']">featureA</a>
  `
})
export class WelcomeComponent implements OnDestroy, OnInit {
  routesMap = AppRoutingModule.RoutesMap;

  timestamp: string;

  ngOnInit() {
    // Resources initialization
    this.timestamp = moment().format();
  }

  ngOnDestroy() {
    // Resources release
  }
}
