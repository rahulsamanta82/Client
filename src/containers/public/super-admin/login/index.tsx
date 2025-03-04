import { FC, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import useStore from "hooks/useStore";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import useSuperAdmin from "../useHooks";
import { LoginFormDTO } from "utils/helpers/models/auth/login";
import { useSelector } from "react-redux";
import Footer from "components/layout/footer/inde";

interface SuperAdminLoginProps { }

const SuperAdminLogin: FC<SuperAdminLoginProps> = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { superAdminLogin } = useSuperAdmin();
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
    } = useForm<LoginFormDTO>({
        defaultValues: new LoginFormDTO(),
    });
    const { isDarkTheme, isLoading } = useSelector(
        (state: any) => state.sharedReducer
    );

    const onSubmit = (data: any) => {
        superAdminLogin(data);
    };

    return (
        <>
        <LoginMain>
            <LeftSection>
                <LoginForm
                    className="content-radius-shadow"
                    onSubmit={handleSubmit(onSubmit)}
                    aria-disabled={isLoading}
                >
                    <SiteLogo>
                        {isDarkTheme ? (
                            <CyfyLogoDark className="icon" />
                        ) : (
                            <CyfyLogoSvg className="icon" />
                        )}
                    </SiteLogo>
                    <div className="form-header">
                        <span className="heading">Welcome Back!</span>
                        <span className="sub-heading">
                            Enter Username & Password to continue
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
                                                message: "Password must be at least 8 characters",
                                            },
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
                            {/* <span>Forget Password?</span> */}
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
                    <div className="paragraph">
                        UMS-on-Cloud is made to enhance instructors, staff, and students'
                        rapid access to latest information and connects that information to
                        specified actions. CMS is logically divided into several modules
                        each of which maps to a university function/department. The CMS
                        provides an integrated platform for managing academic activities,
                        controlling process flows, and provide online access to related
                        information. It improves the efficiency and effectiveness of the
                        universities and eventually improves the quality of teaching. With
                        UMS-on-Cloud, Schools, Colleges, Higher Education Institutions [HEI]
                        of all the category, around the globe can manage the entire student
                        lifecycle. The software supports the management of thousands of
                        employees.
                    </div>
                </Content>
            </RightSection>
        </LoginMain>
        {/* <Footer/> */}
        </>
    );
};

export default SuperAdminLogin;
