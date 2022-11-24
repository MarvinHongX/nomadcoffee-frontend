import { gql, useMutation } from "@apollo/client";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthBottomBox from "../components/auth/AuthBottomBox";
import AuthButton from "../components/auth/AuthButton";
import AuthFormBox from "../components/auth/AuthFormBox";
import AuthHeaderContainer from "../components/auth/AuthHeaderContainer";
import AuthInput from "../components/auth/AuthInput";
import AuthLayout from "../components/auth/AuthLayout";
import AuthSeparator from "../components/auth/AuthSeparator";
import AuthFormError from "../components/auth/AuthFormError";
import PageTitle from "../components/PageTitle";
import { FatLink } from "../components/shared";
import routes from "./routes";



const BottomContainer = styled.div`
    margin: 17px 0px 22px;
    color: #385285;
    font-size: 12px;
    text-align: center;
    line-height: 130%;
`;

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount(
        $username: String!
        $email: String!
        $name: String!
        $password: String!
    ) {
        createAccount(
            username: $username
            email: $email
            name: $name
            password: $password
        ) {
            ok
            error
        }
    }
`;

function SignUp() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState, getValues, setError, clearErrors } = useForm({
        mode: "onChange",
    });
    const onCompleted = (data) => {
        const {name, username, password} = getValues();
        const { 
            createAccount: { ok, error }, 
        } = data;
        if(!ok){
            return setError("result", {
                message: error,
            }); 
        }
        navigate(routes.home, {
            state:{
                message: `Welcome! ${name}. Thanks for creating a Nomad Coffee Account.`,
                username,
                password,
            }
        });
    };
    const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
        onCompleted,
    });
    const onSubmitValid = (data) => {
        if (loading) {
            return;
        }
        const { username, email, name, password } = getValues();
        createAccount({
            variables: {
                username, 
                email, 
                name,
                password,
            }
        });
    };
    const clearSignupError = () => {
        clearErrors("result");
    };
    return (
        <AuthLayout>
            <PageTitle title="Sign up" />
            <AuthFormBox>
                <AuthHeaderContainer icon={faCoffee} size="3x" subtitle="Sign up to see coffe shops near you." />
                <form>
                    <AuthButton type="submit" value="Log in with Facebook" />  
                </form>
                <AuthSeparator />
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <AuthInput 
                        {...register("email", {
                            required: "Email is required",
                        })} 
                        onFocus={clearSignupError}
                        name="email"
                        type="text" 
                        placeholder="Email" 
                        hasError={Boolean(formState.errors?.email?.message)}
                    />
                    <AuthFormError message={formState.errors?.email?.message} />
                    <AuthInput 
                        {...register("name", {
                            required: "Name is required",
                        })} 
                        onFocus={clearSignupError}
                        name="name"
                        type="text" 
                        placeholder="Full Name" 
                        hasError={Boolean(formState.errors?.name?.message)}
                    />
                    <AuthFormError message={formState.errors?.name?.message} />
                    <AuthInput 
                        {...register("username", {
                            required: "Username is required", 
                            minLength: {
                                value: 4,
                                message: "Username should be longer than 3 chars."
                            },
                        })}
                        onFocus={clearSignupError}
                        name="username"
                        type="text" 
                        placeholder="Username" 
                        hasError={Boolean(formState.errors?.username?.message)}
                    />
                    <AuthFormError message={formState.errors?.username?.message} />
                    <AuthInput 
                        {...register("password", {
                            required: "Password is required",
                        })} 
                        onFocus={clearSignupError}
                        type="password" 
                        name="password"
                        placeholder="Password" 
                        hasError={Boolean(formState.errors?.password?.message)}
                    />
                    <AuthFormError message={formState.errors?.password?.message} />
                    <AuthButton
                        type="submit" 
                        value={loading ? "Loading..." : "Sign up"}
                        disabled={!formState.isValid || loading}
                    />  
                    <AuthFormError message={formState.errors?.result?.message} />
                    </form>
                    <BottomContainer>
                        <span>By signing up, you agree to out <FatLink>Terms</FatLink>, <FatLink>Data Policy</FatLink> and <FatLink>Cookies Policy</FatLink>.</span>
                    </BottomContainer>
                </AuthFormBox>
            <AuthBottomBox callToAction="Have an account?" link={routes.home} linkText="Log in" />
        </AuthLayout>
    );
}
export default SignUp;