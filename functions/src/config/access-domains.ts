import * as functions from 'firebase-functions';

import { IConfig } from '../functions.models';

export const accessDomains = (functions.config() as IConfig).environment.referer;
