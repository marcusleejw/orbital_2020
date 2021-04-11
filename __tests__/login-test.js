import 'react-native';
import React from 'react';
import Cart from '../userScreens/cart';
import renderer from 'react-test-renderer';

test('User Login snapshot', () => {
  const snap = renderer.create(
    <Cart />
  ).toJSON();

  expect(snap).toMatchSnapshot();
}); 