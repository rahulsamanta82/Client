import { FC, useEffect, useState } from "react";
import { ResetForm, SiteLogo, ResetMain } from "./style";
import {
    CyfyLogoDark,
    CyfyLogoSvg,
} from "assets/images/common/svgs";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const EportalResetPassword: FC = () => {
    const [portion, setPortion] = useState(1);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        trigger,
        formState: { errors },
    } = useForm<any>({ criteriaMode: "all" });
    const { isDarkTheme, isLoading } = useSelector(
        (state: any) => state.sharedReducer
    );

    const onSubmit = (body: any) => {
        const { cnic, otp, password } = body;
        if (portion === 1) {
            // Mock function to simulate getting OTP
            console.log("Getting OTP for:", cnic);
            setPortion(2);
        } else if (portion === 2) {
            // Mock function to simulate verifying OTP
            console.log("Verifying OTP:", otp);
            setPortion(3);
        } else if (portion === 3) {
            // Mock function to simulate resetting password
            console.log("Resetting password for:", cnic, "with new password:", password);
            // Optionally navigate to another page or show a success message
            navigate(siteRoutes.adminLogin);
        }
    };

    const password = watch("password");
    const password_confirmation = watch("password_confirmation");

    useEffect(() => {
        trigger(["password"]);
        trigger(["password_confirmation"]);
    }, [password]);

    const gotoLogin = () => {
        navigate(siteRoutes.adminLogin)
    }

    return (
        <ResetMain>
            <ResetForm
                className="content-radius-shadow p-custom-scrollbar-8"
                onSubmit={handleSubmit(onSubmit)}
            >
                {portion === 1 && (
                    <>
                        <SiteLogo>
                            {isDarkTheme ? (
                                <CyfyLogoDark className="icon" />
                            ) : (
                                <CyfyLogoSvg className="icon" />
                            )}
                        </SiteLogo>
                        <div className="form-header reset-password">
                            <span className="heading">Reset Password</span>
                            <span className="sub-heading">
                                Enter your username and we'll send you an email with instructions to reset your Password
                            </span>
                        </div>
                        <div className="fields">
                            <div className="input-field">
                                <label>Username</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <input
                                            type="text"
                                            placeholder="Enter Username"
                                            {...register("cnic", { required: true })}
                                        />
                                    </div>
                                    <FormErrorMessage error={errors.cnic} />
                                </div>
                            </div>

                            <div className="submit-button">
                                <button type="submit">
                                    <span>Reset Password</span>
                                </button>
                            </div>
                            <div className="bottom-text">
                                <span
                                    className="link-text"
                                >
                                    Back to <span className="sign" onClick={gotoLogin}>Sign In</span>
                                </span>
                            </div>
                        </div>
                    </>
                )}
                {portion === 2 && (
                    <>
                        <SiteLogo>
                            {isDarkTheme ? (
                                <CyfyLogoDark className="icon" />
                            ) : (
                                <CyfyLogoSvg className="icon" />
                            )}
                        </SiteLogo>
                        <div className="form-header">
                            <span className="heading">Enter Verification Code</span>
                            <span className="sub-heading">
                                Verification Code sent to email
                            </span>
                        </div>
                        <div className="fields">
                            <div className="input-field">
                                <label>Verification Code</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <input
                                            type="text"
                                            placeholder="Enter Verification code"
                                            {...register("otp", { required: true })}
                                        />
                                    </div>
                                    <FormErrorMessage error={errors.otp} />
                                </div>
                            </div>

                            <div className="submit-button">
                                <button type="submit">
                                    <span>Verify</span>
                                </button>
                            </div>
                            <div className="bottom-text">
                                <span
                                    className="link-text"
                                >
                                    Back to <span className="sign" onClick={gotoLogin}>Sign In</span>
                                </span>
                            </div>
                        </div>
                    </>
                )}
                {portion === 3 && (
                    <>
                        <SiteLogo>
                            {isDarkTheme ? (
                                <CyfyLogoDark className="icon" />
                            ) : (
                                <CyfyLogoSvg className="icon" />
                            )}
                        </SiteLogo>
                        <div className="form-header">
                            <span className="heading">Enter New Password</span>
                            <span className="sub-heading">
                                Enter New Password with the given instructions to set password
                            </span>
                        </div>
                        <div className="fields">
                            <div className="input-field">
                                <label htmlFor="">New Password</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <input
                                            type="password"
                                            {...register("password", {
                                                required: true,
                                                validate: {
                                                    hasUpperCase: (value) =>
                                                        /[A-Z]/.test(value) || "x One Upper Case",
                                                    hasLowerCase: (value) =>
                                                        /[a-z]/.test(value) || "x One lower Case",
                                                    hasNumber: (value) =>
                                                        /[0-9]/.test(value) || "x One Number",
                                                    eightCharsLong: (value) =>
                                                        /^.{8,}/.test(value) || "x 8 Characters Long",
                                                },
                                            })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="input-field">
                                <label htmlFor="">Confirm Password</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <input
                                            type="password"
                                            {...register("password_confirmation", {
                                                required: true,
                                            })}
                                        />
                                    </div>
                                </div>
                            </div>
                            {!password?.length ||
                                password !== password_confirmation ||
                                errors?.password?.types ? (
                                <div className="error-box">
                                    <span className="error-text">
                                        {Object.values((errors?.password?.types as any) ?? {}).map(
                                            (item: any, index: number) => {
                                                return <p key={index}>{item}</p>;
                                            }
                                        )}
                                        {!password?.length || password !== password_confirmation ? (
                                            <p>x Password Match</p>
                                        ) : (
                                            ""
                                        )}
                                    </span>
                                </div>
                            ) : (
                                ""
                            )}

                            <div className="submit-button">
                                <button type="submit">
                                    {isLoading ? (
                                        <div className="loader">
                                            <div className="sm-w-rounded-loader"></div>
                                        </div>
                                    ) : (
                                        <span>Change Password</span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </ResetForm>
        </ResetMain>
    );
};

export default EportalResetPassword;
