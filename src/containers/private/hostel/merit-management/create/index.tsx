import { ChangeEvent, FC, useState } from "react";
import { MeritListCreateSection, MeritListCreateMain, MeritListCreateTop } from "./style";
import { CloseMediumSvg, SmallUploadSvg } from "assets/images/common/svgs";
import squareAvatar from "assets/images/common/others/avatar-square-image.png";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { AddEntryTestDTO } from "utils/helpers/models/e-portal/add-entry-test.dto";
import Breadcrumb from "components/particles/breadcrumb";

// interface AddHostelProps {
//     setOpen: Function;
// }

const CreateMerit: FC = () => {
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

        <MeritListCreateMain>


            <MeritListCreateTop>
                <div className="left">
                    <span className="page-heading">Add New Merit List</span>
                    <Breadcrumb />
                </div>
                <div className="right">
                </div>
            </MeritListCreateTop>



            <MeritListCreateSection className="p-custom-scrollbar-8">

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
                            <label>Merit List No</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input type="number"
                                        placeholder="Merit List No" />
                                </div>
                                <FormErrorMessage error={errors.roll_no} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Session</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select {...register("test", { required: true })}>
                                        <option>Select Session</option>
                                    </select>
                                </div>
                                <FormErrorMessage error={errors.test_date} />
                            </div>
                        </div>
                    </div>
                    <div className="common-fields">
                        <div className="input-field">
                            <label>Due Date</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input type="date" />
                                </div>
                                <FormErrorMessage error={errors.test} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Expiry Date</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input type="date" />
                                </div>
                                <FormErrorMessage error={errors.roll_no} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Is Active</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select {...register("test", { required: true })}>
                                        <option>Yes</option>
                                        <option>No</option>
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
                                Add Record
                            </button>
                        </div>
                    </div>
                </form>
            </MeritListCreateSection>

        </MeritListCreateMain>
    );
};

export default CreateMerit;

