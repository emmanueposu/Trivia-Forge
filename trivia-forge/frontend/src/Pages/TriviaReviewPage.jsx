import React from 'react';
import { useLocation } from 'react-router-dom'; // used to access passed state
import Categories from '../Components/Categories';
import { Button } from 'react-bootstrap';

function TriviaReviewPage() {
	// Reference: https://reactrouter.com/en/main/hooks/use-location
	// pulls object from state property in TriviaGenPage
	const location = useLocation();
	const { game } = location.state;
	let categories = game.categories;
	return (
		<div>
			<h1>Review and Edit Trivia Questions</h1>

			{categories.map((cat, index) => (
				<Categories key={index} category={cat} />

			))}
			<Button variant="primary" size="lg" block>
				Save Changes</Button>
		</div>
	);
}

export default TriviaReviewPage;