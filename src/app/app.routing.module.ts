import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome.component';
import { FeatureAModule } from 'app/featureA/featureA.module';

export function featureAFactory() {
    return FeatureAModule;
}

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'welcome', pathMatch: 'full' },
            { path: 'welcome', component: WelcomeComponent },

            { path: 'lazy-featureA', loadChildren: featureAFactory }

            // Fails with AoT compiling:
            // { path: 'lazy-featureA', loadChildren: () => FeatureAModule }

            // SystenJS Builder is unable to process
            // {
            //     path: 'lazy-featureA',
            //     loadChildren: 'app/featureA/featureA.module#FeatureAModule'
            // }
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [
    ]
})
export class AppRoutingModule {
    static RoutesMap = {
        welcome: 'welcome',
        featureA: '/lazy-featureA'
    };
}
