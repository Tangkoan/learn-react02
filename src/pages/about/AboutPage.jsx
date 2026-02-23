import { countStore } from "../../store/configStore";

const AboutPage = () => {

    const {count, category} = countStore();

    return(
        <div>
            <h1>About Page</h1>
            <h1>count: {count}</h1>
            <h1>categroy: {category.length}</h1>
        </div>
    )
}

export default AboutPage;