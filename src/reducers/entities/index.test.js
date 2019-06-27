import { ENTITIES_RESOLVE } from 'constants/actions';
import entitiesReducer from './';

describe('entitiesReducer => ', () => {
    it('Should return correct default state', () => {
        const state = entitiesReducer(undefined, {});

        expect(state).toEqual({});
    });

    it('Should add entities correnctly on ENTITIES_RESOLVE', () => {
        const payload = { car: { 1: { car_id: 1 } } };
        const state = entitiesReducer({}, { type: ENTITIES_RESOLVE, payload });

        expect(state.car[1]).toEqual(payload.car[1]);
    })

    it('Should correctly merge entities on ENTITIES_RESOLVE', () => {
        const prevState = {
            car: {
                1: { car_id: 1 },
                2: { car_id: 2 },
            },
            users: {
                1: { user_id: 1 }
            }
        }

        const payload = {
            car: {
                3: { car_id: 3 }
            },
            users: {
                2: { user_id: 2 }
            }
        }

        const state = entitiesReducer(prevState, { type: ENTITIES_RESOLVE, payload });

        expect(state.car[1]).toEqual(prevState.car[1]);
        expect(state.car[2]).toEqual(prevState.car[2]);
        expect(state.users[1]).toEqual(prevState.users[1]);
        expect(state.car[3]).toEqual(payload.car[3])
        expect(state.users[2]).toEqual(payload.users[2])
    });
})
