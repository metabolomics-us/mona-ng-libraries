import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { Commons } from './commons';

import { AuthService } from './services/auth.service';
import { SpectrumService } from './services/spectrum.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    AuthService,
    SpectrumService
  ]
})
export class NgMonaClientModule { }
