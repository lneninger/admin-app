import { LazyLoaderDirective } from './lazy-loader.directive';
import { TestBed } from '@angular/core/testing';

describe('LazyLoaderDirective', () => {
    it('should create an instance', () => {
        const directive = TestBed.get(LazyLoaderDirective);
        expect(directive).toBeTruthy();
    });
});
