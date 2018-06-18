import { TestBed, inject } from '@angular/core/testing';

import { CollaborationsService } from './collaborations.service';

describe('CollaborationsService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CollaborationsService]
        });
    });

    it('should be created', inject([CollaborationsService], (service: CollaborationsService) => {
        expect(service).toBeTruthy();
    }));
});