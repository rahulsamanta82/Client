import { FC, useEffect, useState } from "react";
import Breadcrumb from "components/particles/breadcrumb";
import { CreateProgramMain, CreateProgramTopSection, Form } from "./style";
import { useForm } from "react-hook-form";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import useUtils from "hooks/useUtils";
import { AddProgramDTO } from "utils/helpers/models/organization/add-program.dto";
import FormErrorMessage from "components/particles/forms/form-error-message";
import useOrganization from "../../useHooks";
import { warningToaster } from "utils/helpers/common/alert-service";
import { warningMessages } from "utils/helpers/enums/messages.enum";

const CreateProgram: FC = () => {
    let [formData, setFormData] = useState<AddProgramDTO>(new AddProgramDTO());
    const [certificateLevels, setCertificateLevels] = useState<any[]>([]);
    const [structureTypes, setStructureTypes] = useState<any[]>([]);
    const [currentStructureType, setCurrentStructureType] = useState<any>();
    const [orgStructures, setOrgStructures] = useState<any[]>([]);
    const { createProgram, getStructureTypesAdmin, getProgramById, getCertificateLevelsAdmin, updateProgram, getOrgStructures } = useOrganization();
    const {
        handleSubmit,
        formState: { errors },
        setValue,
        trigger,
        register,
        getValues,
    } = useForm<AddProgramDTO>({ defaultValues: formData });
    const { getQueryParams } = useUtils();
    const params = getQueryParams();

    const creditHoursChange = (value: any) => {
        setFormData({ ...formData, min_credit_hrs: value[0], max_credit_hrs: value[1] });
        setValue('min_credit_hrs', value[0]);
        setValue('max_credit_hrs', value[1]);
    };
    const onSubmit = (formData: any, addMore: boolean = false) => {
        const { min_credit_hrs, max_credit_hrs } = formData;
        if (min_credit_hrs && max_credit_hrs) {
            if (params?.id) {
                updateProgram(params?.id, formData);
            } else {
                createProgram(formData, addMore, resetForm);
            }
        } else {
            warningToaster(warningMessages.creditHoursRangeMsg);
        }
    }

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setValue(name, value);
        trigger(name);
        if (name === 'cat_type_id') {
            setValue('cat_id', '');
            setFormData({ ...formData, [name]: value, cat_id: '' });
            getOrgStructures(setOrgStructures, { categories_types_id: value, per_page: 'All' });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    }

    useEffect(() => {
        getStructureTypesAdmin(setStructureTypes);
        getCertificateLevelsAdmin(setCertificateLevels);
        if (params?.id) {
            getProgramById(params?.id, getValues, setValue, setFormData, setOrgStructures);
        }
    }, []);

    useEffect(() => {
        if (formData.cat_type_id) {
            const structureType = structureTypes.find((item: any) => item.id == formData.cat_type_id);
            setCurrentStructureType(structureType);
        }
    }, [formData.cat_type_id, structureTypes]);

    const resetForm = (event: any) => {
        for (let key in getValues()) {
            setValue(key as keyof AddProgramDTO, '');
        }

        formData = new AddProgramDTO();

        setFormData({ ...formData });
        creditHoursChange([0, 20]);
    };

    return (
        <CreateProgramMain>
            <CreateProgramTopSection>
                <span className="page-heading">
                    {params?.id ? "Update" : "Add"} Program
                </span>
                {!params?.id && <Breadcrumb />}
            </CreateProgramTopSection>
            <Form className="content-radius-shadow" onSubmit={handleSubmit((data: AddProgramDTO) => onSubmit(data))}>
                <div className="common-fields">
                    <div className="input-field">
                        <label>Program Level</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select {...register('level_id', { required: true })} value={formData.level_id} onChange={handleChange}>
                                    <option value="">Select Program Level</option>
                                    {certificateLevels.map((item: any, index: number) => {
                                        return <option key={index} value={item.id}>{item.title}</option>
                                    })}
                                </select>
                            </div>
                            <FormErrorMessage error={errors.level_id} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Program Name</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input
                                    type="text"
                                    placeholder="Program Name"
                                    {...register("title", { required: true })}
                                    onChange={handleChange}
                                />
                            </div>
                            <FormErrorMessage error={errors.title} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Select Structure Type</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select
                                    {...register('cat_type_id', { required: true })}
                                    value={formData.cat_type_id}
                                    onChange={handleChange}
                                >
                                    <option value={''}>Select Structure Type</option>
                                    {structureTypes.map((item: any, index: number) => {
                                        return <option value={item.id} key={index}>{item.title}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                    {currentStructureType &&
                        <div className="input-field">
                            <label>Select {currentStructureType.title}</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <select {...register("cat_id", { required: true })}
                                        onChange={handleChange}
                                        value={formData.cat_id}
                                    >
                                        <option value={''}>Select {currentStructureType.title}</option>
                                        {orgStructures.map((item: any, index: number) => {
                                            return <option value={item.id} key={index}>{item.title}</option>
                                        })}
                                    </select>
                                </div>
                                <FormErrorMessage error={errors.cat_id} />
                            </div>
                        </div>
                    }
                    <div className="input-field">
                        <label>Program Shortcode</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input
                                    type="text"
                                    placeholder="Add Program Shortcode"
                                    {...register("code", { required: true })}
                                    onChange={handleChange}
                                />
                            </div>
                            <FormErrorMessage error={errors.code} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Degree Title</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" {...register('degree_title', { required: true })} placeholder="Enter Degree title" />
                            </div>
                            <FormErrorMessage error={errors.degree_title} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Credit hours (minimum and maximum)</label>
                        <div className="field-wrap">
                            <div className="slider-field">
                                <div className="value-display">
                                    <div className="particular-display">
                                        {formData.min_credit_hrs}
                                    </div>
                                    <div className="particular-display">
                                        {formData.max_credit_hrs}
                                    </div>
                                </div>
                                <Slider
                                    range
                                    min={0}
                                    max={200}
                                    value={[formData.min_credit_hrs, formData.max_credit_hrs]}
                                    onChange={(value: number | number[]) => creditHoursChange(value)}

                                />
                            </div>
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Years of Education</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input
                                    type="text"
                                    placeholder="Add Years of Education"
                                    {...register("years_of_education", { required: true })}
                                    onChange={handleChange}
                                />
                            </div>
                            <FormErrorMessage error={errors.years_of_education} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Semesters</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select {...register("semesters", { required: true })}
                                    onChange={handleChange}
                                >
                                    <option value={''}>Select Semesters</option>
                                    <option value={2}>2</option>
                                    <option value={4}>4</option>
                                    <option value={6}>6</option>
                                    <option value={8}>8</option>
                                </select>
                            </div>
                            <FormErrorMessage error={errors.semesters} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Duration</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select {...register("years", { required: true })}
                                    onChange={handleChange}
                                >
                                    <option value={''}>Select Duration</option>
                                    <option value={1}>1 Year</option>
                                    <option value={2}>2 Years</option>
                                    <option value={3}>3 Years</option>
                                    <option value={4}>4 Years</option>
                                </select>
                            </div>
                            <FormErrorMessage error={errors.years} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Program Shift</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select {...register("program_shift", { required: true })}
                                    onChange={handleChange}
                                >
                                    <option value={''}>Select Program Shift</option>
                                    <option value={'Morning'}>Morning</option>
                                    <option value={'Evening'}>Evening</option>
                                    <option value={'Afternoon'}>Afternoon</option>
                                </select>
                            </div>
                            <FormErrorMessage error={errors.program_shift} />
                        </div>
                    </div>

                    {/* <div className="input-field">
                        <label>Credit Hours</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="number" placeholder="No. of floors" />
                            </div>
                        </div>
                    </div> */}
                    <div className="input-field">
                        <label>Program Type</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select {...register("program_type", { required: true })}>
                                    <option value={''}>Select Semester/Annual</option>
                                    <option value={'Semester'}>Semester</option>
                                    <option value={'Annual'}>Annual</option>
                                </select>
                            </div>
                            <FormErrorMessage error={errors.program_type} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Student Registration Prefix</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input
                                    type="text"
                                    placeholder="Add Student Registration Prefix"
                                    {...register("reg_prefix", { required: true })}
                                    onChange={handleChange}
                                />
                            </div>
                            <FormErrorMessage error={errors.reg_prefix} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Course Repeat Fee </label>
                        <div className="field-wrap">
                            <div className="field">
                                <input
                                    type="number"
                                    placeholder="Add Course Repeat Fee "
                                    {...register("course_repeat_fee", { required: true })}
                                    onChange={handleChange}
                                />
                            </div>
                            <FormErrorMessage error={errors.course_repeat_fee} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Status</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select {...register("status", { required: true })}
                                    onChange={handleChange}
                                >
                                    <option value={''} selected disabled>Status</option>
                                    <option value="1">Active</option>
                                    <option value="0">Inactive</option>
                                </select>
                            </div>
                            <FormErrorMessage error={errors.status} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Interview Passing Marks</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input
                                    type="number"
                                    placeholder="Add Passing Marks"
                                    {...register("interview_passing_marks", { required: true })}
                                    onChange={handleChange}
                                />
                            </div>
                            <FormErrorMessage error={errors.interview_passing_marks} />
                        </div>
                    </div>
                </div>

                <div className="submit-buttons">
                    <div className="buttons">
                        <button className="lg-rounded-btn gray" onClick={resetForm}>Reset</button>
                        {!params?.id && <button className="lg-rounded-btn spring" type="submit" onClick={handleSubmit((data: AddProgramDTO) => onSubmit(data, true))}>Save & Add more</button>}
                        <button className="lg-rounded-btn" onClick={handleSubmit((data: AddProgramDTO) => onSubmit(data))}>Save & Exit</button>
                    </div>
                </div>
            </Form>
        </CreateProgramMain>
    );
};

export default CreateProgram;
