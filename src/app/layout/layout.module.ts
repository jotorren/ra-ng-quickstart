import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RaNGModule } from 'ra-ng';

import { HeaderComponent } from './header.component';
import { TopnavComponent } from './topnav.component';
import { SidebarComponent } from './sidebar.component';
import { AsideComponent } from './aside.component';
import { FooterComponent } from './footer.component';

@NgModule({
    imports: [RaNGModule, RouterModule],
    declarations: [HeaderComponent, TopnavComponent, SidebarComponent, AsideComponent, FooterComponent],
    exports: [HeaderComponent, TopnavComponent, SidebarComponent, AsideComponent, FooterComponent],
    providers: []
})
export class LayoutModule {
}

