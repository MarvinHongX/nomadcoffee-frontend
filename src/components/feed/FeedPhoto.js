import { faBookmark, faComment, faPaperPlane, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../Avatar";
import useUser from "../hooks/useUser";
import { BaseBox, FatText } from "../shared";


const Username = styled(FatText)`
    margin-left: 15px;
`;

const CoffeeShopName = styled(FatText)`
    margin-left: 15px;
`;

const PhotoFile = styled.img`
    min-width: 100%;
    max-width: 100%;
`;
const PhotoContainer = styled(BaseBox)`
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme.borderColor};
    margin-bottom: 60px;
    max-width: 470px;
`;
const PhotoHeader = styled.div`
    padding: 15px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(239, 239, 239);
`;
const PhotoData = styled.div`
    padding: 12px 15px;
`;

const PhotoActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
        display: flex;
        align-items: center;
    }
    svg {
        font-size: 20px;
    }
`;

const PhotoAction = styled.div`
    margin-right: 10px;
    cursor: pointer;
`;


function FeedPhoto({user, id, slug, name, url}){
    //const isLiked = false;
    const isLiked = true;
    const { data: userData} = useUser();
    return (
        <PhotoContainer key={id}>
            <PhotoHeader>

                <Link to={`/users/${user.username}`}>
                    <Avatar lg url={user.avatar} />
                </Link>
                <Link to={`/users/${user.username}`}>
                    <Username>{user.username}</Username>
                </Link>
                {
                    (userData?.me?.username === user.username) ? 
                        <Link to={`/shop/${id}`} >
                        <CoffeeShopName>{name}</CoffeeShopName>
                        </Link> 
                    :
                    <CoffeeShopName>{name}</CoffeeShopName>
                }                
            </PhotoHeader>
            <PhotoFile src={url} />
            <PhotoData>
                <PhotoActions>
                <div>
                    <PhotoAction>
                    <FontAwesomeIcon
                        style={{ color: isLiked ? "tomato" : "inherit" }}
                        icon={isLiked ? SolidHeart : faHeart}
                    />
                    </PhotoAction>
                    <PhotoAction>
                    <FontAwesomeIcon icon={faComment} />
                    </PhotoAction>
                    <PhotoAction>
                    <FontAwesomeIcon icon={faPaperPlane} />
                    </PhotoAction>
                </div>
                <div>
                    <FontAwesomeIcon icon={faBookmark} />
                </div>
                </PhotoActions>                
            </PhotoData>
        </PhotoContainer>
    );
}

export default FeedPhoto;