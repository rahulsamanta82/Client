import { FC, useEffect, useState } from "react";
import { RegisterForm, SiteLogo, StudentRegisterMain } from "./style";
import {
    CyfyLogoDark,
    CyfyLogoSvg,
    EyeHidingSvg,
    EyeSvg,
} from "assets/images/common/svgs";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { UserRegisterDTO } from "utils/helpers/models/auth/user-register.dto";
import FormErrorMessage from "components/particles/forms/form-error-message";
import useEportalAuth from "../useHooks";
import { useSelector } from "react-redux";

interface StudentRegisterProps { }
const EportalRegister: FC<StudentRegisterProps> = ({ }) => {
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false,
    });
    const navigate = useNavigate();
    const { userRegister } = useEportalAuth();
    const {
        register,
        handleSubmit,
        trigger,
        setValue,
        formState: { errors, touchedFields },
        watch,
    } = useForm<UserRegisterDTO>({
        defaultValues: new UserRegisterDTO(),
        criteriaMode: 'all'
    });
    const { isDarkTheme, isLoading, organization } = useSelector((state: any) => state.sharedReducer);

    const onSubmit = (data: any) => {
        userRegister({ ...data, city: '3' });
    };

    const password = watch("password");
    const password_confirmation = watch("password_confirmation");

    useEffect(() => {
        trigger(['password', 'password_confirmation']);
    }, []);

    const handleChange = (event: any) => {
        const { value, name } = event.target;
        setValue(name, value);
        trigger([name]);
    }
    return (
        <StudentRegisterMain>
            <RegisterForm
                className="content-radius-shadow p-custom-scrollbar-8"
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
                        <label>First Name</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input
                                    type="text"
                                    {...register("first_name", { required: true })}
                                    onChange={handleChange}
                                />
                            </div>
                            <FormErrorMessage
                                error={errors.first_name}
                                touched={touchedFields.first_name}
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Last Name</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input
                                    type="text"
                                    {...register("last_name", { required: true })}
                                    onChange={handleChange}
                                />
                            </div>
                            <FormErrorMessage
                                error={errors.last_name}
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Father Name</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input
                                    type="text"
                                    {...register("father_name", { required: true })}
                                    onChange={handleChange}
                                />
                            </div>
                            <FormErrorMessage
                                error={errors.father_name}
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Gender</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select
                                    {...register("gender", { required: true })}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                            <FormErrorMessage
                                error={errors.gender}
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Email</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input
                                    type="email"
                                    {...register("email", { required: true })}
                                    onChange={handleChange}
                                />
                            </div>
                            <FormErrorMessage
                                error={errors.email}
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Phone</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input
                                    type="tel"
                                    {...register("phone_no", { required: true })}
                                    onChange={handleChange}
                                />
                            </div>
                            <FormErrorMessage
                                error={errors.phone_no}
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>CNIC / B.Form</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" {...register("cnic", { required: true })}
                                    onChange={handleChange}
                                />
                            </div>
                            <FormErrorMessage
                                error={errors.cnic}
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Address</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input
                                    type="text"
                                    {...register("address", { required: true })}
                                    onChange={handleChange}
                                />
                            </div>
                            <FormErrorMessage
                                error={errors.address}
                                touched={touchedFields.address}
                            />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Password</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input
                                    type={showPassword?.password ? "text" : "password"}
                                    autoComplete="new-password"
                                    {...register("password", {
                                        required: true,
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters",
                                        },
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
                                    onChange={handleChange}
                                />
                                <span
                                    className="field-icon"
                                    onClick={() =>
                                        setShowPassword({
                                            ...showPassword,
                                            password: !showPassword.password,
                                        })
                                    }
                                >
                                    {showPassword?.password ? (
                                        <EyeSvg className="password-icon" />
                                    ) : (
                                        <EyeHidingSvg className="password-icon" />
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Confirm Password</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input
                                    type={showPassword?.confirmPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    {...register("password_confirmation", {
                                        required: true,
                                    })}
                                    onChange={handleChange}
                                />
                                <span
                                    className="field-icon"
                                    onClick={() =>
                                        setShowPassword({
                                            ...showPassword,
                                            confirmPassword: !showPassword.confirmPassword,
                                        })
                                    }
                                >
                                    {showPassword?.confirmPassword ? (
                                        <EyeSvg className="password-icon" />
                                    ) : (
                                        <EyeHidingSvg className="password-icon" />
                                    )}
                                </span>
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
                                <span>Register Now</span>
                            )}
                        </button>
                    </div>
                </div>
                <div className="bottom-text">
                    <span>
                        Already have an account ?{" "}
                        <span
                            className="link-text"
                            onClick={() => navigate(siteRoutes.ePortalLogin)}
                        >
                            Sign In
                        </span>
                    </span>
                </div>
            </RegisterForm>
        </StudentRegisterMain>
    );
};

export default EportalRegister;
