import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TemplateService {

    private templates = new Subject<any>();
    private activeTemplate = new Subject<any>();

    constructor(private http: HttpClient) {
    }

    // Setters & Getters: Templates
    setTemplates(templates) {
        this.templates.next(templates);
    }

    getTemplates() {
        return this.templates.asObservable();
    }

    // Setters & Getters: ActiveTemplate
    setActiveTemplate(template) {
        this.activeTemplate.next(template);
    }

    getActiveTemplate() {
        return this.activeTemplate.asObservable();
    }

    httpTemplates() {
        return this.http.get('template-service/templates');
    }
}
