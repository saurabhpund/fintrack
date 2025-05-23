import axios from 'axios';
import React from 'react'

const useGetEmail = () => {
  const [email, setEmail] = React.useState("");

    const getEmail = async () => {
        const token = localStorage.getItem("authToken");
        axios.get("http://localhost:8000/getEmail", {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            setEmail(res.data.email);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    React.useEffect(() => {
        getEmail();
    }, []);

    return email;
}

export default useGetEmail