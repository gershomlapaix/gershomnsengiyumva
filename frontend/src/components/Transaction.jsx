import React, { useState } from "react";
import { transaction } from "./../api/transactions";
import "./../styles/transactions.css";
import changeFromTimeStamp from "../utils/ChangeToMonth";

export default function Transaction() {
  const [amount, setAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState({ value: "" });
  const [transactionResult, setTransactionResult] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (amount === 0 || amount === "") {
      setErrorMessage((prevState) => ({
        value: "Empty amount",
      }));
      setAmount(0);
    } else {
      const transactionResult = await transaction(amount);      
      setTransactionResult(transactionResult);
    }

    setAmount(0);
  };

  return (
    <>
      <div className="transactions-page">
        <div className="">
          <img
            src="https://cdn.pixabay.com/photo/2017/10/14/11/30/block-chain-2850276_960_720.jpg"
            alt="jj"
          />
        </div>

        <div className="form">
          <form>
            <h3>Buy power</h3>

            <label htmlFor="Amount">Amount number</label>
            <input
              type="Number"
              placeholder="Amount"
              id="password"
              onChange={(e) => setAmount(e.target.value)}
            />
            {errorMessage.value && (
              <p className="text-danger"> {errorMessage.value} </p>
            )}

            <button type="submit" onClick={handleSubmit}>
              <a href="#" className="btn btn-buy">
                Buy
              </a>
            </button>
          </form>
        </div>

        {transactionResult.status ? (
          <div className="modal" id="modal-one" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-header">
                <h2>{transactionResult.status} !!!</h2>
                <a href="#modal-one" class="btn-close" aria-hidden="true">
                  ×
                </a>
              </div>
              <div className="modal-body">
                <p>Token: {transactionResult.data.newTransaction.token}</p>
                <p>
                  Valid up to:{" "}
                  {changeFromTimeStamp(
                    transactionResult.data.newTransaction.tokenExpires
                  )}
                </p>
              </div>
              <div className="modal-footer">
                {" "}
                <a href="#modal-one" class="btn">
                  Ok
                </a>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
