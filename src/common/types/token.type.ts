export type AccessTokenType = {
  sub: number;
  type: 'access';
};

export type RefreshTokenType = {
  sub: number;
  type: 'refresh';
};
