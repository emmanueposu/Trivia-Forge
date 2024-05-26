import React from 'react';
import { useLocation } from 'react-router-dom'; // used to access passed state
import Categories from '../Components/Categories';
import { Button } from 'react-bootstrap';
import { AddAllForGame, UpdateAllForGame } from '../Services/Services';
import { useNavigate } from "react-router-dom";
import '../App.css';

function TriviaReviewPage() {
	// Reference: https://reactrouter.com/en/main/hooks/use-location
	// pulls object from state property in TriviaGenPage
	const location = useLocation();
	const { game, page } = location.state;
	let categories = game.categories;
	const navigate = useNavigate();

	const HandleSaveGame = () => {
		UpdateAllForGame(game);
		navigate('/myTrivia');
	};

	const HandleCreateGame = async () => {
		await AddAllForGame(game);
		navigate('/myTrivia');

	};

	return (
		<div>
			<title>Trivia Review</title>
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
			<div className="trivia-button-container">
				{page === 'edit' ? (
					<Button variant="primary" onClick={HandleSaveGame} className="trivia-review-button">
						Save Changes
					</Button>
				) : (
					<Button variant="primary" onClick={HandleCreateGame} className="trivia-review-button">
						Save New Game
					</Button>
				)}
			</div>
		</div>
	);
}

export default TriviaReviewPage;