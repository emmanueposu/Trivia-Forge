import { React, useState, useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel';
import { getCategories, getQuestions ,getChoices } from "../Services/TF-db_services";
const slideshowBackground = "https://yxdrsdfocuonvorowgaa.supabase.co/storage/v1/object/sign/UI%20Assets/white-solid-color-background?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJVSSBBc3NldHMvd2hpdGUtc29saWQtY29sb3ItYmFja2dyb3VuZCIsImlhdCI6MTcxNTE3MDQ0NywiZXhwIjo0ODY4NzcwNDQ3fQ.dPaQP-yvK0-k6wBJWrI6FqrXGEqv6Vv-a8Th99zGSyA&t=2024-05-08T12%3A14%3A08.001Z"


function Slideshow(game) {
    const [categories, setCategories] = useState(null);
    const [questions, setQuestions] = useState(null);
    const [choices, setChoices] = useState(null);

    useEffect(() => {
        getCategories(game.data).then( res => {
            setCategories(res);
        });
    }, []);

    useEffect(() => {
        if (categories) {
            const data = new Set();
            for (let i = 0; i < categories.length; i++) {
                data.add(categories[i].id)
            };
            getQuestions(data).then( res => {
                setQuestions(res);
            });
        }
    }, [categories]);

    // useEffect(() => {
    //     if (questions) {
    //         const data = new Set();
    //         for (let i = 0; i < categories.length; i++) {
    //             data.add(categories[i].id)
    //         };
    //         getQuestions(data).then( res => {
    //             setQuestions(res);
    //         });
    //     }
    // }, [questions]);


    return (
        <>
            {questions &&(
                <Carousel data-bs-theme="dark" className="h-100">
                    {questions.map((q, index) => (
                        <Carousel.Item key={index}>
                            <img src={slideshowBackground} className="d-block"/>
                            <Carousel.Caption>
                                <h3>{q.problem}</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>   
            )}
        </>       
    )

}

export default Slideshow;