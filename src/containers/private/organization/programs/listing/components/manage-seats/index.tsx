import { FC, useState } from "react";
import { ManageSeatsMain, Container, ContentWrapper } from "./style";
import { CloseMediumSvg } from "assets/images/common/svgs";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { AddEntryTestDTO } from "utils/helpers/models/e-portal/add-entry-test.dto";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import useUtils from "hooks/useUtils";

interface ManageCriteriaProps {
    setOpen: Function;
}

const ManageSeats: FC<ManageCriteriaProps> = ({ setOpen }) => {
    const [formData, setFormData] = useState<any>();
    const {
        handleSubmit,
        register,
        trigger,
        formState: { errors },
        setValue,
    } = useForm<any>({ defaultValues: formData });
    const navigate = useNavigate();

    const { getQueryParams } = useUtils();
    const params = getQueryParams();

    const onSubmit = (data: AddEntryTestDTO, addMore?: boolean) => {
    };

    const handleChange = (event: any) => {
        const { value, name } = event.target;
        setValue(name, value);
        setFormData({ ...formData, [name]: value });
        trigger(name);
    };

    const resetForm = () => {
    };

    const handleCloseModal = () => {
        navigate(`${siteRoutes.programListing}?sessionId=${params?.sessionId}`);
        setOpen(false);
    };

    const { isLoading } = useSelector((state: any) => state.sharedReducer);
    return (
        <ManageSeatsMain>
            <Container>
                <ContentWrapper className="p-custom-scrollbar-8">
                    <div className="header">
                        <div className="empty"></div>
                        <div className="heading">
                            <span>Manage Seats</span>
                        </div>
                        <div className="close-icon cp" onClick={handleCloseModal}>
                            <CloseMediumSvg className="icon" />
                        </div>
                    </div>
                    <form>
                        <div className="common-fields">
                            <div className="input-field">
                                <label>Add Total Seats</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <input
                                            type="number"
                                            {...register("obtained_marks", { required: true })}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <FormErrorMessage error={errors.obtained_marks} />
                                </div>
                            </div>
                        </div>
                        <div className="action-buttons">
                            {isLoading ? (
                                <div className="sm-primary-loader"></div>
                            ) : (
                                <div className="buttons">
                                    <button
                                        className="lg-rounded-btn gray"
                                        type="button"
                                        onClick={handleCloseModal}
                                    >
                                        Close
                                    </button>

                                    <button
                                        className="lg-rounded-btn"
                                        type="submit"
                                        onClick={handleSubmit((data: any) => onSubmit(data))}
                                    >
                                        Save
                                    </button>
                                </div>
                            )}
                        </div>
                    </form>
                </ContentWrapper>
            </Container>
        </ManageSeatsMain>
    );
};

export default ManageSeats;
