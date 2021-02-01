import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      loading: false,
      error: null,
      redirectPath: '/',
    });
  });

  it('should token the token upon signin', () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          loading: false,
          error: null,
          redirectPath: '/',
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          token: 'some-token',
          userId: 'hatz',
        }
      )
    ).toEqual({
      token: 'some-token',
      userId: 'hatz',
      loading: false,
      error: null,
      redirectPath: '/',
    });
  });
});
