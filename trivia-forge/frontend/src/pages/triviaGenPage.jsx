import { React, useState } from "react"; // variables that cause the component to re-render when they change
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import useStore from '../hooks/useStore'; // global state management
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import GenerateButtonTooltip from "../components/GenerateButtonTooltip";
import { promtChatGPT } from "../services/triviaForgeApiService";


function TriviaGenPage() {
    // state hooks for managaing number of questions and catergory input by user 
    const [numberOfQuestions, setNumberOfQuestions] = useState('');
    const [Title, setTitle] = useState('');
    const [Theme, setTheme] = useState('');
    const [categories, setCategories] = useState([{ name: '' }]);
    const [isMultipleChoice, setIsMultipleChoice] = useState(false);
    const [spinnerVisibility, setSpinnerVisibility] = useState("none");
    const [submitBtnLabel, setSubmitBtnLabel] = useState("Generate");
    const navigate = useNavigate();
    const user = useStore(state => state.currentUser); // get current user from global state
    const [categoryCount, setCategoryCount] = useState(1);

    const handleAddCategory = () => {
        if (categoryCount >= 5) {
            return;
        }
        else {
            const newCategory = { name: '' };
            setCategories([...categories, newCategory]);
            let count = categoryCount
            setCategoryCount(count + 1);
        }
    };

    const handleChangeCategoryDetail = (index, field, value) => {
        const newCategories = categories.map((category, idx) => {
            if (idx === index) {
                return { ...category, [field]: value };
            }
            return category;
        });
        setCategories(newCategories);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // prevent default form submission behavior(browser reload)

        setSubmitBtnLabel("Generating...")
        setSpinnerVisibility("")

        const message =  {
            'categories': categories,
            'numberOfQuestions': numberOfQuestions,
            'Theme': Theme,
            'isMultipleChoice': isMultipleChoice,
            'Title': Title,
            'user': user
        }
        
        let game = await promtChatGPT(message)
        // state property to pass data as object to new route
        navigate('/review', { state: { game: game, page: 'review', isMultipleChoice: isMultipleChoice } });
    };
    // render component as a form
    return (
        <>
            <title>Create New Trivia</title>

            <h1 className="text-center mt-5">
                Trivia Generator
            </h1>

            <div className="d-flex justify-content-center">
                <Card className="mt-4" style={{ width: "35rem" }}>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="triviaTitle">Title:</label>
                            <input
                                type="text"
                                value={Title}
                                onChange={e => setTitle(e.target.value)}
                                className="form-control"
                                id="triviaTitle"
                                placeholder="Title"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="triviaTitle">Theme:</label>
                            <input
                                type="text"
                                value={Theme}
                                onChange={e => setTheme(e.target.value)}
                                className="form-control"
                                id="triviaTheme"
                                placeholder="Theme"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="triviaTitle">Number of Questions per Category:</label>
                            <input
                                type="number"
                                value={numberOfQuestions}
                                onChange={e => setNumberOfQuestions(Math.min(10, Math.max(1, parseInt(e.target.value, 10))))}
                                className="form-control"
                                id="triviaTitle"
                                placeholder="Number of Questions"
                                required
                            />
                        </div>

                        <div className="form-group">
                            {categories.map((category, index) => (
                                <Card key={index} className="CardPadding">
                                    <div >
                                        <label>Category Name:</label>
                                        <input
                                            type="text"
                                            value={category.name}
                                            onChange={e => handleChangeCategoryDetail(index, 'name', e.target.value)}
                                            className="form-control"
                                            id="categoryName"
                                            placeholder="Category"
                                            required
                                        />
                                        <br />
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <button type="button" className="btn btn-secondary ms-4" onClick={handleAddCategory}>Add Category</button>

                        <div className="form-group">
                            <input
                                type="checkbox"
                                checked={isMultipleChoice}
                                onChange={e => setIsMultipleChoice(!isMultipleChoice)}
                                //className="form-control" 
                                id="multipleChoice"
                            />
                            <label htmlFor="multipleChoice" className="ms-2">Include Multiple Choice Answers</label>
                        </div>

                        <div className="d-flex justify-content-center mb-4">
                            {user ? (
                                <Button type="submit" variant="primary">
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        style={{ display: spinnerVisibility }}
                                        className="me-2"
                                    />
                                    {submitBtnLabel}
                                </Button>
                            ) : (
                                <GenerateButtonTooltip />
                            )}
                        </div>
                    </form >
                </Card >

            </div >
        </>
    );

}

export default TriviaGenPage;
