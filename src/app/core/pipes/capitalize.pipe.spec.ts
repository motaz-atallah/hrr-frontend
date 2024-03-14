import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  let pipe: CapitalizePipe;

  beforeEach(() => {
    pipe = new CapitalizePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms "hello" to "Hello"', () => {
    const result = pipe.transform('hello');
    expect(result).toEqual('Hello');
  });

  it('transforms "HELLO" to "Hello"', () => {
    const result = pipe.transform('HELLO');
    expect(result).toEqual('Hello');
  });

  it('transforms "hElLo" to "Hello"', () => {
    const result = pipe.transform('hElLo');
    expect(result).toEqual('Hello');
  });

  it('transforms empty string to empty string', () => {
    const result = pipe.transform('');
    expect(result).toEqual('');
  });

  it('transforms null to empty string', () => {
    const result = pipe.transform(null);
    expect(result).toEqual('');
  });

  it('transforms undefined to empty string', () => {
    const result = pipe.transform(undefined);
    expect(result).toEqual('');
  });
});
