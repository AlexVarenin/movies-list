import { MovieTitlePipe } from './movie-title.pipe';

describe('MovieTitlePipe', () => {
  it('create an instance', () => {
    const pipe = new MovieTitlePipe();
    expect(pipe).toBeTruthy();
  });
});
