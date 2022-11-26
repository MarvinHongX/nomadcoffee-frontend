import { gql, useQuery } from "@apollo/client";
import FeedLayout from "../components/feed/FeedLayout";
import FeedPhoto from "../components/feed/FeedPhoto";
import PageTitle from "../components/PageTitle";




export const SEE_COFFEE_SHOPS_QUERY = gql`
    query seeCoffeeShops($page: Int!, $photosPage: Int!){
        seeCoffeeShops(page: $page){
            id
            name
            slug
            latitude
            longitude
            user {
                username
                avatarURL
            }
            photos(page: $photosPage) {
                id
                url
            }
            categories {
                id
                name
            }
        }       
    }
`;


function Home() {
    //const [page, setPage] = useState(1);
    const page = 1;
    const photosPage = 1;
    const { data } = useQuery(SEE_COFFEE_SHOPS_QUERY, {
        variables: {
            page,
            photosPage
        },
    });

  

    return (
        <div>
        <PageTitle title="Home"/>
        <FeedLayout>
        {data?.seeCoffeeShops?.map((coffeeShop) => (
            <FeedPhoto 
                key={coffeeShop.id} 
                user={coffeeShop.user} 
                id={coffeeShop.id} 
                slug={coffeeShop.photos[0]?.slug} 
                name={coffeeShop.name} 
                url={coffeeShop.photos[0]?.url} 
            />
        ))}
        </FeedLayout>
        </div>
    );
}
export default Home;