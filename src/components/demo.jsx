import React, { useState } from 'react';

const Demo = () => {
    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});


    const onChange = event => {
        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
    };

    const onSubmit = async event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);


        try{
            fetch("http://localhost:3000/projects/demoUpload", {
                method: "POST",
                body: formData
            })
                .then(res => res.json())
                .then(data => console.log('Success:', JSON.stringify(data)))
                .catch(error => console.error('Error:', error))

        }
        catch(err){
            if(err.response.status === 500){
                console.log('There was a problem with server');
            } else{
                console.log(err.response.data.msg);
            }
        }
    };


    return (
        <form onSubmit={onSubmit}>
            <input type="file" name="file" onChange={onChange}/>
            <button>Upload</button>
        </form>
    );
};

export default Demo;
