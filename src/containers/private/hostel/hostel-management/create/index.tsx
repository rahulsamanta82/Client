import { ChangeEvent, FC, useState } from "react";
import { HostelManagementCreateSection, HostelManagementCreateMain, HostelManagementCreateTop } from "./style";
import { CloseMediumSvg, SmallUploadSvg } from "assets/images/common/svgs";
import squareAvatar from "assets/images/common/others/avatar-square-image.png";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { AddEntryTestDTO } from "utils/helpers/models/e-portal/add-entry-test.dto";
import Breadcrumb from "components/particles/breadcrumb";

// interface AddHostelProps {
//     setOpen: Function;
// }

const HostelCreate: FC = () => {
    const [formData, setFormData] = useState<AddEntryTestDTO>(
        new AddEntryTestDTO()
    );
    const [filePath, setFilePath] = useState<string | null>(null);
    const {
        handleSubmit,
        register,
        trigger,
        formState: { errors },
        setValue,
        getValues,
    } = useForm<any>({ defaultValues: formData });

    const onSubmit = (formData: AddEntryTestDTO) => {
        console.log(formData, "formdata");
    };

    const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0];
        setValue("certificate", file);
        setFilePath(URL.createObjectURL(file));
    };
    return (

        <HostelManagementCreateMain>


            <HostelManagementCreateTop>
                <div className="left">
                    <span className="page-heading">Add Hostel</span>
                    <Breadcrumb />
                </div>
                <div className="right">


                </div>
            </HostelManagementCreateTop>



            <HostelManagementCreateSection className="p-custom-scrollbar-8">

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="common-fields">
                        <div className="input-field">
                            <label>Hostel Name</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input
                                        type="text"
                                        {...register("roll_no", { required: true })}
                                        placeholder="Title"
                                    />
                                </div>
                                <FormErrorMessage error={errors.test} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Type</label>
                            <div className="field-wrap">
                                <div className="field">

                                    <select {...register("test", { required: true })}>
                                        <option>Boys</option>
                                    </select>
                                </div>
                                <FormErrorMessage error={errors.roll_no} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Hostel Address</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input
                                        type="text"
                                        {...register("roll_no", { required: true })}
                                        placeholder="Address"
                                    />
                                </div>
                                <FormErrorMessage error={errors.test_date} />
                            </div>
                        </div>
                    </div>

                    <div className="common-fields">
                        <div className="upload-field">
                            <label>Add Picture</label>
                            <div className="field-wrapper">
                                <label className="file-name-section" htmlFor="certificate">
                                    <div className="inner-content">
                                        <div className="upload-text">
                                            <div className="upload-icon">
                                                <SmallUploadSvg className="icon" />
                                            </div>
                                            <span className="text">
                                                Hostel Picture
                                            </span>
                                        </div>
                                        <div className="upload-restrictions">
                                            maximum size of 400 KB
                                        </div>
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    className="d-none"
                                    {...register("certificate", { required: true })}
                                    id="certificate"
                                // onChange={handleUpload}
                                />
                                <div className="uploaded-image cnic">
                                    <img src={filePath ?? squareAvatar} alt="" />
                                </div>
                            </div>
                            <FormErrorMessage error={errors.certificate} />
                        </div>
                        <div className="input-field">
                            <label>Any Note</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input
                                        type="text"
                                        placeholder="Note"
                                        {...register("obtained_marks", { required: true })}
                                    />
                                </div>
                                <FormErrorMessage error={errors.obtained_marks} />
                            </div>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <div className="buttons">
                            <button className="lg-rounded-btn gray" type="reset">
                                Reset
                            </button>

                            <button className="lg-rounded-btn" type="submit">
                                Add Hostel
                            </button>
                        </div>
                    </div>
                </form>
            </HostelManagementCreateSection>

        </HostelManagementCreateMain>
    );
};

export default HostelCreate;

