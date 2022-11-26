import { gql, useQuery } from "@apollo/client";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PageTitle from "../components/PageTitle";
import { FatText } from "../components/shared";


const SEE_PROFILE_QUERY = gql`
    query seeProfile($username: String!, $photosPage: Int!) {
        seeProfile(username: $username) {
            username
            email
            name
            location
            avatarURL
            coffeeShops {
                id
                name
                photos(page: $photosPage) {
                    id
                    url
                }
            }
        }
    }
`;

const Header = styled.div`
    display: flex;
`;
const Avatar = styled.img`
    margin-left: 50px;
    height: 160px;
    width: 160px;
    border-radius: 50%;
    margin-right: 150px;
    background-color: #2c2c2c;
`;
const Column = styled.div``;
const Username = styled.h3`
    font-size: 28px;
    font-weight: 400;
`;
const Row = styled.div`
    margin-bottom: 20px;
    font-size: 16px;
    display: flex;
    align-items: center;
`;
const List = styled.ul`
    display: flex;
`;
const Item = styled.li`
    margin-right: 20px;
`;
const Value = styled(FatText)`
    font-size: 18px;
`;
const Name = styled(FatText)`
    font-size: 20px;
`;

const Grid = styled.div`
    display: grid;
    grid-auto-rows: 290px;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    margin-top: 50px;
`;

const Photo = styled.div`
    background-image: url(${(props) => props.bg});
    background-size: cover;
    position: relative;
`;

const Icons = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    opacity: 0;
    &:hover {
        opacity: 1;
    }
`;

const Icon = styled.span`
    font-size: 18px;
    display: flex;
    align-items: center;
    margin: 0px 5px;
    svg {
    font-size: 14px;
    margin-right: 5px;
    }
`;


function User() {
    const { username } = useParams();    
    const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
        variables: {
            username,
            photosPage: 1
        },
    });
return (
    <div>
    <PageTitle
        title={
        loading ? "Loading..." : `${data?.seeProfile?.username}'s Profile`
        }
    />
    <Header>
        <Avatar src={data?.seeProfile?.avatarURL} />
        <Column>
        <Row>
            <Username>{data?.seeProfile?.username}</Username>
        </Row>
        <Row>
            <List>
            <Item>
                <span>
                <Value>{data?.seeProfile?.totalFollowers}</Value> followers
                </span>
            </Item>
            <Item>
                <span>
                <Value>{data?.seeProfile?.totalFollowing}</Value> following
                </span>
            </Item>
            </List>
        </Row>
        <Row>
            <Name>
            {data?.seeProfile?.name}
            </Name>
        </Row>
        </Column>
    </Header>
    <Grid>
        {
            data?.seeProfile?.coffeeShops.map(
                (shop) => (
                <Photo key={shop.photos[0].id} bg={shop.photos[0].url}>
                    <Icons>
                    <Icon>
                        <FontAwesomeIcon icon={faHeart} />
                    </Icon>
                    <Icon>
                        <FontAwesomeIcon icon={faComment} />
                    </Icon>
                    </Icons>
                </Photo>
                )
            )
        }
    </Grid>
    </div>
);
}

export default User;