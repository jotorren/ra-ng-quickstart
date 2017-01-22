import { NgModule } from '@angular/core';
import { AppSharedModule } from 'app/shared';

import { RaNGModule } from 'ra-ng';

import { FeatureARoutingModule } from 'app/featureA/featureA.routing.module';
import { FeatureAComponent } from 'app/featureA/featureA.component';

@NgModule({
    imports: [RaNGModule, AppSharedModule, FeatureARoutingModule],
    declarations: [FeatureAComponent],
    exports: [],
    providers: [
    ]
})
export class FeatureAModule {
}
