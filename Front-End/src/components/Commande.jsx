import { useState, useEffect } from "react";
/* import 'bootstrap/dist/css/bootstrap.min.css'; */

const TestCreate = () => {

    const [person, setPerson] = useState({});

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(person)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:8080/site/rfpersonnes', requestOptions);
    }

  
}
export default TestCreate;