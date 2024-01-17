import Fixtures from "./screens/Fixtures";
import {useState} from "react";

import Form from "./screens/Form";
import React from "react";


function App() {

    const [formData, setFormData] = useState({responses: {}});
    const [isCompleted, setIsCompleted] = useState(false)

    if (isCompleted) {
        return <Form formData={formData}/>
    } else {
        return <Fixtures formData={formData} setFormData={setFormData} setIsCompleted={setIsCompleted}/>
    }
}

export default App;
