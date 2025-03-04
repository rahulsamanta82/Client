import { FC, Fragment } from "react";
import { ErrorMessage } from "./style";
interface FormErrorMessageProps {
    error: any;
    touched?: boolean | undefined;
}
const FormErrorMessage: FC<FormErrorMessageProps> = ({ error, touched }) => {
    return (
        <Fragment>
            {error?.type === "required" && (
                <ErrorMessage>This field is required</ErrorMessage>
            )}
            {error?.type === "minLength" && (
                <ErrorMessage>{error.message}</ErrorMessage>
            )}
            {(error?.type === "pattern" ||
                error?.type === "validate" ||
                error?.type === "hasSpecialChar" ||
                error?.type === "hasNumber" ||
                error?.type === "hasLowerCase" ||
                error?.type === "hasUpperCase") && (
                    <ErrorMessage>{error.message}</ErrorMessage>
                )}
        </Fragment>
    );
};
export default FormErrorMessage;
