import { MovieRuntimePipe } from './movie-runtime.pipe';

describe('MovieRuntimePipe', () => {
  it('create an instance', () => {
    const pipe = new MovieRuntimePipe();
    expect(pipe).toBeTruthy();
  });
});
