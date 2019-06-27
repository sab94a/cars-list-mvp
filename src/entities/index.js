//@flow

import { schema } from 'normalizr';

export const Car = new schema.Entity('cars', {}, { idAttribute: 'stockNumber' });
