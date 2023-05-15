import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial loader status as false', () => {
    service.getLoader$.subscribe((status) => {
      expect(status).toBeFalsy();
    });
  });

  it('should update the loader status', () => {
    const newStatus = true;
    service.setLoaderStatus(newStatus);

    service.getLoader$.subscribe((status) => {
      expect(status).toBe(newStatus);
    });
  });
});
