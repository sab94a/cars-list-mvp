//@flow

import { put, select } from "@redux-saga/core/effects";
import { setCarsFilters, clearCarsPages, fetchCars, setCarsPage } from 'actions';
import getCars from './getCars';

describe('Get Cars Saga', () => {
    describe('If pages weren\'t loaded and filters weren\'t changed:', () => {
        const page = 1
        const state = { cars: { pages: {} } };
        const saga = getCars({ payload: { page } });

        it('1) Select state', () => {
            expect(saga.next().value).toEqual(select())
        });

        it('2) Call Fetch Cars Action', () => {
            const next = saga.next(state).value;
            const expectedAction = fetchCars({ 
                page,  
                manufacturer: undefined,
                color: undefined,
                sort: undefined
            })
            
            expect(next.type).toEqual('PUT');
            expect(next.payload.action.type).toEqual(expectedAction.type);
            expect(next.payload.action.query).toEqual(expectedAction.query)
        })
    });

    describe('If pages exist and filters weren`t changed:', () => {
        const page = 2
        const state = { cars: { pages: { 2: [1, 2, 3]} } };
        const saga = getCars({ payload: { page } });

        it('1) Select state', () => {
            expect(saga.next().value).toEqual(select())
        });

        it('2) Change active page', () => {
            expect(saga.next(state).value).toEqual(put(setCarsPage(page)))
        });
    });

    describe('If filters were changed:', () => {
        const page = 2
        const color = 'white'
        const state = { cars: { pages: { 2: [1, 2, 3]} } };
        const saga = getCars({ payload: { page, color } });

        it('1) Select state', () => {
            expect(saga.next().value).toEqual(select())
        });

        it('2) Clear Car Pages', () => {
            expect(saga.next(state).value).toEqual(put(clearCarsPages()))
        });

        it('3) Set filters', () => {
            expect(saga.next().value).toEqual(put(setCarsFilters({
                color,
                manufacturer: undefined,
                sort: undefined
            })))
        });

        it('4) Call Fetch Cars Action', () => {
            const next = saga.next().value;
            const expectedAction = fetchCars({ 
                page,
                color,
                manufacturer: undefined,
                sort: undefined
            })
            
            expect(next.type).toEqual('PUT');
            expect(next.payload.action.type).toEqual(expectedAction.type);
            expect(next.payload.action.query).toEqual(expectedAction.query)
        })
    });
});
