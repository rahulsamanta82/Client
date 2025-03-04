import { FC, useEffect, useState } from "react";
import Breadcrumb from "components/particles/breadcrumb";
import profileLogo from "assets/images/organization/others/profile-logo.png";
import { CreateAssetMain, CreateAssetTopSection, Form } from "./style";
import { useForm } from "react-hook-form";
import { AddAssetDTO } from "utils/helpers/models/organization/add-assets.dto";
import FormErrorMessage from "components/particles/forms/form-error-message";
import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const CreateAsset: FC = () => {
  const breadcrumbLinks = [
    {
      title: "Infrastructure & Asset Management /",
      path: "",
    },
    {
      title: "Add Assets",
      path: siteRoutes.createAsset,
    },
  ];
  const { getQueryParams } = useUtils();
  const params = getQueryParams();
  const [formData, setFormData] = useState<AddAssetDTO>(new AddAssetDTO());
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddAssetDTO>({
    defaultValues: formData,
  });

  const onSubmit = (formData: AddAssetDTO) => {
    console.log(formData, "formdata");
  };

  useEffect(() => {
    console.log(params?.id, "params.id");
    if (params?.id) {
    }
  }, []);
  return (
    <CreateAssetMain>
      <CreateAssetTopSection>
        <span className="page-heading">
          {params?.id ? "Update" : "Add"} Asset
        </span>
        {!params?.id && <Breadcrumb links={breadcrumbLinks} />}
      </CreateAssetTopSection>
      <Form className="content-radius-shadow" onSubmit={handleSubmit(onSubmit)}>
        <div className="upload-profile-image-field">
          <div className="field">
            <label className="image" htmlFor="asset-image">
              <img src={profileLogo} />
              <input type="file" id="asset-image" className="d-none" />
            </label>
            <label htmlFor="asset-image">Asset Image</label>
          </div>
        </div>
        <div className="common-fields">
          <div className="input-field">
            <label>Major Category *</label>
            <div className="field-wrap">
              <div className="field">
                <select {...register("major_category", { required: true })}>
                  <option value={""}>Select Major Category</option>
                </select>
              </div>
              <FormErrorMessage error={errors.major_category} />
            </div>
          </div>
          <div className="input-field">
            <label>Minor Category *</label>
            <div className="field-wrap">
              <div className="field">
                <select {...register("minor_category", { required: true })}>
                  <option value={""}>Select Minor Category</option>
                </select>
              </div>
              <FormErrorMessage error={errors.minor_category} />
            </div>
          </div>
          <div className="input-field">
            <label>Product *</label>
            <div className="field-wrap">
              <div className="field">
                <select {...register("product", { required: true })}>
                  <option value={""}>Select Product</option>
                </select>
              </div>
              <FormErrorMessage error={errors.product} />
            </div>
          </div>
          <div className="input-field">
            <label>Product DESC</label>
            <div className="field-wrap">
              <div className="field">
                <input
                  type="text"
                  placeholder="xyz@gmail.com"
                  {...register("product_desc", { required: true })}
                />
              </div>
              <FormErrorMessage error={errors.product_desc} />
            </div>
          </div>
          <div className="input-field">
            <label>Asset Condition *</label>
            <div className="field-wrap">
              <div className="field">
                <select {...register("asset_condition", { required: true })}>
                  <option>Select Asset Condition</option>
                </select>
              </div>
              <FormErrorMessage error={errors.asset_condition} />
            </div>
          </div>
          <div className="input-field">
            <label> Units *</label>
            <div className="field-wrap">
              <div className="field">
                <input
                  type="number"
                  {...register("units", { required: true })}
                />
              </div>
              <FormErrorMessage error={errors.units} />
            </div>
          </div>
          <div className="input-field">
            <label>Estimated Life(Years)</label>
            <div className="field-wrap">
              <div className="field">
                <select {...register("estimated_life", { required: true })}>
                  <option>Select Estimated Life</option>
                </select>
              </div>
              <FormErrorMessage error={errors.estimated_life} />
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
    </CreateAssetMain>
  );
};

export default CreateAsset;
