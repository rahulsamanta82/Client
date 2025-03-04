import { ChangeEvent, FC, useState } from "react";
import { ContentWrapper, ApplicantManagementCreateMain, ApplicantManagementCreateTop } from "./style";
import { CloseMediumSvg, SmallUploadSvg } from "assets/images/common/svgs";
import squareAvatar from "assets/images/common/others/avatar-square-image.png";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { AddEntryTestDTO } from "utils/helpers/models/e-portal/add-entry-test.dto";
import Breadcrumb from "components/particles/breadcrumb";

// interface AddHostelProps {
//     setOpen: Function;
// }

const CreateApplicant: FC = () => {
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

        <ApplicantManagementCreateMain>


            <ApplicantManagementCreateTop>
                <div className="left">
                    <span className="page-heading">Add User</span>
                    <Breadcrumb />
                </div>
                <div className="right">


                </div>
            </ApplicantManagementCreateTop>



            <ContentWrapper className="p-custom-scrollbar-8">

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="common-fields">
                        <div className="input-field">
                            <label>Select User</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select
                                    // {...register("test", { required: true })}
                                    >
                                        <option>User</option>
                                    </select>
                                </div>
                                {/* <FormErrorMessage error={errors.test} /> */}
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Selact Campus</label>
                            <div className="field-wrap">
                                <div className="field">

                                    <select
                                    //   {...register("test", { required: true })}
                                    >
                                        <option>something</option>
                                    </select>
                                </div>
                                {/* <FormErrorMessage error={errors.roll_no} /> */}
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Select Hostel</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select {...register("test", { required: true })}>
                                        <option>something</option>
                                    </select>
                                </div>
                                <FormErrorMessage error={errors.test_date} />
                            </div>
                        </div>
                    </div>



                    <div className="action-buttons">
                        <div className="buttons">
                            <button className="lg-rounded-btn gray" type="reset">
                                Reset
                            </button>

                            <button className="lg-rounded-btn" type="submit">
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </ContentWrapper>

        </ApplicantManagementCreateMain>
    );
};

export default CreateApplicant;

