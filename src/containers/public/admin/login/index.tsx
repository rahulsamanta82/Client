import { FC, useEffect, useRef, useState } from "react";
import {
    LeftSection,
    LoginMain,
    LoginForm,
    SiteLogo,
    RightSection,
    Content,
} from "./style";
import {
    CyfyLogoDark,
    CyfyLogoSvg,
    EyeHidingSvg,
    EyeSvg,
} from "assets/images/common/svgs";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { LoginFormDTO } from "utils/helpers/models/auth/login";
import useAdmin from "../useHooks";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

interface AdminLoginProps { }

const AdminLogin: FC<AdminLoginProps> = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { adminLogin } = useAdmin();
    const { organization } = useSelector((state: any) => state.sharedReducer) || {};
    const orgVisionRef = useRef<any>(null);
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
    } = useForm<LoginFormDTO>({
        defaultValues: new LoginFormDTO(),
    });
    const { isDarkTheme, isLoading } = useSelector((state: any) => state.sharedReducer);

    const onSubmit = (data: any) => {
        adminLogin(data);
    };

    const navigate = useNavigate()

    const goToForgetPassword = () => {
        navigate(siteRoutes.forgetPassword)
    }

    return (
        <LoginMain>
            <LeftSection>
                <LoginForm
                    className="content-radius-shadow"
                    onSubmit={handleSubmit(onSubmit)}
                    aria-disabled={isLoading}
                >
                    {!organization?.logo ? <SiteLogo>
                        {isDarkTheme ? (
                            <CyfyLogoDark className="icon" />
                        ) : (
                            <CyfyLogoSvg className="icon" />
                        )}
                    </SiteLogo> : <SiteLogo>
                        <img src={organization?.logo} /></SiteLogo>}
                    <div className="form-header">
                        <span className="heading">Welcome Back!</span>
                        <span className="sub-heading">
                            Enter Email & Password to continue
                        </span>
                    </div>
                    <div className="fields">
                        <div className="input-field">
                            <label>Email</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input
                                        type="email"
                                        {...register("email", {
                                            required: true,
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email",
                                            },
                                        })}
                                        placeholder="username@gmail.com"
                                    />
                                </div>
                                <FormErrorMessage
                                    error={errors.email}
                                    touched={touchedFields.email}
                                />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Password</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="new-password"
                                        {...register("password", {
                                            required: true,
                                            minLength: {
                                                value: 4,
                                                message: 'Password must be at least 8 characters'
                                            }
                                        })}
                                        placeholder="Password"
                                    />
                                    <span
                                        className="field-icon"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeSvg className="password-icon" />
                                        ) : (
                                            <EyeHidingSvg className="password-icon" />
                                        )}
                                    </span>
                                </div>
                                <FormErrorMessage
                                    error={errors.password}
                                    touched={touchedFields.password}
                                />
                            </div>
                        </div>
                        <div className="bottom-options">
                            <div className="remember-me">
                                <input
                                    type="checkbox"
                                    {...register("rememberMe", { required: false })}
                                    id="rememberMe"
                                />
                                <label htmlFor="rememberMe">Remember Me</label>
                            </div>
                            <span className="forget" onClick={goToForgetPassword}>Forget Password?</span>
                        </div>

                        <div className="submit-button">
                            <button type="submit">
                                {isLoading ? (
                                    <div className="loader">
                                        <div className="sm-w-rounded-loader"></div>
                                    </div>
                                ) : (
                                    <span>Sign In</span>
                                )}
                            </button>
                        </div>
                    </div>
                </LoginForm>
            </LeftSection>
            <RightSection>
                <Content>
                    <div className="heading-section">
                        <span className="heading-1">Welcome to</span>
                        <span className="heading-2">University Management System</span>
                    </div>
                    {!organization?.vision ? <div className="paragraph">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia laborum.
                    </div> : <div className="paragraph" dangerouslySetInnerHTML={{ __html: organization?.vision }} ref={orgVisionRef} />}
                </Content>
            </RightSection>
        </LoginMain>
    );
};

export default AdminLogin;
