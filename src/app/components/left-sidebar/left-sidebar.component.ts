import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {TemplateService} from '../../services/template/template.service';

@Component({
    selector: 'app-left-sidebar',
    templateUrl: './left-sidebar.component.html',
    styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit {

    textFilter: string;
    templates: any[];
    templatesSubscription: Subscription;
    activeTemplate: any;
    activeTemplateSubscription: Subscription;

    constructor(private templateService: TemplateService) {
        this.templatesSubscription = this.templateService.getTemplates().subscribe( data => this.templates = data);
        this.activeTemplateSubscription = this.templateService.getActiveTemplate().subscribe( data => this.activeTemplate = data);
    }

    ngOnInit() {

    }

    selectTemplate(template) {
        console.log('activeTemplate:', template);
        if (this.activeTemplate === template) {
            this.templateService.setActiveTemplate(null);
        } else {
            this.templateService.setActiveTemplate(template);
        }
    }
}
