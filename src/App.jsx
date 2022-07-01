import React, { useState } from 'react';
import { toppings } from './utils/toppings';

const App = () => {

  const [isChecked, setIsChecked] = useState(false);

  const [checkedState, setCheckedState] = useState(
    new Array(toppings.length).fill(false)
  );

  const [total, setTotal] = useState(0);

  const formatPrice = (price) => `$$${price.toFixed(2)}`;

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const handleOnCheck = (position) => {
    const updatedCheckedState = checkedState
          .map((item, index) => index === position ? !item : item);

    setCheckedState(updatedCheckedState);

    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {

        if (currentState === true) {
          return sum + toppings[index].price;
        }
        return sum;
      },
      0
    );

    setTotal(totalPrice);
  };

  return (
    <div>
        Do you like pizza?
        <div className="topping">
          <input 
            type="checkbox" 
            id="topping" 
            name="topping" 
            value="Paneer"
            checked={isChecked}
            onChange={handleOnChange}
          />
          {!isChecked ? 'No' : 'Yes'}
        </div>
        <br />
        <div>
          Select your favorite pizza!
          <ul>
            {
              toppings.map(({ name, price }, index) => {
                return (
                  <li key={index}>
                    <div>
                      <div>
                        <input 
                          type="checkbox"
                          id={`custom-checkbox-${index}`}
                          name={name}
                          value={name}
                          checked={checkedState[index]}
                          onChange={() => handleOnCheck(index)}
                        />
                        <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                      </div>
                      <div className="right-section">{formatPrice(price)}</div>
                    </div>
                  </li>
                );
              })
            }
            <li>
              <div className="toppings-list-item">
                <div className="left-section">Total:</div>
                <div className="right-section">{formatPrice(total)}</div>
              </div>
            </li>
          </ul>
        </div>
    </div>
  );
};

export default App;
