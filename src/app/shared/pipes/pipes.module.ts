import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenderPipe } from './gender.pipe';
import { HighLightPipe } from './highlight.pipe';
import { TruncatePipe } from './truncate.pipe';
import { PhoneNumberPipe } from './phone-number.pipe';
import { SafePipe } from './safe.pipe';

@NgModule({
    declarations: [
        GenderPipe, HighLightPipe, TruncatePipe, PhoneNumberPipe, SafePipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        GenderPipe, HighLightPipe, TruncatePipe, PhoneNumberPipe, SafePipe
    ]
})
export class PipesModule { }
