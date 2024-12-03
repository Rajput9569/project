import React, { useState, useEffect } from 'react';
import './App.css';

// Simulated API responses for dynamic forms
const apiResponses = {
    "User Information": {
        "fields": [
            { "name": "firstName", "type": "text", "label": "First Name", "required": true },
            { "name": "lastName", "type": "text", "label": "Last Name", "required": true },
            { "name": "age", "type": "number", "label": "Age", "required": false }
        ]
    },
    "Address Information": {
        "fields": [
            { "name": "street", "type": "text", "label": "Street", "required": true },
            { "name": "city", "type": "text", "label": "City", "required": true },
            { "name": "state", "type": "dropdown", "label": "State", "options": ["California", "Texas", "New York"], "required": true },
            { "name": "zipCode", "type": "text", "label": "Zip Code", "required": false }
        ]
    },
    "Payment Information": {
        "fields": [
            { "name": "cardNumber", "type": "text", "label": "Card Number", "required": true },
            { "name": "expiryDate", "type": "date", "label": "Expiry Date", "required": true },
            { "name": "cvv", "type": "password", "label": "CVV", "required": true },
            { "name": "cardholderName", "type": "text", "label": "Cardholder Name", "required": true }
        ]
    }
};

function App() {
    const [formType, setFormType] = useState("User Information");
    const [formData, setFormData] = useState({});
    const [validationErrors, setValidationErrors] = useState([]);
    const [progress, setProgress] = useState(0);

    // Handle form type change
    const handleFormTypeChange = (event) => {
        setFormType(event.target.value);
        setFormData({});
        setValidationErrors([]);
        setProgress(0);
    };

    // Handle form data change
    const handleInputChange = (name, value) => {
        setFormData((prev) => {
            const newFormData = {...prev, [name]: value };
            calculateProgress(newFormData);
            return newFormData;
        });
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // Validation
        const errors = [];
        const fields = apiResponses[formType] ? .fields;
        fields ? .forEach(field => {
            if (field.required && !formData[field.name]) {
                errors.push(`${field.label} is required.`);
            }
        });

        if (errors.length > 0) {
            setValidationErrors(errors);
        } else {
            setValidationErrors([]);
            alert('Form submitted successfully!');
            console.table(formData); // Here you can display the data in a tabular format or send to an API
        }
    };

    // Calculate progress
    const calculateProgress = (data) => {
        const fields = apiResponses[formType] ? .fields;
        const totalRequiredFields = fields ? .filter(field => field.required).length;
        const completedRequiredFields = fields ? .filter(field => field.required && data[field.name]).length;
        const progress = (completedRequiredFields / totalRequiredFields) * 100;
        setProgress(progress);
    };

    // Render form fields dynamically
    const renderFormFields = () => {
        const fields = apiResponses[formType] ? .fields;

        return fields ? .map(field => ( <
                    div key = { field.name }
                    className = "form-field" >
                    <
                    label > { field.label } < /label> {
                    field.type === 'dropdown' ? ( <
                        select name = { field.name }
                        value = { formData[field.name] || '' }
                        onChange = {
                            (e) => handleInputChange(field.name, e.target.value)
                        }
                        required = { field.required } >
                        <
                        option value = "" > Select { field.label } < /option> {
                        field.options.map((option, index) => ( <
                            option key = { index }
                            value = { option } > { option } <
                            /option>
                        ))
                    } <
                    /select>
                ): ( <
                    input type = { field.type }
                    name = { field.name }
                    value = { formData[field.name] || '' }
                    onChange = {
                        (e) => handleInputChange(field.name, e.target.value)
                    }
                    required = { field.required }
                    />
                )
            } {
                validationErrors.includes(`${field.label} is required.`) && ( <
                    p className = "error-text" > This field is required < /p>
                )
            } <
            /div>
    ));
};

return ( <
    div className = "App" >
    <
    header className = "App-header" >
    <
    h1 > Dynamic Form < /h1> <
    select value = { formType }
    onChange = { handleFormTypeChange } >
    <
    option value = "User Information" > User Information < /option> <
    option value = "Address Information" > Address Information < /option> <
    option value = "Payment Information" > Payment Information < /option> < /
    select > <
    /header>

    <
    form onSubmit = { handleSubmit } > { renderFormFields() }

    <
    div className = "form-footer" >
    <
    button type = "submit" > Submit < /button> < /
    div > <
    /form>

    <
    div className = "progress" >
    <
    progress value = { progress }
    max = "100" / >
    <
    span > { Math.round(progress) } % completed < /span> < /
    div > {
        validationErrors.length > 0 && ( <
            div className = "validation-errors" >
            <
            ul > {
                validationErrors.map((error, index) => ( <
                    li key = { index } > { error } < /li>
                ))
            } <
            /ul> < /
            div >
        )
    } <
    /div>
);
}

export default App;