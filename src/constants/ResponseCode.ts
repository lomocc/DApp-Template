/**
 * 服务端返回状态码
 */
const ResponseCode = {
  SUCCESS: 'Success',
  ACCOUNT_ALREADY_EXISTS: 'AccountAlreadyExists',
  FREE_BUNDLE_ALREADY_EXISTS_ERR: 'FreeBundleAlreadyExistsErr',
} as const;

export { ResponseCode };
