import React from "react";
// import Button from 'react-bootstrap/Button';

function Home() {
    return (
        <div id="test">
            <h2 class="mt-5 mb-3">Customize Your Game!</h2>
            <div class="container">
                <div class="justify-content-center d-flex text-start">
                    <form class="border rounded-4 p-5 col-5" id="customForm">
                        <label class="form-label">Game Name</label>
                        <input type="text" class="form-control"></input>
                        <label class="form-label mt-3">Catgeories</label>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" name="category"></input>
                            <label class="form-check-label" for="category">History</label>
                        </div>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" name="category"></input>
                            <label class="form-check-label" for="category">Science</label>
                        </div>    
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" name="category"></input>
                            <label class="form-check-label" for="category">Geography</label>
                        </div>    
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" name="category"></input>
                            <label class="form-check-label" for="category">Sports</label>
                        </div>
                        <div class="form-check">                
                            <input type="checkbox" class="form-check-input" name="category"></input>
                            <label class="form-check-label" for="category">Art and Literature</label>
                        </div>
                        <label class="form-label mt-3">Number of Questions</label>
                        <input type="number" class="form-control" min="1"></input>
                        <label class="form-label mt-3">Difficulty</label>
                        <div class="form-check">
                            <input type="radio" class="form-check-input" name="category"></input>
                            <label class="form-check-label" for="category">Easy</label>
                        </div>
                        <div class="form-check">
                            <input type="radio" class="form-check-input" name="category"></input>
                            <label class="form-check-label" for="category">Medium</label>
                        </div>    
                        <div class="form-check mb-3">
                            <input type="radio" class="form-check-input" name="category"></input>
                            <label class="form-check-label" for="category">Hard</label>
                        </div>
                        <div class="text-center">        
                            <button type="submit" class="btn btn-warning">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}
export default Home;