import { FC, Fragment, useEffect, useState } from "react";
import Breadcrumb from "components/particles/breadcrumb";
import {
    BoardManagementCreateMain,
    BoardManagementCreateTop,
    BoardManagementCreateSection,
    Filters
} from "./style";
import MultiselectDropdown from "components/particles/forms/multiselect-dropdown";
import { DownArrowLightgrayMediumSvg } from "assets/images/common/svgs";
import { useForm } from "react-hook-form";
import { AddBoardDTO } from "utils/helpers/models/organization/add-board.dto";
import FormErrorMessage from "components/particles/forms/form-error-message";
import { warningToaster } from "utils/helpers/common/alert-service";
import { warningMessages } from "utils/helpers/enums/messages.enum";
import useUtils from "hooks/useUtils";
import useOrganization from "containers/private/organization/useHooks";

interface AdmissionStudentListingProps { }

const CreateAdmissionBoardManagement: FC<AdmissionStudentListingProps> = () => {
    const [formData, setFormData] = useState<AddBoardDTO>(new AddBoardDTO());

    const {
        handleSubmit,
        register,
        setValue,
        trigger,
        formState: { errors },
    } = useForm<AddBoardDTO>({ defaultValues: new AddBoardDTO() });
    const { createBoard, updateBoard, getBoardById } = useOrganization();

    const options = [
        { id: 1, value: "inter", title: "Inter" },
        { id: 2, value: "graduate", title: "Graduate" },
        { id: 3, value: "technical", title: "Technical" },
        { id: 4, value: "cambridge", title: "Cambridge" },
    ];

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const { getQueryParams } = useUtils();
    const params = getQueryParams();

    const handleSelect = (option: any) => {
        if (!option?.selected) {
            const index = formData.level.findIndex((item) => option.id === item.id);
            formData.level.splice(index, 1);
            setFormData({ ...formData });
        } else {
            formData.level.push(option);
            setFormData({ ...formData });
        }

        setValue(
            "level",
            formData.level.map((l) => l.value)
        );
        trigger(["level"]);
    };

    const handleChange = (event: any) => {
        const { value, name } = event.target;
        setValue(name, value);
        trigger([name]);
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = (data: AddBoardDTO, addMore: boolean = false) => {
        if (!data.level.length) {
            warningToaster(warningMessages.boardTypeRequiredMsg);
            return;
        }

        if (params?.id) {
            updateBoard(params?.id, data);
        } else {
            createBoard(data, addMore, resetForm);
        }
    };

    const resetForm = () => {
        for (let key in formData) {
            if (key === "level") {
                setValue(key as keyof AddBoardDTO, []);
            } else {
                setValue(key as keyof AddBoardDTO, "");
            }
        }
        setFormData({ ...new AddBoardDTO() });
    };

    useEffect(() => {
        if (params?.id)
            getBoardById(params?.id, formData, setValue, setFormData, options);
    }, []);

    return (
        <BoardManagementCreateMain>
            <BoardManagementCreateTop>
                <div className="left">
                    <span className="page-heading">Add Board/University</span>
                    <Breadcrumb />
                </div>
            </BoardManagementCreateTop>

            <BoardManagementCreateSection className="content-radius-shadow">
                <Filters>
                    <div className="filter-fields">
                        <div className="input-field">
                            <label>Title</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input
                                        type="text"
                                        {...register("title", { required: true })}
                                        value={formData.title}
                                        onChange={handleChange}
                                    />
                                </div>
                                <FormErrorMessage error={errors.title} />
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Type</label>
                            <div className="field-wrap multiselect">
                                <div className="custom-multi-select" onClick={toggleDropdown}>
                                    <div className="selected-options-container">
                                        {formData.level.map((option: any, index: number) => (
                                            <div className="selected-option" key={index}>
                                                {option.title}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="dropdown-icon">
                                        <DownArrowLightgrayMediumSvg />
                                    </div>
                                </div>
                                {isDropdownOpen && (
                                    <Fragment>
                                        <MultiselectDropdown
                                            options={options}
                                            onSelect={handleSelect}
                                            value={formData.level.map((o) => o.id)}
                                        />
                                    </Fragment>
                                )}
                            </div>
                        </div>
                        <div className="radio-field">
                            <label htmlFor="no">Status</label>
                            <div className="field-wrap">
                                <div className="field">
                                    <input
                                        type="radio"
                                        id="no"
                                        value={0}
                                        checked={formData.is_active == 0}
                                        {...register("is_active", { required: true })}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="no">Active</label>
                                </div>
                                <div className="field">
                                    <input
                                        type="radio"
                                        id="yes"
                                        checked={formData.is_active == 1}
                                        value={1}
                                        {...register("is_active", { required: true })}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="yes">De-Active</label>
                                </div>
                            </div>
                            <FormErrorMessage error={errors.is_active} />
                        </div>
                    </div>

                    <div className="submit-buttons">
                        <div className="buttons">
                            <button className="lg-rounded-btn gray" type="button" onClick={resetForm}>Reset</button>
                            {!params?.id && (
                                <button
                                    className="lg-rounded-btn black"
                                    onClick={handleSubmit((data: AddBoardDTO) =>
                                        onSubmit(data, true)
                                    )}
                                >
                                    Save & Add More
                                </button>
                            )}
                            <button
                                className="lg-rounded-btn"
                                onClick={handleSubmit((data: AddBoardDTO) => onSubmit(data))}
                            >
                                {params?.id ? 'Update' : 'Submit'}
                            </button>
                        </div>
                    </div>
                </Filters>
            </BoardManagementCreateSection>
        </BoardManagementCreateMain>
    );
};

export default CreateAdmissionBoardManagement;
