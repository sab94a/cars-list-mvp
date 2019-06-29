import { put, call } from '@redux-saga/core/effects';
import { normalize } from 'normalizr';
import { ENTITIES_RESOLVE } from 'constants/actions';
import entitySaga from './entity';

const Action = {
    payload: {
        schema: { car: 'car' },
        action: 'ACTION',
        data: [1, 2]
    }
};

describe('Entity Saga', () => {
    const saga = entitySaga(Action);
    const entities = [1, 2];
    const result = [3, 4];

    let fetchMock = null;

    it('1 Step: call normalize', () => {
        expect(saga.next().value).toEqual(call(
            normalize, 
            Action.payload.data, 
            Action.payload.schema
        ));
    });

    it('2 Step: put ENTITIES_RESOLVE action with new entities', () => {
        expect(saga.next({ entities, result }).value).toEqual(put({
            type: ENTITIES_RESOLVE,
            payload: entities
        }))
    });

    it('3 Step: put action with result', () => {
        expect(saga.next().value).toEqual(put({
            type: Action.payload.action,
            payload: result
        }))
    });
})
