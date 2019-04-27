import { config, ICollectionFetchOpts, IRawResponse } from 'datx-jsonapi';

import { AppData } from '../state/AppData';
import { apify, deapify } from './apify';

config.defaultFetchOptions = {
  credentials: 'include',
};

config.baseUrl = '/api/';

config.defaultFetchOptions = {
  headers: {
    Accept: 'application/vnd.api+json',
  },
};

config.transformResponse = (opts: IRawResponse) => {
  return {...opts, data: deapify(opts.data)};
};

config.transformRequest = (opts: ICollectionFetchOpts) => {
  const store: AppData = opts.collection as AppData;

  // Prepare options
  if (!opts.options) {
    opts.options = {};
  }

  return {...opts, data: apify(opts.data)};
};
