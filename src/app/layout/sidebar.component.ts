import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-sidebar',
  template: `
<section id="sidebar">
    <div class="panel panel-default">
        <div class="panel-body">
            <<{{className}}>>
        </div>
    </div>
</section>  
`,
  styleUrls: ['sidebar.component.css']
})
export class SidebarComponent {
  // private className = this.constructor.name;
  private className = 'SidebarComponent';
}
