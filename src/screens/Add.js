import { gql, useMutation } from "@apollo/client";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ShopBottomBox from "../components/shop/ShopBottomBox";
import ShopButton from "../components/shop/ShopButton";
import ShopFormBox from "../components/shop/ShopFormBox";
import ShopHeaderContainer from "../components/shop/ShopHeaderContainer";
import ShopInput from "../components/shop/ShopInput";
import ShopLayout from "../components/shop/ShopLayout";
import ShopFormError from "../components/shop/ShopFormError";
import PageTitle from "../components/PageTitle";
import routes from "./routes";
import { SEE_COFFEE_SHOPS_QUERY } from "./Home";



const BottomContainer = styled.div`
    margin: 17px 0px 22px;
    color: #385285;
    font-size: 12px;
    text-align: center;
    line-height: 130%;
`;

const CREATE_COFFEE_SHOP_MUTATION = gql`
    mutation createCoffeeShop(
        $name: String!
        $latitude: String
        $longitude: String
        $categories: [String]!
        $photos: [Upload]
    ) {
        createCoffeeShop(
            name: $name
            latitude: $latitude
            longitude: $longitude
            categories: $categories
            photos: $photos
        ) {
            ok
            error
        }
    }
`;

function Add() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState, getValues, setError, clearErrors } = useForm({
        mode: "onChange",
    });
    const onCompleted = (data) => {
        const { name } = getValues();
        const { 
            createCoffeeShop: { ok, error }, 
        } = data;
        if (!ok) {
            return setError("result", {
                message: error,
            }); 
        }
        navigate(routes.shopWelcome, {
            state:{
                message: `Welcome! ${name}. Thanks for regist your shop.`,
            }
        });
    };
    const [createCoffeeShop, { loading } ] = useMutation(CREATE_COFFEE_SHOP_MUTATION, {
        onCompleted,
    });
    const onSubmitValid = (data) => {
        if (loading) {
            return;
        }
        const { name } = getValues();
        createCoffeeShop({
            variables: {
                name,
                categories: ["백다방"],
            },
            refetchQueries: [
                { 
                    query: SEE_COFFEE_SHOPS_QUERY, 
                    variables: {
                        page:1,
                        photosPage:1
                    },  
                }
            ],
        });
    };
    const clearAddError = () => {
        clearErrors("result");
    };
    return (
        <ShopLayout>
            <PageTitle title="Sign up" />
            <ShopFormBox>
                <ShopHeaderContainer icon={faCoffee} size="3x" subtitle="Register your shop on the Nomad Caffee." />
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <ShopInput 
                        {...register("name", {
                            required: "Name is required",
                        })} 
                        onFocus={clearAddError}
                        name="name"
                        type="text" 
                        placeholder="Shop name" 
                        hasError={Boolean(formState.errors?.name?.message)}
                    />
                    <ShopFormError message={formState.errors?.name?.message} />
                    <ShopButton
                        type="submit" 
                        value={loading ? "Loading..." : "Register"}
                        disabled={!formState.isValid || loading}
                    />  
                    <ShopFormError message={formState.errors?.result?.message} />
                </form>
                <BottomContainer>
                    <span>You are creating a shop in your personal account.</span>
                </BottomContainer>
                </ShopFormBox>
                <ShopBottomBox callToAction="Would you like to go back?" link={routes.home} linkText="Go Back" />
        </ShopLayout>
    );
}
export default Add;