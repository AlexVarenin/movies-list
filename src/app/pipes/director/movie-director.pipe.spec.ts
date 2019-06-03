import { MovieDirectorPipe } from './movie-director.pipe';

describe('MovieDirectorPipe', () => {
  it('create an instance', () => {
    const pipe = new MovieDirectorPipe();
    expect(pipe).toBeTruthy();
  });
});
