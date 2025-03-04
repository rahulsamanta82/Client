import { FC, useState } from "react";
import Breadcrumb from "components/particles/breadcrumb";
import { CreateBuildingMain, CreateBuildingTopSection, Form } from "./style";
import { useForm } from "react-hook-form";
import { AddBuildingDTO } from "utils/helpers/models/organization/add-building.dto";
import FormErrorMessage from "components/particles/forms/form-error-message";
import useUtils from "hooks/useUtils";
import { SmallUploadSvg } from "assets/images/common/svgs";
import squareAvatar from "assets/images/common/others/avatar-square-image.png";



const CreateBuilding: FC = () => {
    const { getQueryParams } = useUtils();
    const params = getQueryParams();
    const [formData, setFormData] = useState<AddBuildingDTO>(new AddBuildingDTO());
    const { handleSubmit, register, formState: { errors } } = useForm<any>({ defaultValues: formData });

    const onSubmit = (formData: AddBuildingDTO) => {
        console.log(formData, 'formdata');
    }

    return (
        <CreateBuildingMain>
            <CreateBuildingTopSection>
                <span className="page-heading">{params?.id ? 'Update' : 'Add'} Building</span>
                {!params?.id && <Breadcrumb />}
            </CreateBuildingTopSection>
            <Form className="content-radius-shadow" onSubmit={handleSubmit(onSubmit)}>
                <div className="common-fields">
                <div className="upload-field">
                            <label>Building Image</label>
                            <div className="field-wrapper">
                                <label className="file-name-section" htmlFor="certificate">
                                    <div className="inner-content">
                                        <div className="upload-text">
                                            <div className="upload-icon">
                                                <SmallUploadSvg className="icon" />
                                            </div>
                                            <span className="text">
                                                Upload Building Image
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
                                    id="certificate"
                                />
                                <div className="uploaded-image cnic">
                                <img src={squareAvatar} alt="" />
                                </div>
                            </div>
                </div>
                <div className="upload-field">
                            <label>Building Map</label>
                            <div className="field-wrapper">
                                <label className="file-name-section" htmlFor="certificate">
                                    <div className="inner-content">
                                        <div className="upload-text">
                                            <div className="upload-icon">
                                                <SmallUploadSvg className="icon" />
                                            </div>
                                            <span className="text">
                                                Upload Building Map
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
                                    id="certificate"
                                />
                                <div className="uploaded-image cnic">
                                <img src={squareAvatar} alt="" />
                                </div>
                            </div>
                </div>

                </div>
                        
                
                <div className="common-fields">
                    <div className="input-field">
                        <label>Campus</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select {...register('campus', { required: true })}>
                                    <option>Select Campus</option>
                                </select>
                            </div>
                            <FormErrorMessage error={errors.campus} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Building title</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="Building title" {...register('building_title', { required: true })} />
                            </div>
                            <FormErrorMessage error={errors.building_title} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Building Length</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="number" placeholder="Building Length" {...register('building_length', { required: true })} />
                            </div>
                            <FormErrorMessage error={errors.building_length} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Building Width</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="number" placeholder="Building Width" {...register('building_width', { required: true })} />
                            </div>
                            <FormErrorMessage error={errors.building_width} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Short Name</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="Short Name" {...register('short_name', { required: true })} />
                            </div>
                            <FormErrorMessage error={errors.short_name} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Longitude</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="number" placeholder="41.40338" {...register('no_of_floors', { required: true })} />
                            </div>
                            <FormErrorMessage error={errors.no_of_floors} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Latitude</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="number" placeholder="41.40338" {...register('no_of_rooms', { required: true })} />
                            </div>
                            <FormErrorMessage error={errors.no_of_rooms} />
                        </div>
                    </div>
                </div>

                <div className="submit-buttons">
                    <div className="buttons">
                        <button className="lg-rounded-btn gray">Reset</button>
                        <button className="lg-rounded-btn spring">Save & Add more</button>
                        <button className="lg-rounded-btn">Save & Exit</button>
                    </div>
                </div>
            </Form>
        </CreateBuildingMain>
    );
};

export default CreateBuilding;
