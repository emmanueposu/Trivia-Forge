import { React} from "react";


function UnorderedCategoriesList(game) {
    const categories = game.data.categories;

    return (
        <>
            {categories && (
                categories.map((category, index) => (
                    <span key={index}> • {category.title}</span>
                ))
            )}
        </>
    )
}

export default UnorderedCategoriesList;
