import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { FC, useEffect, useState } from "react";
import {
    CreateAcademicLetterGradeSection,
    CreateAcademicLetterGradeMain,
    CreateAcademicLetterGradeTop,
} from "./style";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useForm } from "react-hook-form";
import { LetterGradeDTO } from "utils/helpers/models/academics/letter-grade.dto";
import useAcademics from "../../useHooks";
import useUtils from "hooks/useUtils";
import FormErrorMessage from "components/particles/forms/form-error-message";

export const CreateAcademicLetterGrade: FC = () => {
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: "Academics / ", path: siteRoutes.academicSessionListing },
        { title: "Letter Grades  / ", path: siteRoutes.academicLetterGradesListing },
        { title: "Add Letter Grades", path: siteRoutes.createAcademicLetterGrade },
    ]
    const { handleSubmit, register, setValue, trigger, formState: { errors } } = useForm<LetterGradeDTO>();
    let [formData, setFormData] = useState<LetterGradeDTO>(new LetterGradeDTO());
    const { createLetterGrade, updateLetterGrade, getLetterGradeById } = useAcademics();
    const { getQueryParams } = useUtils();
    const params = getQueryParams();

    const onSubmit = () => {
        if (params?.id) {
            updateLetterGrade(params?.id, formData);
        } else {
            createLetterGrade(formData);
        }
    }

    const handleChange = (event: any) => {
        const { value, name } = event.target;
        setValue(name, value);
        trigger(name);
        setFormData({ ...formData, [name]: value });
    }

    const resetForm = () => {
        formData = new LetterGradeDTO();
        for (let key in formData) {
            setValue(key as keyof LetterGradeDTO, formData[key as keyof LetterGradeDTO]);
        }

        setFormData({ ...formData });
    }

    useEffect(() => {
        if (params?.id) getLetterGradeById(params?.id, formData, setValue, setFormData);
    }, []);

    return (
        <CreateAcademicLetterGradeMain>
            <CreateAcademicLetterGradeTop>
                <div className="left">
                    <span className="page-heading">Add Letter Grade</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
            </CreateAcademicLetterGradeTop>

            <CreateAcademicLetterGradeSection className="content-radius-shadow" onSubmit={handleSubmit(onSubmit)}>
                <div className="common-fields">
                    <div className="input-field">
                        <label>Sequential Order</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="number" {...register('sequential_order', { required: true })} value={formData.sequential_order} onChange={handleChange} />
                            </div>
                            <FormErrorMessage error={errors.sequential_order} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Letter Grade</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" {...register('letter_grade', { required: true })} value={formData.letter_grade} onChange={handleChange} />
                            </div>
                            <FormErrorMessage error={errors.letter_grade} />
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Letter Point</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="number" {...register('grade_point', { required: true })} value={formData.grade_point} onChange={handleChange} />
                            </div>
                            <FormErrorMessage error={errors.grade_point} />
                        </div>
                    </div>
                </div>
                <div className="submit-buttons">
                    <div className="buttons">
                        <button className="lg-rounded-btn gray" type="button" onClick={resetForm}>
                            Reset
                        </button>
                        <button className="lg-rounded-btn">Submit</button>
                    </div>
                </div>
            </CreateAcademicLetterGradeSection>
        </CreateAcademicLetterGradeMain>
    );
};

export default CreateAcademicLetterGrade;
