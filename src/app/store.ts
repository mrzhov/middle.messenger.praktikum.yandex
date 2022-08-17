import { Store } from '@/shared/core/store';

import { storeInitialState } from './configs/store';

export const store = Store.getInstance(storeInitialState);
