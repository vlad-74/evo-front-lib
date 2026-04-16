import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EvoLibModule } from 'evo-lib';
import { ChildComponent } from './child/child.component';
import { ParentComponent } from './parent/parent.component';
import { PageComponent } from './page/page.component';
import { PageCommonDevicesComponent } from './page/devices/page-common-devices.component';
import { PagePhoneComponent } from './page/devices/page-phone/page-phone.component';
import { PageTabletComponent } from './page/devices/page-tablet/page-tablet.component';
import { PageDesktopComponent } from './page/devices/page-desktop/page-desktop.component';


@NgModule({
    declarations: [AppComponent,
        ChildComponent,
        ParentComponent,
        PageComponent,
        PageCommonDevicesComponent,
        PagePhoneComponent,
        PageTabletComponent,
        PageDesktopComponent
    ],
    imports: [
    BrowserModule, EvoLibModule, HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
