import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-topnav',
  template: `
<nav id="topnav">
    <div class="navbar">
        <<{{className}}>>
    </div>
</nav>
`,
  styleUrls: ['topnav.component.css']
})
export class TopnavComponent {
  // private className = this.constructor.name;
  private className = 'TopnavComponent';
}
