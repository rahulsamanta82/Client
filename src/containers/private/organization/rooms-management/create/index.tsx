import { ChangeEvent, FC, useState } from "react";
import { CreateRoomSection, CreateRoomMain, CreateRoomTop } from "./style";
import { CloseMediumSvg, SmallUploadSvg } from "assets/images/common/svgs";
import squareAvatar from "assets/images/common/others/avatar-square-image.png";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { AddEntryTestDTO } from "utils/helpers/models/e-portal/add-entry-test.dto";
import Breadcrumb from "components/particles/breadcrumb";


const CreateRooms: FC = () => {
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

        <CreateRoomMain>


            <CreateRoomTop>
                <div className="left">
                    <span className="page-heading">Add Rooms</span>
                    <Breadcrumb />
                </div>
                <div className="right">


                </div>
            </CreateRoomTop>



            <CreateRoomSection className="p-custom-scrollbar-8">

                <form onSubmit={handleSubmit(onSubmit)}>

                <div className="common-fields">
                        <div className="upload-field">
                            <label>Room Image</label>
                            <div className="field-wrapper">
                                <label className="file-name-section" htmlFor="certificate">
                                    <div className="inner-content">
                                        <div className="upload-text">
                                            <div className="upload-icon">
                                                <SmallUploadSvg className="icon" />
                                            </div>
                                            <span className="text">
                                                Upload Room Image
                                            </span>
                                        </div>
                                        <div className="upload-restrictions">
                                            select jpg/png image with maximum size of 900 KB
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
                    </div>
                    <div className="common-fields">
                        <div className="input-field">
                            <label>Building</label>
                            <div className="field-wrap">
                                <div className="field">
                                <select {...register("test", { required: true })}>
                                        <option>Select Building</option>
                                    </select>
                                </div>
                                <FormErrorMessage error={errors.test} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Room Title</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input
                                        type="text"
                                        {...register("roll_no", { required: true })}
                                        placeholder="Add Room Title"
                                    />
                                </div>
                                <FormErrorMessage error={errors.test_date} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Room No.</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input
                                        type="number"
                                        {...register("roll_no", { required: true })}
                                        placeholder="Add Room No."
                                    />
                                </div>
                                <FormErrorMessage error={errors.test_date} />
                            </div>
                        </div>
                    </div>
                    <div className="common-fields">
                    <div className="input-field">
                            <label>Room Type</label>
                            <div className="field-wrap">
                                <div className="field">

                                    <select {...register("test", { required: true })}>
                                        <option>Select Room Type</option>
                                    </select>
                                </div>
                                <FormErrorMessage error={errors.roll_no} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Room Length</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input
                                        type="number"
                                        {...register("roll_no", { required: true })}
                                        placeholder="Room Length"
                                    />
                                </div>
                                <FormErrorMessage error={errors.test_date} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Room Width</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input
                                        type="number"
                                        {...register("roll_no", { required: true })}
                                        placeholder="Room Width"
                                    />
                                </div>
                                <FormErrorMessage error={errors.test_date} />
                            </div>
                        </div>
                    </div>
                    <div className="common-fields">
                    <div className="input-field">
                            <label>Select Floor</label>
                            <div className="field-wrap">
                                <div className="field">

                                    <select {...register("test", { required: true })}>
                                        <option>Select Floor</option>
                                    </select>
                                </div>
                                <FormErrorMessage error={errors.roll_no} />
                            </div>
                        </div>
                    </div>

                    

                    <div className="action-buttons">
                        <div className="buttons">
                            <button className="lg-rounded-btn gray" type="reset">
                                Reset
                            </button>

                            <button className="lg-rounded-btn black" type="reset">
                                Save & Add More
                            </button>

                            <button className="lg-rounded-btn" type="submit">
                                Save & Exit
                            </button>
                        </div>
                    </div>
                </form>
            </CreateRoomSection>

        </CreateRoomMain>
    );
};

export default CreateRooms;

