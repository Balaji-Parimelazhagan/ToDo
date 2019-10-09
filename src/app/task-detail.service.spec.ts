import { TestBed } from '@angular/core/testing';

import { TaskDetailService } from './task-detail.service';

describe('TaskDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskDetailService = TestBed.get(TaskDetailService);
    expect(service).toBeTruthy();
  });
});
