import React from 'react';
import { useLocation } from 'react-router-dom'; // used to access passed state
import Categories from '../Components/Categories';
import { Button } from 'react-bootstrap';
import '../App.css';

function TriviaReviewPage() {
	// Reference: https://reactrouter.com/en/main/hooks/use-location
	// pulls object from state property in TriviaGenPage
	const location = useLocation();
	const { game } = location.state;
	let categories = game.categories;
	
	return (
		<div>
			<div className="trivia-review-container">
				<h1 className="trivia-review-heading">Review and Edit Trivia Questions</h1>
				{categories.map((cat, index) => (
					<div key={index} className="category-container">
						<label className="input-label">Category Name:</label>
						<input type="text" className="input-field" value={cat.name} readOnly />
						<Categories category={cat} />
					</div>
				))}
			</div>
			<div block className="trivia-button-container">
				<Button variant="primary" className="trivia-review-button">
					Save Changes
				</Button>
			</div>
		</div>
	);
}

export default TriviaReviewPage;