import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserModule } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { NgbTypeaheadModule } from "@ng-bootstrap/ng-bootstrap";
import { provideToastr } from "ngx-toastr";
import { headerInterceptorFn } from "./interceptors/header.interceptor";
import { EnvServiceProvider } from "./providers/env.service.provider";

export const appConfig: ApplicationConfig = {
     providers: [
        importProvidersFrom(BrowserModule, FormsModule, NgbTypeaheadModule, MatTooltipModule),
        EnvServiceProvider,
        provideHttpClient(withInterceptors([headerInterceptorFn])),
        provideAnimations(),
        provideToastr()
    ]
};