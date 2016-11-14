import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-aside',
  template: `
<aside id="aside">
    <div class="panel panel-default panel-info">
        <app-lang-selector></app-lang-selector>
    </div>
</aside>  
`,
  styleUrls: ['aside.component.css']
})
export class AsideComponent {
  private className = this.constructor.name;

  constructor() {}
}
