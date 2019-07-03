//@flow

import { put, select, takeEvery } from "@redux-saga/core/effects";

import { GET_FAVOURITE, ADD_FAVOURITE, REMOVE_FAVOURITE } from 'constants/actions';
import { FAVOURITE_KEY, SORTINGS } from 'constants/api';
import { updateFavourite } from 'actions'

import type { Saga } from 'redux-saga';
import type { GetFavouriteAction, RemoveFavouriteAction, AddFavouriteAction } from 'types/store';

const getLS = () =>
    JSON.parse(localStorage.getItem(FAVOURITE_KEY) || '{}');

const setLS = (map) =>
    localStorage.setItem(FAVOURITE_KEY, JSON.stringify(map))

function* getFavourite({
    payload
}:GetFavouriteAction):Saga<void> {
    const { favourites: { sort } } = yield select();
    const LsFavourites = getLS();

    let cars = [];

    for(let id in LsFavourites) {
        cars.push(LsFavourites[id]);
    };

    if(payload && payload.color) {
        cars = cars.filter(item => item.color === payload.color)
    }

    if(payload && payload.manufacturer) {
        cars = cars.filter(item => item.manufacturerName === payload.manufacturer)
    }

    if(payload && payload.sort) {
        if (sort === SORTINGS[0]) {
            cars = cars.sort((a, b) => b.mileage.number - a.mileage.number)
        } else {
            cars = cars.sort((a, b) => a.mileage.number - b.mileage.number)
        }
    }

    yield put(updateFavourite({ 
        items: cars,
        ...payload
    }));
}

function* addFavourite({ payload }:AddFavouriteAction):Saga<void> {
    const { entities: { cars }, favourites: { items } } = yield select();

    const LsFavourites = getLS();
    const item = cars[payload];

    LsFavourites[payload] = item;

    setLS(LsFavourites);

    yield put(updateFavourite({ items: [item, ...items] }));
}

function* removeFavourite({ payload }:RemoveFavouriteAction):Saga<void> {
    const { favourites: { items } } = yield select();
    const LsFavourites = getLS();
    const cars = items.filter(item => payload !== item.stockNumber);

    delete LsFavourites[payload];

    setLS(LsFavourites);

    yield put(updateFavourite({ items: cars }));
}

export default function* favourite():Saga<void> {
    yield takeEvery(GET_FAVOURITE, getFavourite);
    yield takeEvery(ADD_FAVOURITE, addFavourite);
    yield takeEvery(REMOVE_FAVOURITE, removeFavourite);
};