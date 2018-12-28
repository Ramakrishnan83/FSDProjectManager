import { FindTaskByIdPipe } from './find-task-by-id.pipe';

describe('FindTaskByIdPipe', () => {
  it('create an instance', () => {
    const pipe = new FindTaskByIdPipe();
    expect(pipe).toBeTruthy();
  });
});
