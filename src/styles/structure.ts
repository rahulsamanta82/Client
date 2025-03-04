import { createGlobalStyle } from "styled-components";

const StructureStyles = createGlobalStyle`

    .content-radius-shadow{
        box-shadow: 0px 4px 70px 0px #0000001A;
        border-radius: 20px;
        background: var(--white-color);
    }

    .page-heading{
        font-size: 32px;
        font-weight: 500;
        color: var(--black-text);
        word-wrap: break-word;

        @media screen and (max-width: 768px){
            font-size: 24px;
        }
    }

    .d-none{
        display: none;
    }

    .text-capitalize{
        text-transform: capitalize;
    }

    .lg-rounded-btn{
        min-width: 155px;
        padding: 0 1.5em;
        border-radius: 8px;
        height: 50px;
        color: var(--white-constant);
        background: var(--primary);

        &.gray{
            background: var(--reset-button-bg);
            color: var(--black-text);
        }
        &.spring{
            background: var(--lightgreen-medium);
            color: var(--white-constant);
        }
        &.black{
            background: var(--black-text);
            color: var(--white-color);
        }
        &.red{
            background: var(--medium-red);
        }
    }

    .link-text{
        cursor: pointer;
        color: var(--primary);
        font-size: inherit;
        font-weight: inherit;
    }

    .page-sub-heading{
        font-size: 24px;
        font-weight: 500;
        color: var(--black-text);

        @media screen and (max-width: 768px){
            font-size: 20px;
        }
    }

.sm-w-rounded-loader{
    width: 20px;
    height: 20px;
    border-right: 3px solid var(--white-constant);
    border-left: 3px solid var(--white-constant);
    border-bottom: 3px solid var(--white-constant);
    border-top: 3px solid transparent;
    border-radius: 50%;
    animation: loader 1.5s linear infinite;
}


/* .swal2-toast{
    width: 320px !important;
    animation: slideInBottom 0.3s ease-in-out !important;
}*/

.swal2-popup.swal2-modal{
    border-radius: 12px !important;
}

.mw-150{
    min-width: 150px;
}
.mw-120{
    min-width: 120px;
}
.mw-130{
    min-width: 130px;
}
.mw-100{
    min-width: 100px;
}
.c-primary{
    color: var(--primary)
}
`;

export default StructureStyles;