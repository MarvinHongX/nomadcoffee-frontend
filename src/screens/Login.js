import { gql, useMutation } from "@apollo/client";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logUserIn } from "../apollo";
import AuthBottomBox from "../components/auth/AuthBottomBox";
import AuthButton from "../components/auth/AuthButton";
import AuthFormBox from "../components/auth/AuthFormBox";
import AuthHeaderContainer from "../components/auth/AuthHeaderContainer";
import AuthInput from "../components/auth/AuthInput";
import AuthLayout from "../components/auth/AuthLayout";
import AuthSeparator from "../components/auth/AuthSeparator";
import AuthFormError from "../components/auth/AuthFormError";
import PageTitle from "../components/PageTitle";
import routes from "./routes";



const FacebookLogin = styled.div`
    color: #385285;
    font-size: 13px;
    span {
        margin-left: 10px;
        font-weight: 600;
    }
`;
const PasswordForgot = styled.div`
    margin-top: 28px;
    color: #385285;
    font-size: 12px;
    
`;
const LOGIN_MUTATION = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            ok
            token
            error
        }
    }
`;


function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { register, handleSubmit, formState, getValues, setError, clearErrors } = useForm({
        mode: "onChange",
        defaultValues: {
            username: location?.state?.username || "",
            password: location?.state?.password || "",
        }
    });
    const onCompleted = (data) => {
        const {
            login: { ok, error, token },
        } = data;
        if (!ok) {
            return setError("result", {
                message: error,
            });
        }
        if (token) {
            logUserIn(token);
        }
        navigate(location?.pathname || routes.home);
      };
      const [login, { loading }] = useMutation(LOGIN_MUTATION, {
        onCompleted,
      });
    const onSubmitValid = (data) => {
        if (loading) {
            return;
        }
        const { username, password } = getValues();
        login({
            variables: { username, password },
        });
    };
    const clearLoginError = () => {
        clearErrors("result");
    };
    return (
        <AuthLayout>
            <PageTitle title="Login" />
            <AuthFormBox>
                <AuthHeaderContainer icon={faCoffee} size="3x" subtitle={location?.state?.message || ""}/>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <AuthInput 
                        {...register("username", {
                            required: "Username is required", 
                            minLength: {
                                value: 3,
                                message: "Username should be longer than 2 chars."
                            },
                        })}
                        onFocus={clearLoginError}
                        name="username" 
                        type="text" 
                        placeholder="Username"
                        hasError={Boolean(formState.errors?.username?.message)}
                    />
                    <AuthFormError message={formState.errors?.username?.message} />
                    <AuthInput 
                        {...register("password", {
                            required: "Password is required"
                        })}
                        onFocus={clearLoginError}
                        name="password" 
                        type="password" 
                        placeholder="Password"
                        hasError={Boolean(formState.errors?.password?.message)}
                    />
                    <AuthFormError message={formState.errors?.password?.message} />
                    <AuthButton 
                        type="submit" 
                        value={loading ? "Loading..." : "Log in"}
                        disabled={!formState.isValid || loading}
                    />
                    <AuthFormError message={formState.errors?.result?.message} />
                </form>
                <AuthSeparator />
                <FacebookLogin>
                    <FontAwesomeIcon icon={faFacebookSquare} />
                    <span>Log in with Facebook</span>
                </FacebookLogin>
                <PasswordForgot>
                    <span>Forgot password?</span>
                </PasswordForgot>
            </AuthFormBox>
            <AuthBottomBox callToAction="Don't have an account?" link={routes.signUp} linkText="Sign up" />
        </AuthLayout>
    );
}
export default Login;