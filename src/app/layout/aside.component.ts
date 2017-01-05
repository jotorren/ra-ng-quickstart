import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-aside',
  template: `
<aside id="aside">
    <div class="panel panel-default panel-info">
        <rang-lang-selector></rang-lang-selector>
    </div>
</aside>  
`,
  styleUrls: ['aside.component.css']
})
export class AsideComponent {
}
