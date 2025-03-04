import { createGlobalStyle } from "styled-components";

const VariablesStyles = createGlobalStyle`
    :root{
        --primary: #128B9B;
        --black-text: #272A3A;
        --lightgray-light: #878A99;
        --lightgray-medium: #5C5E69;
        --metalic-gray: #8BA3CB;
        --spring-green: #0FCB02;
        --medium-red: #FF4B4A;
        --field-border: #E9EBEC;   
        --white-color: #FFFFFF;
        --win-bg-color: #f2f6f9; 
        --gray-medium: #CED4DA;
        --gray-light: #CBD0DD;
        --3d-gray: #F2F4F7;
        --lightgray-extralight: #E6EFF5;
        --lightgray-medium-light: #E3E6ED;
        --lightgreen-medium: #43AC43;
        --lightgreen-shadow: rgba(15, 203, 2, 0.15);
        --warning-yellow: #FFBB38;
        --lightyellow-shadow: rgba(255, 187, 56, 0.15);
        --error-red: rgba(255, 75, 74, 1);
        --lightred-shadow: rgba(255, 187, 56, 0.15);
        --toastify-toast-width: 450px;
        --input-field-bg: transparent;
        --reset-button-bg: #CED4DA;
        --header-utility-icons-bg: #F5F7FA;
        --white-constant: #ffffff;
        --alert-popup-bg: #ffffff;
        --medium-orange: #FFA34F;
        --light-orange: #FFBB38;
        --orange-shadow: rgba(255, 187, 56, 0.15);
        --primary-extralight: rgba(18, 139, 171, 0.2);
        --modal-backshadow: rgba(217, 217, 217, 0.4);
        --medium-crimson: #FF4B4A;
        --light-medium-crimson: #FF5959;
        --info-field-bg2: #F2F6F9;
        --info-field-bg1: #ffffff;
        --crimson-shadow: rgba(219, 75, 74, 0.1);
        --modal-grey : #6C757D;
        --info-bg:#F7FBFC;
        --primary-extralight-transparent: #128BAB33;
        --light-medium-purple: #718EBF;
        --bright-yellow: #ffeaa7;
        --green-darner: #74b9ff;
    }

    body{
        &.dark{
        --black-text: #fff;
        --lightgray-light: #fff;
        --lightgray-medium: #fff;
        --metalic-gray: #fff;
        --spring-green: #0FCB02;
        --medium-red: #FF4B4A;
        --white-color: #1A1A1A;
        --win-bg-color: #121212;
        --gray-medium: #fff;
        --gray-light: #fff;
        --3d-gray: #fff;
        --lightgray-extralight: #fff;
        --lightgray-medium-light: #fff;
        --error-red: rgba(255, 75, 74, 1);
        --input-field-bg: rgba(233, 235, 236, 0.05);
        --field-border: #E9EBEC0D;
        --reset-button-bg: rgba(233, 235, 236, 0.05);
        --header-utility-icons-bg: rgba(245, 247, 250, 0.05);
        --alert-popup-bg: rgba(57, 57, 57, 1);
        --info-field-bg2: rgba(242, 246, 249, 0.05);
        --info-field-bg1: rgba(233, 235, 236, 0.05);
        --modal-grey :  #fff;
        --info-bg: rgba(233, 235, 236, 0.05);
        }
    }
`;

export default VariablesStyles;
