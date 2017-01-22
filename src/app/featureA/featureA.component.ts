import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Rx';

import { TranslateService, LangChangeEvent } from 'ra-ng';

import { AppRoutingModule } from 'app/app.routing.module';

@Component({
    moduleId: module.id,
    templateUrl: 'featureA.component.html',
    styleUrls: ['featureA.component.css']
})
export class FeatureAComponent implements OnDestroy, OnInit {

    description: string;

    private translate$: Subscription;

    constructor(private location: Location, private translate: TranslateService) {
    }

    ngOnInit() {
        this.description = this.translate.instant('ui.featureA.description');
        this.translate$ = this.translate.onLangChange.subscribe(
            (params: LangChangeEvent) => {
                this.onLangChange(params);
            }
        );
    }

    ngOnDestroy() {
        // Resources release
        this.translate$.unsubscribe();
    }

    onClickBack(event) {
        this.location.back();
    }

    private onLangChange(event: LangChangeEvent) {
        this.description = this.translate.instant('ui.featureA.description');
    }

}
