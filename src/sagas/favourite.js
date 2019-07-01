//@flow

import { put, select, takeEvery } from "@redux-saga/core/effects";

import { GET_FAVOURITE, ADD_FAVOURITE, REMOVE_FAVOURITE } from 'constants/actions';
import { FAVOURITE_KEY } from 'constants/api';
import { updateFavourite } from 'actions'

import type { Saga } from 'redux-saga';
import type { RemoveFavouriteAction, AddFavouriteAction } from 'types/store';

const getLS = () =>
    JSON.parse(localStorage.getItem(FAVOURITE_KEY) || '{}');

const setLS = (map) =>
    localStorage.setItem(FAVOURITE_KEY, JSON.stringify(map))

function* getFavourite():Saga<void> {
    const LsFavourites = getLS();
    
    let cars = [];

    for(let id in LsFavourites) {
        cars.push(LsFavourites[id]);
    };

    yield put(updateFavourite(cars));
}

function* addFavourite({ payload }:AddFavouriteAction):Saga<void> {
    const { entities: { cars }, favourites } = yield select();

    const LsFavourites = getLS();
    const item = cars[payload];

    LsFavourites[payload] = item;

    setLS(LsFavourites);

    yield put(updateFavourite([item, ...favourites]));
}

function* removeFavourite({ payload }:RemoveFavouriteAction):Saga<void> {
    const { favourites } = yield select();
    const LsFavourites = getLS();
    const cars = favourites.filter(item => payload !== item.stockNumber);

    delete LsFavourites[payload];

    setLS(LsFavourites);

    yield put(updateFavourite(cars));
}

export default function* favourite():Saga<void> {
    yield takeEvery(GET_FAVOURITE, getFavourite);
    yield takeEvery(ADD_FAVOURITE, addFavourite);
    yield takeEvery(REMOVE_FAVOURITE, removeFavourite);
};