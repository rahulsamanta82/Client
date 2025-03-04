import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { FC, useState } from "react";
import {
    CreateAcademicExamTypeSection,
    CreateAcademicExamTypeMain,
    CreateAcademicExamTypeTop,
} from "./style";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { useForm } from "react-hook-form";

export const CreateAcademicExamType: FC = () => {
    const breadcrumbLinks: BreadcrumbLink[] = [
        { title: "Academics / ", path: siteRoutes.academicSessionListing },
        { title: "Exam Types /", path: siteRoutes.academicExamTypeListing },
        { title: "Add Exam Type", path: siteRoutes.createAcademicExamType },
    ]
    const [formData, setFormData] = useState({ is_active: 1 });
    const { register } = useForm<any>();

    const handleChange = (event: any) => {

    }

    return (
        <CreateAcademicExamTypeMain>
            <CreateAcademicExamTypeTop>
                <div className="left">
                    <span className="page-heading">Add Exam Type</span>
                    <Breadcrumb links={breadcrumbLinks} />
                </div>
            </CreateAcademicExamTypeTop>

            <CreateAcademicExamTypeSection className="content-radius-shadow">
                <div className="common-fields">
                    <div className="input-field">
                        <label>Exam Type Title</label>
                        <div className="field-wrap">
                            <div className="field">
                                <input type="text" placeholder="Enter Title" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="submit-buttons">
                    <div className="buttons">
                        <button className="lg-rounded-btn gray" type="button">
                            Reset
                        </button>
                        <button className="lg-rounded-btn">& Exit</button>
                    </div>
                </div>
            </CreateAcademicExamTypeSection>
        </CreateAcademicExamTypeMain>
    );
};

export default CreateAcademicExamType;
