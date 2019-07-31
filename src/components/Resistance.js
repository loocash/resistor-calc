import React from 'react';
import PropTypes from 'prop-types';
import { tolerances, validResistance } from "../lib/ColorCode";

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

function Resistance({
  resistor,
  onResistanceChange,
  onToleranceChange,
}) {

  const handleResistanceChange = (resistance) => {
    if (validResistance(resistance, resistor.bands)) {
      onResistanceChange(+resistance);
    }
  };

  const {resistance, tolerance} = resistor;

  return (
    <div className="Resistance">
      <Form>
        <Form.Row>

          <Form.Group as={Col} xs="8">
            <Form.Label>Resistance</Form.Label>
            <InputGroup size="sm">
              <FormControl
                className="resistance-input"
                value={resistance}
                onChange={(e) => handleResistanceChange(e.target.value)}
                placeholder="Resistance"
                aria-label="Resistance"
                aria-describedby="basic-addon1"
              />
              <InputGroup.Append>
                <InputGroup.Text id="basic-addon1">Ω</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} xs="4">
            <Form.Label>Tolerance</Form.Label>
            <FormControl
              size="sm"
              as="select"
              className="tolerance-input"
              aria-label="Tolerance"
              value={tolerance}
              onChange={(e) => onToleranceChange(+e.target.value)}
            >
              {tolerances.map(t => <option key={t} value={t}>{t}%</option>)}
            </FormControl>
          </Form.Group>

        </Form.Row>
      </Form>
    </div>
  );
}

Resistance.propTypes = {
  resistor: PropTypes.object.isRequired,
  onResistanceChange: PropTypes.func.isRequired,
  onToleranceChange: PropTypes.func.isRequired,
};

export default Resistance;
