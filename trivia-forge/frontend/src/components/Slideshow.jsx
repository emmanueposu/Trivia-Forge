import { React, useState, useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel';
import Button from "react-bootstrap/esm/Button";


function Slideshow(game) {
    const [showHint, setShowHint] = useState(null);
    const [questionsAndAnswers, setquestionsAndAnswers] = useState(null);

    useEffect(() => {
        let temp = [];
        for (const category of game.data.categories) {
            for (const question of category.questions) {
                temp.push(question);
                temp.push(question.answer);
            }
        }
        setquestionsAndAnswers(temp)
        setShowHint(new Array(temp.length / 2).fill(false));
    }, []);

    function handleShowHint(index) {
        const newState = [...showHint];
        if(!newState[index]) {
            newState[index] = true;
            setShowHint(newState)
        } else {
            newState[index] = false;
            setShowHint(newState)
        }
    }

    return (
        <div className="h-100 d-flex justify-content-center">
            {questionsAndAnswers &&(
                <Carousel className="h-100 w-100 d-flex align-items-center justify-content-center" interval={null}>
                    {questionsAndAnswers.map((item, i) => (
                        <Carousel.Item key={i} className="" style={{height: "50rem" }}>
                           <div className="h-100 d-flex align-items-center justify-content-center text-center" style={{color: "white"}}>
                            {typeof item === 'string' ? (
                                        <h1>{item}</h1>
                                    ) : (
                                        <div className="d-flex flex-column align-items-center h-100">
                                            <h1 className="p-4">{item.problem}</h1>
                                            
                                            <div className="w-100">
                                                {item.choices.map((c, j) => (
                                                    <h4 key={j} className="rounded-5 p-2 w-25 m-auto mt-4" style={{border: "2px solid orange"}}>{c.text}</h4>
                                                ))}
                                            </div>
                                            
                                            <Button onClick={() => handleShowHint(i)} className="mt-5" style={{backgroundColor: "turquoise", border:"none", color:"#240046" }}>Hint</Button>
                                            {showHint[i] && (
                                                <h4 className="mt-3">{item.hint}</h4>   
                                            )}                         
                                        </div>
                                    )}
                            </div>
                        </Carousel.Item>                 
                    ))}
                </Carousel>   
            )}
        </div>    
    )

}

export default Slideshow;
