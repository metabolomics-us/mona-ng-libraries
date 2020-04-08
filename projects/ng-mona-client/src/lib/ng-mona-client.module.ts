import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { Commons } from './commons';

import { AuthService } from './auth.service';
import { SpectrumService } from './spectrum.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    Commons,
    AuthService,
    SpectrumService
  ]
})
export class NgMonaClientModule { }
