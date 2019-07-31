import React from 'react';

import Resistance from '../components/Resistance';
import { Resistor } from '../lib/ColorCode';

import {render, cleanup, fireEvent} from "@testing-library/react";

afterEach(cleanup);

let resistanceInput, toleranceInput, props;

const sampleProps = () => ({
  onResistanceChange: jest.fn(),
  onToleranceChange: jest.fn(),
  resistor: new Resistor(130, 5, 5),
});

beforeEach(() => {
  props = sampleProps();
  const { getByLabelText } = render(<Resistance {...props} />);
  resistanceInput = getByLabelText('Resistance');
  toleranceInput = getByLabelText('Tolerance');
});

test('renders proper resistance and tolerance values', () => {
  expect(resistanceInput.value).toBe(String(props.resistor.resistance));
  expect(toleranceInput.value).toBe(String(props.resistor.tolerance));
});

test('calls onResistanceChange when the resistance is changed', () => {
  fireEvent.change(resistanceInput, { target: { value: 100 }});
  expect(props.onResistanceChange).toHaveBeenCalledWith(100);
});

test('calls onToleranceChange when the tolerance is changed', () => {
  fireEvent.change(toleranceInput, { target: { value: 10 }});
  expect(props.onToleranceChange).toHaveBeenCalledWith(10);
});
