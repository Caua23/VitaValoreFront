import FormRegister from "../components/loginAndSing/formRegister";
import Header from "../components/loginAndSing/header";

function SignInPage(){
    return(
        <>
            <Header Title="Sua Primeira vez? Sinta se a vontade para se cadastrar!" />
            <FormRegister />    
        </> 
    )
}

export default SignInPage;