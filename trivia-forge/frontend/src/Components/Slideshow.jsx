import { React, useState, useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel';
import { getCategories, getQuestions ,getChoices } from "../Services/TF-db_services";
import Spinner from 'react-bootstrap/Spinner';
import Button from "react-bootstrap/esm/Button";


function Slideshow(game) {
    const [loading, setLoading] = useState("border");
    const [spinnerVisibility, setSpinnerVisibility] = useState("initial");
    const [hintColor, setHintColor] = useState("#240046");
    const [categories, setCategories] = useState(null);
    const [questions, setQuestions] = useState(null);
    const [questionsAndChoices, setQuestionsAndChoices] = useState(null);

    useEffect(() => {
        getCategories(game.data).then( res => {
            setCategories(res);
        });
    }, []);

    useEffect(() => {
        if (categories) {
            let category_ids = new Set();
            for (let i = 0; i < categories.length; i++) {
                category_ids.add(categories[i].id);
            };
            getQuestions(category_ids).then( res => {
                setQuestions(res);
            });
        }
    }, [categories]);

    useEffect(() => {
        if (questions) {
            const questionObj = {};
            for (let i = 0; i < questions.length; i++) {
                questionObj[questions[i].id] = questions[i];
                questionObj[questions[i].id]["choices"] = [];
            };
            getChoices(questionObj).then( res => {
                let temp = []
                for (let key in res) {
                    temp.push(res[key])
                    temp.push(res[key].answer)
                }
                setQuestionsAndChoices(temp);
                setLoading(false);
                setSpinnerVisibility("none");
            });
        }
    }, [questions]);
    
    function handleShowHint() {
        if (hintColor == "#240046") {
            setHintColor("white")
        } else {
            setHintColor("#240046")
        }
    }



    return (
        <div className="h-100 d-flex align-items-center justify-content-center" style={{backgroundColor: "#240046" }}>
            <Spinner animation={loading} role="status" variant="light" className="" style={{ height: "9rem", width: "9rem", display: spinnerVisibility }} />
            {questionsAndChoices &&(
                <Carousel className="flex-grow-1 h-100" interval={null}>
                    {questionsAndChoices.map((item, i) => (
                        <Carousel.Item key={i} className="" >
                           <div className="" style={{ height: "65vh" }}>
                           </div>
                            <Carousel.Caption>
                                {typeof item === 'string' ? (
                                    <h1 className="p-4 mb-5">{item}</h1>
                                ) : (
                                    <div className="d-flex flex-column align-items-center">
                                        <h1 className="p-4">{item.problem}</h1>
                                        <div className="w-75">
                                            {item.choices.map((c, j) => (
                                                <h4 key={j} className="rounded-5 p-2 w-25 m-auto mt-4" style={{border: "2px solid orange", backgroundColor: "", color: ""}}>{c}</h4>
                                            ))}
                                        </div>
                                        <Button onClick={() => handleShowHint()} className="mt-5" style={{backgroundColor: "turquoise", border:"none", color:"#240046" }}>Hint</Button>
                                        <h4 style={{color: hintColor}} className="mt-3">{item.hint}</h4>                            
                                    </div>
                                )}
                            </Carousel.Caption>
                        </Carousel.Item>                 
                    ))}
                </Carousel>   
            )}
        </div>       
    )

}

export default Slideshow;