export type AuthHeader = {
    headers: {
      'KC-API-KEY': string;
      'KC-API-SIGN': string;
      'KC-API-TIMESTAMP': string;
      'KC-API-PASSPHRASE': string;
      'KC-API-KEY-VERSION': string;
    };
  };