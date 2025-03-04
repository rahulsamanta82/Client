import { FC, useEffect, useState } from "react";
import { ResetForm, SiteLogo, ResetMain } from "./style";
import {
    CyfyLogoDark,
    CyfyLogoSvg,
    EyeHidingSvg,
    EyeSvg,
} from "assets/images/common/svgs";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useEportalAuth from "../useHooks";
import FormErrorMessage from "components/particles/forms/form-error-message";

const EportalResetPassword: FC = () => {
    const [portion, setPortion] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        trigger,
        formState: { errors },
    } = useForm<any>({ criteriaMode: "all" });
    const { isDarkTheme, isLoading, organization } = useSelector(
        (state: any) => state.sharedReducer
    );

    const { userGetOtp, userResetPassword, userVerifyOtp } = useEportalAuth();
    const onSubmit = (body: any) => {
        const { cnic, otp, password } = body;
        if (portion === 1) {
            userGetOtp({ cnic }, setPortion);
        } else if (portion === 2) {
            userVerifyOtp({ otp, cnic }, setPortion);
        } else if (portion === 3) {
            userResetPassword({ cnic, password });
        }
    };

    const password = watch("password");
    const password_confirmation = watch("password_confirmation");

    useEffect(() => {
        trigger(["password"]);
        trigger(["password_confirmation"]);
    }, [password]);

    return (
        <ResetMain>
            <ResetForm
                className="content-radius-shadow p-custom-scrollbar-8"
                onSubmit={handleSubmit(onSubmit)}
            >
                {portion === 1 && (
                    <>
                        {!organization?.logo ? <SiteLogo>
                            {isDarkTheme ? (
                                <CyfyLogoDark className="icon" />
                            ) : (
                                <CyfyLogoSvg className="icon" />
                            )}
                        </SiteLogo> : <SiteLogo>
                            <img src={organization?.logo} /></SiteLogo>}
                        <div className="form-header reset-password">
                            <span className="heading">Reset Password</span>
                            <span className="sub-heading">
                                Enter your CNIC to reset Password
                            </span>
                        </div>
                        <div className="fields">
                            <div className="input-field">
                                <label>CNIC/B.Form</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <input
                                            type="text"
                                            placeholder="Enter your CNIC and "
                                            {...register("cnic", { required: true })}
                                        />
                                    </div>
                                    <FormErrorMessage error={errors.cnic} />
                                </div>
                            </div>
                            <div className="input-field">
                                <label>Choose Recovery Method</label>
                                <div className="field-wrap">
                                    <div>
                                        <input type="radio" name="option" className="radio" />
                                        <label htmlFor="" className="radio-input">
                                            Email(osama@gmail*******)
                                        </label>
                                    </div>
                                    <div>
                                        <input type="radio" name="option" className="radio" />
                                        <label htmlFor="" className="radio-input">
                                            SMS(1234566**********)
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="submit-button">
                                <button type="submit">
                                    {isLoading ? (
                                        <div className="loader">
                                            <div className="sm-w-rounded-loader"></div>
                                        </div>
                                    ) : (
                                        <span>Next</span>
                                    )}{" "}
                                </button>
                            </div>
                            <div className="bottom-text">
                                <span
                                    className="link-text"
                                    onClick={() => navigate("/student/student-login")}
                                >
                                    Back to login
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
                            <span className="heading">Reset Password</span>
                            <span className="sub-heading">
                                Enter Code which you received on your mobile number or Email
                            </span>
                        </div>
                        <div className="fields">
                            <div className="input-field">
                                <label>Enter Security Code</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <input
                                            type="text"
                                            placeholder="Enter Security code"
                                            {...register("otp", { required: true })}
                                        />
                                    </div>
                                    <FormErrorMessage error={errors.otp} />
                                </div>
                            </div>

                            <div className="submit-button">
                                <button type="submit">
                                    {isLoading ? (
                                        <div className="loader">
                                            <div className="sm-w-rounded-loader"></div>
                                        </div>
                                    ) : (
                                        <span>Next</span>
                                    )}{" "}
                                </button>
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
                            <span className="heading">Reset Password</span>
                            <span className="sub-heading">
                                Enter New Password according to the instructions
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
                                        <span>Update Password</span>
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
