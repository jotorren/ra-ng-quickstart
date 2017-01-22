import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FeatureAComponent } from 'app/featureA/featureA.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: FeatureAComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [
    ]
})
export class FeatureARoutingModule { }
