import React from "react";


function Choices({ choices }) {
    return (
        <div>
            {choices.map((choice, index) => {
                return (
                    <div className="card-body" key={index}>
                        <textarea className="form-control" defaultValue={choice.text}></textarea>
                    </div>
                );
            })}
        </div>
    );
}
export default Choices;