import Logo from '../../assets/Logo.png';
import '../../Styles/pages/header.css'
interface Props {
    Title: string;
}

function HeaderLogin({ Title }: Props) {
    return (
        <header>
            <nav>
                <a href="/">
                    <img src={Logo} alt="Logo" />
                </a>
            </nav>
            <h1>{Title}</h1>
        </header>
    );
}

export default HeaderLogin;
