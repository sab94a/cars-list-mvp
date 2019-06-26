import { put, call } from '@redux-saga/core/effects';
import { API_REQUEST } from 'constants/actions';
import { apiSaga, makeRequest } from './api';

let fetchMock = null

const payload = 'data';
const error = new Error('error')
const requestParams = {
    endpoint: 'endpoint',
    method: 'GET',
};
const Action = {
    ...requestParams,
    types: ['A', 'B', 'C'],
    query: {
        page: 1
    }
};

const setMock = () => {
    fetchMock = jest.spyOn(global, 'fetch')
    fetchMock.mockReturnValue(Promise.resolve({ json: () => payload }))
}

describe('MakeRequest', () => {  
    beforeAll(() => {
        setMock();
    });

    it('should call fetch correctly', () => {
        makeRequest(requestParams);

        expect(fetchMock).toBeCalled();
        expect(fetchMock).lastCalledWith(requestParams.endpoint, { method: requestParams.method });
    });

    it('should pass query param correctly', () => {
        const query = {
            page: 2, 
            item: 3
        }

        makeRequest({...requestParams, query: { page: 2, item: 3 }});

        const expectedEndpoint = `${ requestParams.endpoint }?item=${query.item}&page=${query.page}`;

        expect(fetchMock).lastCalledWith(expectedEndpoint, { method: requestParams.method });
    });

    afterAll(() => {
        fetchMock.mockRestore() 
    });
});

describe('Api Saga', () => {
    beforeAll(() => {
        setMock();
    });

    describe('Success flow', () => {
        const saga = apiSaga(Action);

        it('Should call Request Action', () => {
            expect(saga.next().value).toEqual(put({ type: Action.types[0] }));
        });

        it('Should call MakeRequest', () => {
            expect(saga.next().value).toEqual(call(makeRequest, {
                endpoint: Action.endpoint,
                method: Action.method,
                query: Action.query,
            }));
        });

        it('Should call Success Action', () => {
            expect(saga.next(payload).value).toEqual(put({
                type: Action.types[1],
                payload
            }));
        });
    });

    describe('Error Flow', () => {
        const saga = apiSaga(Action);

        it('Should call Error Action', () => {
            saga.next();
            saga.next();

            expect(saga.throw(error).value).toEqual(put({
                type: Action.types[2],
                payload: error.message
            }));
        });
    });

    describe('Callback flow', () => {
        it('Should call success callback if it passed', () => {
            const newPayload = 'facke result of success callback';
            const onSuccess = jest.fn();
            const params = {
                ...Action,
                onSuccess
            };

            const saga = apiSaga(params);
            
            onSuccess.mockReturnValue(newPayload)

            saga.next();
            saga.next();

            expect(saga.next(payload).value).toEqual(put({
                type: Action.types[1],
                payload: newPayload
            }));
            
            expect(onSuccess).lastCalledWith(payload)
        });

        it('Should call error callback if it passed', () => {
            const newPayload = 'facke result of error callback';
            const onError = jest.fn();
            const params = {
                ...Action,
                onError
            };

            const saga = apiSaga(params);

            onError.mockReturnValue(newPayload);

            saga.next();
            saga.next();

            expect(saga.throw(error).value).toEqual(put({
                type: Action.types[2],
                payload: newPayload
            }));

            expect(onError).lastCalledWith(error);
        });
    });

    afterAll(() => {
        fetchMock.mockRestore() 
    });
});
