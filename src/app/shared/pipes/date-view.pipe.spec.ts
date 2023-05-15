import { DateViewPipe } from './date-view.pipe';

describe('DateViewPipe', () => {
  let pipe: DateViewPipe;

  beforeEach(() => {
    pipe = new DateViewPipe();
  });

  it('Should transform the date string to "today" when the date is today', () => {
    const today = new Date().toISOString();
    expect(pipe.transform(today)).toBe('today');
  });

  it('Should transform the date string to "x days ago" when the date is less than or equal to 20 days ago', () => {
    const twentyDaysAgo = new Date(Date.now() - (20 * 24 * 60 * 60 * 1000)).toISOString();
    expect(pipe.transform(twentyDaysAgo)).toBe('20 days ago');
  });

  it('Should transform the date string to ISO format when the date is more than 20 days ago', () => {
    const moreThanTwentyDaysAgo = new Date(Date.now() - (21 * 24 * 60 * 60 * 1000)).toISOString();
    expect(pipe.transform(moreThanTwentyDaysAgo)).toBe(moreThanTwentyDaysAgo);
  });
});
