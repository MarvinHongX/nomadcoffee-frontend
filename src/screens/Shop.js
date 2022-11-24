import { gql, useMutation, useQuery } from "@apollo/client";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ShopBottomBox from "../components/shop/ShopBottomBox";
import ShopButton from "../components/shop/ShopButton";
import ShopFormBox from "../components/shop/ShopFormBox";
import ShopHeaderContainer from "../components/shop/ShopHeaderContainer";
import ShopInput from "../components/shop/ShopInput";
import ShopLayout from "../components/shop/ShopLayout";
import ShopFormError from "../components/shop/ShopFormError";
import PageTitle from "../components/PageTitle";
import routes from "./routes";
import ShopSeparator from "../components/shop/ShopSeparator";
import ShopDeleteButton from "../components/shop/ShopDeleteButton";
import { FatLink } from "../components/shared";
import styled from "styled-components";
import { SEE_COFFEE_SHOPS_QUERY } from "./Home";


const BottomContainer = styled.div`
    margin: 17px 0px 22px;
    color: #385285;
    font-size: 12px;
    text-align: center;
    line-height: 130%;
`;


const SEE_COFFEE_SHOP_QUERY = gql`
    query seeCoffeeShop (
        $id: Int!, 
        $photosPage: Int!
    ){
        seeCoffeeShop (id: $id){
            id
            name
            slug
            latitude
            longitude
            user {
                username
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


const EDIT_COFFEE_SHOP_MUTATION = gql`
    mutation editCoffeeShop(
        $id: Int!
        $name: String
        $latitude: String
        $longitude: String
        $categories: [String]
    ) {
        editCoffeeShop(
            id: $id,
            name: $name, 
            latitude: $latitude,
            longitude: $longitude,
            categories: $categories
        ) {
            ok
            error
        }
    }
`;


const DELETE_COFFEE_SHOP_MUTATION = gql`
    mutation deleteCoffeeShop($id: Int!){
        deleteCoffeeShop(id: $id){
            ok
            error
        }
    }
`;


function Shop() {
    const navigate = useNavigate();
    const navigate2 = useNavigate();
    
    
    const { id } = useParams();
    const photosPage = 1;
    
    const { watch, register, handleSubmit, formState, getValues, setError, clearErrors } = useForm({
        mode: "onChange"
    });
    const watchName = watch("name");
    const onCompleted = (data) => {
        const {
            editCoffeeShop: { ok, error },
        } = data;
        if (!ok) {
            return setError("result", {
                message: error,
            });
        }
        navigate(routes.home);
    };
    const updateShop = (cache, result) => {
        const {
            data: {
                editCoffeeShop: { ok },
            },
        } = result;
        if (ok) {
            cache.writeFragment({
                id:`CoffeeShop:${id}`,
                fragment: gql`
                    fragment editCoffeeShop on CoffeeShop {
                        name
                    }
                `,
                data: {
                    name: watchName,
                },
            });
        }
    }
    const [editCoffeeShop, { loading }] = useMutation(EDIT_COFFEE_SHOP_MUTATION, {
        onCompleted,
        update: updateShop
    });
    const onSubmitValid = (_) => {
        if (loading) {
            return;
        }
        const { name } = getValues();
        editCoffeeShop({
            variables: { id: parseInt(id), name },
        });
    };
    const clearEditCoffeeShopError = () => {
        clearErrors("result");
    };
    
    const { data } = useQuery(SEE_COFFEE_SHOP_QUERY, {
        variables: {
            id: parseInt(id),
            photosPage, 
        },
    });
    
    

    const { 
        watch: watch2,
        register: register2, 
        handleSubmit: handleSubmit2, 
        formState: formState2,
        setError: setError2, 
        clearErrors: clearErrors2
    } = useForm({
        mode: "onChange",
    });
    const watchConfirmDeleteName = watch2("confirmDeleteName");

    const onCompleted2 = (data) => {
        const {
            deleteCoffeeShop: { ok, error },
        } = data;
        if (!ok) {
            return setError2("result", {
                message: error,
            });
        }
        navigate2(routes.home, {
            state:{
                message: "Delete OK",
            }
        });
    };

    const [deleteCoffeeShop, { loading: loading2 }] = useMutation(DELETE_COFFEE_SHOP_MUTATION, {
        onCompleted: onCompleted2,
    });
    const onSubmitValid2 = (_) => {
        if (loading2) {
            return;
        }
        deleteCoffeeShop({
            variables: { id: parseInt(id) },
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
    const clearDeleteCoffeeShopError = () => {
        clearErrors2("result");
    };


    return (
        <ShopLayout>
            <PageTitle title="Shop" />
            <ShopFormBox>
                <ShopHeaderContainer icon={faCoffee} size="3x" subtitle={"Coffee shop info in Nomad Coffee services."}/>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <ShopInput 
                        {...register("name")}
                        onFocus={clearEditCoffeeShopError}
                        name="name" 
                        type="text" 
                        placeholder={data?.seeCoffeeShop?.name}
                        defaultValue={data?.seeCoffeeShop?.name}
                        hasError={Boolean(formState.errors?.name?.message)}
                    />
                    <ShopFormError message={formState.errors?.name?.message} />
                    <ShopButton 
                        type="submit" 
                        value={loading ? "Loading..." : "Done"}
                        disabled={!formState.isValid || loading}
                    />
                    <ShopFormError message={formState.errors?.result?.message} />
                </form>
                <ShopSeparator />
                <form onSubmit={handleSubmit2(onSubmitValid2)}>
                    <BottomContainer>
                    <span>Please type <FatLink>{data?.seeCoffeeShop?.name}</FatLink> to confirm.</span>
                    </BottomContainer>
                    <ShopInput 
                            {...register2("confirmDeleteName", {
                                required: "name is required",
                            })}
                            onFocus={clearDeleteCoffeeShopError}
                            name="confirmDeleteName" 
                            type="text" 
                            hasError={Boolean(formState2.errors?.confirmDeleteName?.message)}
                    />
                    <ShopDeleteButton
                        type="submit"
                        value={loading2 ? "Loading..." : "Delete"}
                        disabled={!(watchConfirmDeleteName === data?.seeCoffeeShop?.name) || loading2}
                    />
                    <ShopFormError message={formState2.errors?.result?.message} />
                </form>
                
            </ShopFormBox>
            <ShopBottomBox callToAction="Would you like to go back?" link={routes.home} linkText="Go Back" />
        </ShopLayout>
    );
}
export default Shop;