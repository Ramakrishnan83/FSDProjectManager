import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule  } from '@angular/common/http';
import { UtilService } from '../util/util.service';
import { TaskDetails } from '../model/task';
import { AppService } from './app.service';

describe('AppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule,RouterTestingModule ],
      providers: [AppService]
    });
  });

  it('should be created', inject([AppService], (service: AppService) => {
    expect(service).toBeTruthy();
  }));
});
