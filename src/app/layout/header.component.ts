import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-header',
  template: `
<header id="header">
    <div class="panel panel-default">
        <div class="panel-body">
        <h2>{{title}}</h2>
        </div>
    </div>
</header>
`
})
export class HeaderComponent {
  @Input() title: string;
}
