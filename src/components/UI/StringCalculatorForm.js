import { useState } from "react";

const StringCalculatorForm = (props) => {
  const [enteredString, setEnteredString] = useState("");
  const [enteredStringIsValid, setEnteredStringIsValid] = useState(true);
  const [enteredStringIsNegative, setEnteredStringIsNagative] = useState(false);
  const [negNum, setNegNum] = useState("");
  const [sum, setSum] = useState(0);

  const stringInputChangeHandler = (event) => {
    setEnteredString(event.target.value);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (enteredString.trim() === "") {
      setEnteredStringIsValid(false);
      setEnteredStringIsNagative(false);
      setSum(0);
      return 0; //1.b Empty strings should return 0
    } else {
      let stringToValidate = enteredString;
      let delimiter = ",";
      let enteredStringArr = [];
      let sum = 0;

      const getDelimiter = stringToValidate.match(/\/\/*([^0-9]*)\\n*/);
      if (getDelimiter != null) {
        delimiter = getDelimiter[1];
        let delimeterArray = delimiter.split(",");
        if (delimeterArray.length > 0) {
          stringToValidate = stringToValidate.replace(getDelimiter[0], "");
          delimeterArray.map(
            (delim) =>
              (stringToValidate = stringToValidate
                .trim()
                .split(delim)
                .join(","))
          );
          stringToValidate = stringToValidate.split(",");
        } else {
          stringToValidate = stringToValidate
            .replace(getDelimiter[0], "")
            .trim()
            .split(delimiter);
        }
      } else {
        stringToValidate = stringToValidate
          .replace(/(?:\n|\\n|\\)/g, "")
          .trim()
          .split(delimiter);
      }
      const negativeNumbers = stringToValidate.filter((el) => el < 0);
      if (negativeNumbers.length > 0) {
        setEnteredStringIsValid(true);
        setEnteredStringIsNagative(true);
        setNegNum(negativeNumbers.join(","));
        setSum(0);
        return;
      } else {
        sum = stringToValidate
          .filter((el) => el <= 1000)
          .reduce((acc, curr) => Number(acc) + Number(curr));
      }

      setSum(sum);
      setEnteredStringIsNagative(false);
      setNegNum([]);

      setEnteredStringIsValid(true);
    }
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="form-control">
        <label htmlFor="name">Enter String</label>
        <input
          type="text"
          id="string"
          onChange={stringInputChangeHandler}
          value={enteredString}
        />
        {!enteredStringIsValid && (
          <p className="error-text">String should not be empty!</p>
        )}
        {enteredStringIsNegative && (
          <p className="error-text">
            Negatives not allowed! You entered {negNum}
          </p>
        )}
        {sum > 0 && <p className="error-text">Result: {sum}</p>}
      </div>
      <div className="form-actions">
        <button type="submit">Validate</button>
      </div>
    </form>
  );
};
export default StringCalculatorForm;
