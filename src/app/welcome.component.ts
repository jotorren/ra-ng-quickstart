import { Component, OnDestroy, OnInit } from '@angular/core';

import { AppRoutingModule } from 'app/app.routing.module';

@Component({
  moduleId: module.id,
  template: `{{ 'ui.main.message' | translate }}
  <br><a [routerLink]="routesMap['featureA']">featureA</a>
  `
})
export class WelcomeComponent implements OnDestroy, OnInit {
  routesMap = AppRoutingModule.RoutesMap;

  ngOnInit() {
    // Resources initialization
  }

  ngOnDestroy() {
    // Resources release
  }
}
