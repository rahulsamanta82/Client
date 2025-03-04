import { FC, useState } from "react";
import { LoginForm, SiteLogo, StudentLoginMain } from "./style";
import {
    CyfyLogoDark,
    CyfyLogoSvg,
    EyeHidingSvg,
    EyeSvg,
} from "assets/images/common/svgs";
import { useNavigate } from "react-router-dom";
import { LoginFormDTO } from "utils/helpers/models/auth/login";
import { useForm } from "react-hook-form";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import FormErrorMessage from "components/particles/forms/form-error-message";
import useEportalAuth from "../useHooks";
import { useSelector } from "react-redux";

interface StudentLoginProps { }
const EPortalLogin: FC<StudentLoginProps> = ({ }) => {
    const [showPassword, setShowPassword] = useState(false);
    const { organization } = useSelector((state: any) => state.sharedReducer) || {};
    const navigate = useNavigate();
    const { userLogin } = useEportalAuth();
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
    } = useForm<any>();
    const { isDarkTheme, isLoading } = useSelector((state: any) => state.sharedReducer);

    const onSubmit = (data: LoginFormDTO) => {
        userLogin(data);
    };

    return (
        <StudentLoginMain>
            <LoginForm
                className="content-radius-shadow"
                onSubmit={handleSubmit(onSubmit)}
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
                        Enter your CNIC / Passport No. and password to login
                    </span>
                </div>
                <div className="fields">
                    <div className="input-field">
                        <label>CNIC</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input
                                    type="cnic"
                                    {...register("cnic", {
                                        required: true,
                                    })}
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
                                    {...register("password", { required: true })}
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
                        <span
                            onClick={() => navigate(siteRoutes.ePortalResetPassword)}
                            style={{ cursor: "pointer" }}
                        >
                            Forget Password?
                        </span>
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
                <div className="bottom-text">
                    <span>
                        Don't have an account ?
                    </span>
                    <span
                        className="link-text"
                        onClick={() => navigate(siteRoutes.ePortalRegister)}
                    >
                        Register here !
                    </span>
                </div>
            </LoginForm>
        </StudentLoginMain>
    );
};

export default EPortalLogin;
