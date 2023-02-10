// FRAMEWORK IMPORTS
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HeaderInterceptor} from './interceptors/header.interceptor';
import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';

// COMPONENT IMPORTS
import {SnomedNavbarComponent} from './components/snomed-navbar/snomed-navbar.component';
import {SnomedFooterComponent} from './components/snomed-footer/snomed-footer.component';

// PIPE IMPORTS
import {AuthenticationService} from './services/authentication/authentication.service';
import {AuthoringService} from './services/authoring/authoring.service';

// PROVIDER IMPORTS
import {EnvServiceProvider} from './providers/env.service.provider';
import {ToastrModule} from 'ngx-toastr';
import {StatusPageService} from './services/statusPage/status-page.service';
import {LeftSidebarComponent} from './components/left-sidebar/left-sidebar.component';
import {TemplateService} from './services/template/template.service';
import {AlphabeticalPipe} from './pipes/alphabetical/alphabetical.pipe';
import {TextFilterPipe} from './pipes/text-filter/text-filter.pipe';
import {AlphabeticalSemanticTagPipe} from './pipes/alphabetical-semantic-tag/alphabetical-semantic-tag.pipe';
import {TemplateViewComponent} from './components/template-view/template-view.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ModalComponent} from './components/modal/modal.component';
import {ModalService} from './services/modal/modal.service';
import { AcceptabilityMapPipe } from './pipes/acceptability-map/acceptability-map.pipe';
import { OutdatedPipe } from './pipes/outdated/outdated.pipe';
import { CategoryPipe } from './pipes/category/category.pipe';

// SERVICE IMPORTS


@NgModule({
    declarations: [
        AppComponent,
        SnomedNavbarComponent,
        SnomedFooterComponent,
        LeftSidebarComponent,
        AlphabeticalPipe,
        TextFilterPipe,
        AlphabeticalSemanticTagPipe,
        TemplateViewComponent,
        ModalComponent,
        AcceptabilityMapPipe,
        OutdatedPipe,
        CategoryPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgbTypeaheadModule,
        MatTooltipModule,
        ToastrModule.forRoot(),
    ],
    providers: [
        AuthenticationService,
        AuthoringService,
        StatusPageService,
        TemplateService,
        ModalService,
        EnvServiceProvider,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HeaderInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
