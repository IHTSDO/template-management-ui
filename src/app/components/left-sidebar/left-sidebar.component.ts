import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {TemplateService} from '../../services/template/template.service';
import {SnomedUtilityService} from '../../services/snomedUtility/snomed-utility.service';

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

    categoryFilter: string;
    categories: string[] = [];

    colors = [
        'spring-rain',
        'london-hue',
        'vanilla',
        'dull-lavender',
        'tonys-pink',
        'green-mist',
        'ice-blue',
        'ghostly-grey',
        'porsche-orange',
        'sunflower-yellow'
    ];

    constructor(private templateService: TemplateService) {
        this.templatesSubscription = this.templateService.getTemplates().subscribe( data => {
            this.templates = data;
            this.calculateTemplateCategories();
        });
        this.activeTemplateSubscription = this.templateService.getActiveTemplate().subscribe( data => this.activeTemplate = data);
    }

    ngOnInit() {
    }

    selectTemplate(template) {
        if (this.activeTemplate === template) {
            this.templateService.setActiveTemplate(null);
        } else {
            this.templateService.setActiveTemplate(template);
        }
    }

    selectCategory(category) {
        if (this.categoryFilter === category) {
            this.categoryFilter = null;
        } else {
            this.categoryFilter = category;
        }
    }

    calculateTemplateCategories() {
        this.templates.forEach(template => {
            const category = SnomedUtilityService.getSemanticTagFromFsn(template.name);

            if (!this.categories.includes(category)) {
                this.categories.push(category);
            }
        });
    }
}
