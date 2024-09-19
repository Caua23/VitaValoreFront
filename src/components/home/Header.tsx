
import Logo from '../../assets/Logo.png';

function Header() {
    return (
        <header>
            <nav>
                <a href="/"><img src={Logo} alt="" /></a>
                <div className="menu">

                    <a href="/auth/register">
                        <button>
                            Sing In 
                        </button>
                    </a>

                    <a href="/auth/login">
                        <button>
                            Login

                        </button>
                    </a>
                </div>
            </nav>
        </header>
    );
}

export default Header;