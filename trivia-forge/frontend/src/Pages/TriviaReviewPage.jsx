import React from 'react';
import { useLocation } from 'react-router-dom'; // used to access passed state
import Questions from '../Components/Questions';
import { Button } from 'react-bootstrap';

function TriviaReviewPage() {
	// Reference: https://reactrouter.com/en/main/hooks/use-location
	// pulls object from state property in TriviaGenPage
	const location = useLocation();
	const { game } = location.state;
	let category = game.categories[0];
	let questions = category.questions;
	return (
		<div>
			<h1>Review and Edit Trivia Questions</h1>

			{questions.map((q, index) => (
				<Questions key={index} data={q} />

			))}
			<Button variant="primary" size="lg" block>
				Save Changes</Button>
		</div>
	);
}

export default TriviaReviewPage;