import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { CommonModule } from '@angular/common';
import {DrawerService} from '../../services/drawer.service';

@Component({
    selector: 'app-snomed-navbar',
    templateUrl: './snomed-navbar.component.html',
    styleUrls: ['./snomed-navbar.component.scss'],
    imports: [CommonModule]
})
export class SnomedNavbarComponent implements OnInit {

    environment: string;
    user: User;
    userSubscription: Subscription;

    constructor(private authenticationService: AuthenticationService,
                private drawerService: DrawerService) {
        this.environment = window.location.host.split(/[.]/)[0].split(/[-]/)[0];
        this.userSubscription = this.authenticationService.getUser().subscribe(data => this.user = data);
    }

    ngOnInit() {
    }

    openDrawer() {
        this.drawerService.setDrawerOpen(true);
        document.body.classList.add('app-drawer-open');
    }

    logout() {
        this.authenticationService.logout();
    }
}
