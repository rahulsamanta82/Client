import { ChangeEvent, FC, useEffect, useState } from "react";
import {
    CreateOrgSTMain,
    FormSection,
    FormStepper,
    OrgSTContentSection,
    OrgSTCreateTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import Stepper from "components/particles/forms/stepper";
import profileLogo from "assets/images/organization/others/profile-logo.png";
import Editor from "components/particles/forms/editor";
import {
    CheckSvg,
    GeneralDetailSvg,
    IntroductionSvg,
    StructureTypeSvg,
    SuccessSvg,
} from "assets/images/organization/svgs";
import useUtils from "hooks/useUtils";
import { useForm } from "react-hook-form";
import { AddOrgStructureDTO } from "utils/helpers/models/organization/add-org-structure.dto";
import FormErrorMessage from "components/particles/forms/form-error-message";
import useOrganization from "../../useHooks";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

interface CreateOrganizationalStructureProps { }

const CreateOrganizationalStructure: FC<CreateOrganizationalStructureProps> = ({ }) => {
    const breadcrumbLinks = [
        {
            title: "Organization /",
            path: siteRoutes.organizationListing,
        },
        {
            title: "Add Organizational Structure ",
            path: siteRoutes.createOrgStructure,
        },
    ]
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [stepsArray, setStepsArray] = useState<any[]>([
        {
            title: "Choose Structure Type",
            icon: StructureTypeSvg,
            active: false,
            completed: false,
        },
        {
            title: "General Details",
            icon: GeneralDetailSvg,
            active: false,
            completed: false,
        },
        {
            title: "Introduction",
            icon: IntroductionSvg,
            active: false,
            completed: false,
        },
        { title: "Done", icon: CheckSvg, active: false, completed: false },
    ]);
    const [invalidStep, setInvalidStep] = useState<number | undefined>();
    const [structureTypes, setStructureTypes] = useState<any[]>([]);
    const [orgStructures, setOrgStructures] = useState<any[]>([]);
    const [districts, setDistricts] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const [formData, setFormData] = useState<AddOrgStructureDTO>(
        new AddOrgStructureDTO()
    );
    const { scrollToTop, getLocalFilePath, getQueryParams } = useUtils();
    const params = getQueryParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        trigger,
        setValue,
        reset,
    } = useForm<AddOrgStructureDTO>();

    const {
        getStructureTypesAdmin,
        createOrgStructure,
        getOrgStructureById,
        getCitiesAdmin,
        getDistrictsAdmin,
        updateOrgStructure,
        getOrgStructures,
    } = useOrganization();

    const goNext = async (step: number, e: any) => {
        e.preventDefault();
        let isValid: boolean = true;
        if (step === 1) {
            isValid = await trigger(["categories_types_id", "parent_id"]);
        } else if (step === 2) {
            isValid = await trigger([
                "title",
                "logo",
                "website",
                "email",
                "phone",
                "address",
                "parent_id",
                "city_id",
                "district",
            ]);
        } else if (step === 3) {
            isValid = await trigger(["vision", "mission"]);
        }

        if (isValid) {
            setCurrentStep(currentStep + 1);
            scrollToTop();
            // }
        } else {
            setInvalidStep(step);
        }
    };

    const goBack = (e: any) => {
        e.preventDefault();
        setCurrentStep(currentStep - 1);
        scrollToTop();
    };

    const triggerSpecificField = (
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target as any;
        setValue(name, value);
        setFormData({ ...formData, [name]: value });
        trigger([name]);
    };

    const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const { files, name } = event.target as any;
        const file = files![0];

        setValue(name, file);
        trigger([name]);
        const path = getLocalFilePath(file);
        setFormData({ ...formData, logo: path });
    };

    const onSubmit = (data: AddOrgStructureDTO, addMore: boolean = false) => {
        if (!data.parent_type_id || !data.parent_id) {
            delete (data as any).parent_type_id;
            delete (data as any).parent_id;
        }
        if (!data.city_id) delete (data as any).city_id;
        if (!data.district) delete (data as any).district;
        const formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key as keyof AddOrgStructureDTO]);
        }
        if (params?.id) {
            updateOrgStructure(params?.id, formData);
        } else {
            createOrgStructure(
                formData,
                addMore,
                stepsArray,
                setStepsArray,
                setCurrentStep,
                setFormData,
                setValue
            );
        }
    };

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setValue(name, value);
        formData[name as keyof AddOrgStructureDTO] = value;
        setFormData({ ...formData });
        if (name === 'categories_types_id' || name === 'parent_type_id') {
            trigger(['categories_types_id', 'parent_type_id']);
        } else {
            trigger([name]);
        }
    };

    useEffect(() => {
        getStructureTypesAdmin(setStructureTypes);
        getCitiesAdmin(setCities);
        getDistrictsAdmin(setDistricts);
        if (params?.id) {
            getOrgStructureById(params?.id, getValues, setValue, setFormData);
        }
    }, []);

    useEffect(() => {
        const { parent_type_id } = formData;
        if (parent_type_id) {
            getOrgStructures(setOrgStructures, {
                categories_types_id: parent_type_id,
                per_page: "All",
            });
        }
    }, [formData.parent_type_id]);

    return (
        <CreateOrgSTMain>
            <OrgSTCreateTop>
                <span className="page-heading">
                    {params?.id ? "Update" : "Add"} Organizational Structure
                </span>
                {!params?.id && <Breadcrumb links={breadcrumbLinks} />}
            </OrgSTCreateTop>
            <OrgSTContentSection>
                <FormStepper>
                    <Stepper
                        steps={stepsArray}
                        currentStep={currentStep}
                        setCurrentStep={setCurrentStep}
                        invalidStep={invalidStep}
                    />
                </FormStepper>
                <FormSection>
                    <form>
                        {currentStep === 1 ? (
                            <div className="step-1">
                                <div className="fields">
                                    <div className="input-field">
                                        <label>Structure Type</label>
                                        <div className="field-wrap">
                                            <div className="field">
                                                <select
                                                    {...register("categories_types_id", {
                                                        required: true,
                                                        validate: {
                                                            validate: (value) => value !== formData.parent_type_id || "Choose type other than parent"
                                                        }
                                                    })}
                                                    value={formData.categories_types_id}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Choose Structure Type</option>
                                                    {structureTypes?.map((item: any, index: number) => {
                                                        return (
                                                            <option value={item.id} key={index}>
                                                                {item.title}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                            <FormErrorMessage error={errors.categories_types_id} />
                                        </div>
                                    </div>
                                    <div className="input-field">
                                        <label>Parent</label>
                                        <div className="field-wrap">
                                            <div className="field">
                                                <select
                                                    {...register("parent_type_id", { required: false })}
                                                    onChange={handleChange}
                                                    value={formData.parent_type_id}
                                                >
                                                    <option value="">Choose Structure Parent</option>
                                                    {structureTypes.map((item: any, index: number) => {
                                                        return (
                                                            <option value={item.id} key={index}>
                                                                {item.title}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                            <FormErrorMessage error={errors.parent_type_id} />
                                        </div>
                                    </div>
                                </div>
                                <div className="submit-buttons">
                                    <button
                                        className="lg-rounded-btn"
                                        onClick={(e: any) => goNext(1, e)}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        ) : currentStep === 2 ? (
                            <div className="step-2">
                                <div className="upload-profile-image-field">
                                    <div className="field">
                                        <label className="image" htmlFor="faculty-logo">
                                            <img src={formData?.logo?.length ? formData?.logo : profileLogo} alt="" />
                                            <input
                                                type="file"
                                                className="d-none"
                                                id="faculty-logo"
                                                {...register("logo")}
                                                onChange={handleFileUpload}
                                            />
                                        </label>
                                        <label htmlFor="faculty-logo">
                                            {
                                                structureTypes.find(
                                                    (val: any) =>
                                                        val.id == formData.categories_types_id
                                                )?.title
                                            }{" "}
                                            Logo
                                        </label>
                                    </div>
                                    <FormErrorMessage error={errors.logo} />
                                </div>
                                <div className="common-fields">
                                    <div className="input-field">
                                        <label>
                                            {
                                                structureTypes.find(
                                                    (val: any) =>
                                                        val.id == formData.categories_types_id
                                                )?.title
                                            }{" "}
                                            Name
                                        </label>
                                        <div className="field-wrap">
                                            <div className="field">
                                                <input
                                                    type="text"
                                                    value={formData.title}
                                                    {...register("title", { required: true })}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <FormErrorMessage error={errors.title} />
                                        </div>
                                    </div>
                                    {formData.parent_type_id && <div className="input-field">
                                        <label>
                                            Select Parent{" "}
                                            {
                                                structureTypes.find(
                                                    (val: any) => val.id == formData.parent_type_id
                                                )?.title
                                            }
                                        </label>
                                        <div className="field-wrap">
                                            <div className="field">
                                                <select
                                                    {...register("parent_id", {
                                                        required: formData.parent_type_id,
                                                    })}
                                                    value={formData.parent_id}
                                                    onChange={triggerSpecificField}
                                                >
                                                    <option value={""}>
                                                        Choose Parent{" "}
                                                        {
                                                            structureTypes.find(
                                                                (val: any) =>
                                                                    val.id == formData.parent_type_id
                                                            )?.title
                                                        }
                                                    </option>
                                                    {orgStructures.map((item: any, index: number) => {
                                                        return (
                                                            <option value={item.id} key={index}>
                                                                {item.title}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                            <FormErrorMessage error={errors.parent_id} />
                                        </div>
                                    </div>}
                                    {/* // }  */}
                                    <div className="input-field">
                                        <label>Website</label>
                                        <div className="field-wrap">
                                            <div className="field">
                                                <input
                                                    type="url"
                                                    placeholder="xyzdomain.com"
                                                    value={formData.website}
                                                    {...register("website", { required: true })}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <FormErrorMessage error={errors.website} />
                                        </div>
                                    </div>
                                    <div className="input-field">
                                        <label>Email</label>
                                        <div className="field-wrap">
                                            <div className="field">
                                                <input
                                                    type="email"
                                                    placeholder="xyz@gmail.com"
                                                    value={formData.email}
                                                    {...register("email", { required: true })}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <FormErrorMessage error={errors.email} />
                                        </div>
                                    </div>
                                    <div className="input-field">
                                        <label>Phone</label>
                                        <div className="field-wrap">
                                            <div className="field">
                                                <input
                                                    type="tel"
                                                    placeholder="+92 000000000"
                                                    value={formData.phone}
                                                    {...register("phone", { required: true })}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <FormErrorMessage error={errors.phone} />
                                        </div>
                                    </div>
                                    <div className="input-field">
                                        <label>Address</label>
                                        <div className="field-wrap">
                                            <div className="field">
                                                <input
                                                    type="text"
                                                    placeholder="Street abc"
                                                    value={formData.address}
                                                    {...register("address", { required: true })}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <FormErrorMessage error={errors.address} />
                                        </div>
                                    </div>
                                    <div className="input-field">
                                        <label>City</label>
                                        <div className="field-wrap">
                                            <div className="field">
                                                <select
                                                    {...register("city_id", { required: true })}
                                                    value={formData.city_id}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select City</option>
                                                    {cities.map((city: any, index: number) => {
                                                        return (
                                                            <option key={index} value={city.id}>
                                                                {city.title}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                            <FormErrorMessage error={errors.city_id} />
                                        </div>
                                    </div>
                                    <div className="input-field">
                                        <label>District</label>
                                        <div className="field-wrap">
                                            <div className="field">
                                                <select
                                                    {...register("district", { required: true })}
                                                    value={formData.district}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select District</option>
                                                    {districts.map((district: any, index: number) => {
                                                        return (
                                                            <option key={index} value={district.id}>
                                                                {district.title}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                            <FormErrorMessage error={errors.district} />
                                        </div>
                                    </div>
                                </div>
                                <div className="submit-buttons">
                                    <div className="buttons">
                                        <button className="lg-rounded-btn gray" onClick={goBack}>
                                            Back
                                        </button>
                                        <button
                                            type="button"
                                            className="lg-rounded-btn"
                                            onClick={(e: any) => goNext(2, e)}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : currentStep === 3 ? (
                            <div className="step-3">
                                <div className="detail-fields">
                                    <div className="editor-field">
                                        <label>Mission</label>
                                        <div className="field-wrap">
                                            <div className="field">
                                                <input
                                                    type="text"
                                                    className="d-none"
                                                    {...register("mission", { required: true })}
                                                    onChange={triggerSpecificField}
                                                />
                                                <Editor
                                                    value={getValues("mission")}
                                                    onChange={(name: string, value: string) =>
                                                        handleChange({ target: { name, value } })
                                                    }
                                                    name="mission"
                                                />
                                            </div>
                                            <FormErrorMessage error={errors.mission} />
                                        </div>
                                    </div>
                                    <div className="editor-field">
                                        <label>Vision</label>
                                        <div className="field-wrap">
                                            <div className="field">
                                                <input
                                                    type="text"
                                                    className="d-none"
                                                    {...register("vision", { required: true })}
                                                    onChange={handleChange}
                                                />
                                                <Editor
                                                    value={getValues("vision")}
                                                    onChange={(name: string, value: string) =>
                                                        handleChange({ target: { name, value } })
                                                    }
                                                    name="vision"
                                                />
                                            </div>
                                            <FormErrorMessage error={errors.vision} />
                                        </div>
                                    </div>
                                </div>
                                <div className="submit-buttons">
                                    <div className="buttons">
                                        <button className="lg-rounded-btn gray" onClick={goBack}>
                                            Back
                                        </button>
                                        <button
                                            className="lg-rounded-btn"
                                            onClick={(e: any) => goNext(3, e)}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="step-4">
                                <div className="success-popup">
                                    <div className="success-icon">
                                        <SuccessSvg className="icon" />
                                    </div>
                                    <div className="content">
                                        <div className="heading">
                                            <span className="page-sub-heading">
                                                Organizational Structure{" "}
                                                {params?.id ? "Updated" : "Created"} Successfully
                                            </span>
                                        </div>
                                        <div className="text">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Curabitur molestie urna magna, vel blandit nunc dictum
                                            vel. Quisque sollicitudin varius lorem at vestibulum.
                                        </div>
                                    </div>
                                </div>
                                <div className="submit-buttons">
                                    <div className="buttons">
                                        <button className="lg-rounded-btn gray" onClick={goBack}>
                                            Back
                                        </button>
                                        {!params?.id && (
                                            <button
                                                className="lg-rounded-btn spring"
                                                onClick={handleSubmit((formData: AddOrgStructureDTO) =>
                                                    onSubmit(formData, true)
                                                )}
                                            >
                                                Save & Add more
                                            </button>
                                        )}
                                        <button
                                            className="lg-rounded-btn"
                                            onClick={handleSubmit((formData: AddOrgStructureDTO) =>
                                                onSubmit(formData)
                                            )}
                                        >
                                            Save & Exit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>
                </FormSection>
            </OrgSTContentSection>
        </CreateOrgSTMain>
    );
};

export default CreateOrganizationalStructure;
