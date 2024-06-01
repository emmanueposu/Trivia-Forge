import React from 'react';
import { useLocation } from 'react-router-dom'; // used to access passed state
import ReviewCategories from '../components/ReviewCategories';
import { Button } from 'react-bootstrap';
import { AddAllForGame, UpdateAllForGame } from '../services/saveGameService';
import { useNavigate } from "react-router-dom";
import useStore from '../hooks/useStore';
import '../App.css';

function TriviaReviewPage() {
	// Reference: https://reactrouter.com/en/main/hooks/use-location
	// pulls object from state property in TriviaGenPage
	const location = useLocation();
	const { game, page, isMultipleChoice } = location.state;
	let categories = game.categories;
	const navigate = useNavigate();
	const updateGame = useStore(state => state.updateGame);
	const addGame = useStore(state => state.addGame);
	
	console.log(game)

	const HandleUpdateGame = async () => {
		await UpdateAllForGame(game);
		updateGame(game)
		navigate('/myTrivia');
	};

	const HandleCreateGame = async () => {
		const newGame = await AddAllForGame(game);
		addGame(newGame);
		navigate('/myTrivia');
	};

	function changeValue(path, key, value) {
		let current = game
		
		for (let i = 0; i < path.length; i++) {
			current = current[path[i]]
			if (i == path.length - 1) {
				current[key] = value
				return
			}
		}
	}


	return (
		<div>
			<title>Trivia Review</title>

			<div className="trivia-review-container">
				<h1 className="trivia-review-heading">Review and Edit Trivia Questions</h1>
				{categories.map((cat, index) => (
					<div key={index} className="category-container">
						<label className="input-label">Category Name:</label>
						<input type="text" className="input-field" value={cat.title || cat.name} readOnly />
						<ReviewCategories category={cat} index={index} changeValue={changeValue} isMultipleChoice={isMultipleChoice}/>
					</div>
				))}
			</div>

			<div className="trivia-button-container">
				{page === 'edit' ? (
					<Button variant="primary" onClick={HandleUpdateGame} className="trivia-review-button">
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
