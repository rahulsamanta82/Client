import { FC } from "react";
import { EditorMain } from "./style";
import { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strikethrough'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['image', 'video', 'code-block'],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ['link', 'clean'],
    ]
};
const formats = ['header', 'bold', 'italic', 'underline', 'list'];
interface EditorProps {
    value?: string;
    onChange: (name: string, value: string) => void;
    name: string;
    register?: Function;
    required?: boolean;
}

const Editor: FC<EditorProps> = ({ value, onChange, name, register, required }) => {
    const quillRef = useRef<any>(null);
    const handleChange = (value: string) => {
        if (value === '<p><br></p>') {
            onChange(name, '');
        } else {
            onChange(name, value);
        }
    };
    return (
        <EditorMain>
            <div className="editor-wrapper">
                <ReactQuill
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={value}
                    onChange={handleChange}
                    ref={quillRef}
                    style={{ flex: '1', maxWidth: 'auto', width: '100%' }}
                />
                {register && <input type="text" className="d-none" {...register(name, { required: required ?? true })} />}
            </div>
        </EditorMain>
    )
}
export default Editor;
