import HeaderLogin from '../components/loginAndSing/header';
import '../Styles/pages/loginPage.css'
import FormLogin from '../components/loginAndSing/formLogin';



function LoginPage() {
    return (
        <>
            <HeaderLogin Title='Bem-vindo de volta!' />
            <FormLogin/>
            
        </>
    )
}



export default LoginPage;