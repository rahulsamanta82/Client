import { ChangeEvent, FC, useState } from "react";
import { SessionManagementCreateSection, SessionManagementCreateMain, SessionManagementCreateTop } from "./style";
import { CloseMediumSvg, SmallUploadSvg } from "assets/images/common/svgs";
import squareAvatar from "assets/images/common/others/avatar-square-image.png";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { AddEntryTestDTO } from "utils/helpers/models/e-portal/add-entry-test.dto";
import Breadcrumb from "components/particles/breadcrumb";

// interface AddHostelProps {
//     setOpen: Function;
// }

const CreateSession: FC = () => {
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

        <SessionManagementCreateMain>


            <SessionManagementCreateTop>
                <div className="left">
                    <span className="page-heading">Add New Session</span>
                    <Breadcrumb />
                </div>
                <div className="right">
                </div>
            </SessionManagementCreateTop>



            <SessionManagementCreateSection className="p-custom-scrollbar-8">

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="common-fields">
                        <div className="input-field">
                            <label>Title</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input type="text"
                                        placeholder="Merit List Title" />
                                </div>
                                <FormErrorMessage error={errors.test} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Start Date</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input type="Date"
                                        placeholder="Merit List No" />
                                </div>
                                <FormErrorMessage error={errors.roll_no} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>End Date</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input type="date" />
                                </div>
                                <FormErrorMessage error={errors.test_date} />
                            </div>
                        </div>
                    </div>
                    <div className="common-fields">
                        <div className="input-field">
                            <label>Due Date(Old)</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input type="date" />
                                </div>
                                <FormErrorMessage error={errors.test} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Due Date(New)</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input type="date" />
                                </div>
                                <FormErrorMessage error={errors.roll_no} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Expiry Date(Old)</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input type="date" />
                                </div>
                                <FormErrorMessage error={errors.test_date} />
                            </div>
                        </div>
                    </div>
                    <div className="common-fields">
                        <div className="input-field">
                            <label>Expiry Date(New)</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input type="date" />
                                </div>
                                <FormErrorMessage error={errors.test} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Year</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input type="number"
                                        placeholder="Year" />
                                </div>
                                <FormErrorMessage error={errors.roll_no} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Semester</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select name="" id="">
                                        <option value="">Semester</option>
                                    </select>
                                </div>
                                <FormErrorMessage error={errors.test_date} />
                            </div>
                        </div>
                    </div>
                    <div className="common-fields">
                        <div className="input-field">
                            <label>Is Active</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select name="" id="">
                                        <option value="">Yes</option>
                                        <option value="">No</option>
                                    </select>
                                </div>
                                <FormErrorMessage error={errors.test} />
                            </div>
                        </div>

                    </div>



                    <div className="action-buttons">
                        <div className="buttons">
                            <button className="lg-rounded-btn gray" type="reset">
                                Reset
                            </button>

                            <button className="lg-rounded-btn" type="submit">
                                Add Record
                            </button>
                        </div>
                    </div>
                </form>
            </SessionManagementCreateSection>

        </SessionManagementCreateMain>
    );
};

export default CreateSession;

