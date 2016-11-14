import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  template: `{{ 'ui.main.message' | translate }}`
})
export class WelcomeComponent implements OnDestroy, OnInit {
  private className = this.constructor.name;

  ngOnInit() {
    // Resources initialization
  }

  ngOnDestroy() {
    // Resources release
  }
}
