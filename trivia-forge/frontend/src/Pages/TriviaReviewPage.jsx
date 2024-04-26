import React from 'react';
import { useLocation } from 'react-router-dom'; // used to access passed state

function TriviaReviewPage() {
	// Reference: https://reactrouter.com/en/main/hooks/use-location
	// pulls object from state property in TriviaGenPage
	const location = useLocation();
	const { questions } = location.state;
	
	return (
		<div>
			<h1>Review and Edit Trivia Questions</h1>
			{questions.map((question, index) => (
				<div key={index} className="card">
					<div className="card-body">
						<textarea className="form-control" defaultValue={question}></textarea>
					</div>
				</div>
			))}
		</div>
	);
}

export default TriviaReviewPage;