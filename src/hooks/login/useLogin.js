import { useState } from 'react';
import apiClient from '../../axios/apiClient'

export default function useLogin() {
    const [endpoint, setEndpoint] = useState();

    function login({email, senha, tipo}) {

        if (tipo === "medico") setEndpoint("/login/medico")
        else if (tipo === "paciente") setEndpoint("/login/paciente")

        try {
            if(tipo=="paciente") {
                apiClient.post(endpoint, {
                    email: email,
                    senha: senha
                } )
                    .then( response => {
                        console.log("Login bem sucedido: ", response.data);
                        const token = response.data.token;
                        localStorage.setItem("token", token)
                    })
                    .catch(error => {
                        if(error.response)
                            console.log("Error ao fazer login:", error.response.data.message)
                        else
                            console.log("Erro de rede ou outro: ", error.message)
                    })
        }
        }catch (error) {
            console.log(error);
        }
    }

    return login();
}