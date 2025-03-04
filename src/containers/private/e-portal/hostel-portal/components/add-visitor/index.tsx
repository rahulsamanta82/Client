import { FC, useState } from "react";
import { AddVisitorMain, Container, ContentWrapper } from "./style";
import { CloseMediumSvg, SmallUploadSvg } from "assets/images/common/svgs";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { AddEntryTestDTO } from "utils/helpers/models/e-portal/add-entry-test.dto";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import squareAvatar from "assets/images/common/others/avatar-square-image.png";

interface AddVisitorProps {
    setOpen: Function;
}

const AddVisitor: FC<AddVisitorProps> = ({ setOpen }) => {
    const [formData, setFormData] = useState<any>();
    const {
        handleSubmit,
        register,
        trigger,
        formState: { errors },
        setValue,
    } = useForm<any>({ defaultValues: formData });
    const navigate = useNavigate();

    const onSubmit = (data: AddEntryTestDTO, addMore?: boolean) => {
    };

    const handleChange = (event: any) => {
        const { value, name } = event.target;
        setValue(name, value);
        setFormData({ ...formData, [name]: value });
        trigger(name);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    const { isLoading } = useSelector((state: any) => state.sharedReducer);
    return (
        <AddVisitorMain>
            <Container>
                <ContentWrapper className="p-custom-scrollbar-8">
                    <div className="header">
                        <div className="empty"></div>
                        <div className="heading">
                            <span>Add  Visitor</span>
                        </div>
                        <div className="close-icon cp" onClick={handleCloseModal}>
                            <CloseMediumSvg className="icon" />
                        </div>
                    </div>
                    <form>
                        <div className="common-fields">
                            <div className="input-field">
                                <label>Name</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <FormErrorMessage error={errors.obtained_marks} />
                                </div>
                            </div>
                            <div className="input-field">
                                <label>Relation with Student</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            placeholder="Relation"
                                        />
                                    </div>
                                    <FormErrorMessage error={errors.obtained_marks} />
                                </div>
                            </div>
                            <div className="input-field">
                                <label>CNIC</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            placeholder="CNIC"
                                        />
                                    </div>
                                    <FormErrorMessage error={errors.obtained_marks} />
                                </div>
                            </div>
                            <div className="input-field">
                                <label>Phone No</label>
                                <div className="field-wrap">
                                    <div className="field">
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            placeholder="Phone No"
                                        />
                                    </div>
                                    <FormErrorMessage error={errors.obtained_marks} />
                                </div>
                            </div>
                        </div>

                        <div className="upload-field">
                            <label>Profile Picture</label>
                            <label className="field-wrapper">
                                <div className="file-name-section">
                                    <div className="inner-content">
                                        <div className="upload-text">
                                            <div className="upload-icon">
                                                <SmallUploadSvg className="icon" />
                                            </div>
                                            <span className="text">Upload Profile Picture</span>
                                        </div>
                                        <div className="upload-restrictions">
                                            Select a 300x300 jpg image with maximum size of 400 KB
                                        </div>
                                    </div>
                                </div>
                                <div className="uploaded-image">
                                    <img
                                        src={formData?.profile_image ?? squareAvatar}
                                        alt=""
                                    />
                                </div>
                                <input
                                    type="file"
                                    {...register("profile_image", { required: false })}
                                    className="d-none"
                                // onChange={handleFileUpload}
                                />
                            </label>
                            <FormErrorMessage error={errors.profile_image} />
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
        </AddVisitorMain>
    );
};

export default AddVisitor;
