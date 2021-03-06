import {chart} from "./chart";
import {precision} from "./utils";
import {Resistor, bandsToDigits} from "./resistor";

/**
 * Create a resistor instance from the color code
 * @param  {string[]} code - 3, 4 or 5 arguments each of which is a color from the colorNames array
 * @returns {Resistor} resistor - decoded instance of the Resistor
 */
export const codeToResistor = code => {
  const bands = code.length;
  const digits = bandsToDigits(bands);

  // So that if we have digits a, b, c - the whole number is 100*a + 10*b + c
  // if a, b the whole number is 10*a + b
  const resistance = figures(code).reduce(
    (acc, color) => acc * 10 + chart[color].value, 0);

  const multiplier = chart[code[digits]].multiplier;
  const tolerance = bands === 3 ? 20 : chart[code[digits+1]].tolerance;
  const finalResistance = precision(resistance * multiplier);

  return new Resistor(finalResistance, tolerance, bands);
};

/**
 * Returns the slice of the code which corresponds to the figures
 * @param {string[]} code
 * @returns {string[]}
 */
export const figures = code => code.slice(0, bandsToDigits(code.length));

/**
 * Returns the slice of the code which corresponds to the multiplier and tolerance
 * @param {string[]} code
 * @returns {string[]}
 */
export const properties = code => code.slice(bandsToDigits(code.length));
