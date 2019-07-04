import { put, select } from "@redux-saga/core/effects";
import { fetchCar } from 'actions';
import { GET_CAR_SUCCESS } from 'constants/actions';
import getCar from './getCar';

describe('Get Car Saga', () => {
    describe('If car is absent in store', () => {
        const payload = 1;
        const state = { entities: {} };
        const saga = getCar({ payload });

        it('1) Select state', () => {
            expect(saga.next().value).toEqual(select())
        });

        it('2) Fetch car', () => {
            const next = saga.next(state).value;
            const expectedAction = fetchCar(payload);

            expect(next.type).toEqual('PUT');
            expect(next.payload.action.type).toEqual(expectedAction.type);
            expect(next.payload.action.endpoint).toEqual(expectedAction.endpoint);
            expect(next.payload.action.types).toEqual(expectedAction.types);
        });
    });

    describe('If car exist in store', () => {
        const payload = 1;
        const state = { entities: { cars: { 1: { id: 1 } } } };
        const saga = getCar({ payload });

        it('1) Select state', () => {
            expect(saga.next().value).toEqual(select())
        });

        it('2) put success action with current id', () => {
            expect(saga.next(state).value).toEqual(put({
                type: GET_CAR_SUCCESS,
                payload: payload
            }))
        });
    });
});
