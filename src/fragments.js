import { gql } from "@apollo/client";

export const COFFEE_SHOP_PHOTO_FRAGMENT = gql`
    fragment CoffeeShopPhotoFragment on CoffeeShopPhoto {
        id
        url
    }
`;