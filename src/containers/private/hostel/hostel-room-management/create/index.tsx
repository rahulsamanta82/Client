import { ChangeEvent, FC, useState } from "react";
import { HostelRoomManagementCreateSection, HostelRoomManagementCreateMain, HostelRoomManagementCreateTop } from "./style";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { AddEntryTestDTO } from "utils/helpers/models/e-portal/add-entry-test.dto";
import Breadcrumb from "components/particles/breadcrumb";

// interface AddHostelProps {
//     setOpen: Function;
// }

const HostelRoomCreate: FC = () => {
    const [formData, setFormData] = useState<AddEntryTestDTO>(
        new AddEntryTestDTO()
    );
    const [filePath, setFilePath] = useState<string | null>(null);
    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
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
        <HostelRoomManagementCreateMain>
            <HostelRoomManagementCreateTop>
                <div className="left">
                    <span className="page-heading">Add Hostel Room</span>
                    <Breadcrumb />
                </div>
                <div className="right"></div>
            </HostelRoomManagementCreateTop>

            <HostelRoomManagementCreateSection>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="common-fields">
                        <div className="input-field">
                            <label>Room Number</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input
                                        type="number"
                                        {...register("roll_no", { required: true })}
                                        placeholder="Title"
                                    />
                                </div>
                                <FormErrorMessage error={errors.test} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Select Hostel</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select {...register("test", { required: true })}>
                                        <option>Select Hostel</option>
                                    </select>
                                </div>
                                <FormErrorMessage error={errors.roll_no} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Room Type</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select {...register("test", { required: true })}>
                                        <option>Select Room Type</option>
                                    </select>
                                </div>
                                <FormErrorMessage error={errors.test_date} />
                            </div>
                        </div>
                    </div>

                    <div className="common-fields">
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

                        <div className="input-field" >
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
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </HostelRoomManagementCreateSection>
        </HostelRoomManagementCreateMain>
    );
};

export default HostelRoomCreate;
