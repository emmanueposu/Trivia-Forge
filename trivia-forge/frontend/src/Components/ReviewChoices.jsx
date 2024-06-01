import React from "react";

function ReviewChoices({ data, path, index, changeValue }) {
    let newPath = structuredClone(path)
    newPath.push('choices', index)

    return (
        <div className="card-body">
            <textarea className="form-control" defaultValue={data.text} onChange={(e) => {changeValue(newPath, "text", e.target.value)}}></textarea>
        </div>
    );
}

export default ReviewChoices;
