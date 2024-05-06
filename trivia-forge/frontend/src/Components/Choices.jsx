import React from "react";
import { Choice } from "../Model/Choice";

function Choices({ choices }) {
    return (
        <div>
            {choices.map((choice, index) => {
                return (
                    <div className="card-body" key={index}>
                        <textarea className="form-control" defaultValue={choice.choice}></textarea>
                    </div>
                );
            })}
        </div>
    );
}
export default Choices;