
import './styleHeader.css'

import minhaFoto from './assetsHeader/eu2.jpeg';
import logoGitHub from './assetsHeader/github-brands.svg';
import logoLinkedin from './assetsHeader/linkedin-brands.svg';
import logoCurriculo from './assetsHeader/file-lines-regular.svg';

import { Link } from 'react-router-dom'; // para poder redireiconar

export default function Header() {
    return (
        <header>
            <div className='header__container'>
                <h1 className="header__titulo">My Online Library (MOL)</h1>
                
                <ul className="header__lista">
                    <li className="header__item">
                        <img src={logoLinkedin} alt="GitHub" className="icone" />
                        <a className="link_social" href="https://www.linkedin.com/in/bernardomol/" target="_blank" rel="noopener noreferrer">Linkedin</a>
                    </li>
                    <li className="header__item">
                        <img src={logoGitHub} alt="GitHub" className="icone" />
                        <a className="link_social" href="https://github.com/BernardoMol/Portfolio" target="_blank" rel="noopener noreferrer">GitHub</a>
                    </li>
                    <li className="header__item">
                        <img src={logoCurriculo} alt="Curriculo" className="icone" />
                        {/* <a className="link_social" href="https://www.linkedin.com/in/bernardomol/">Currículo</a> */}
                        <Link className="link_social" to="/curriculo">Currículo</Link>
                    </li>
                </ul>
                
                {/* <img className="header_imagem_container" src={minhaFoto} alt="Eu Bernardo Mol" /> */}
                <div className="header__container__imagem">
                    <img src={minhaFoto} alt="Eu Bernardo Mol" className="header_imagem"/>
                </div>
            </div>
        </header>       
    )
}

// className="header_imagem_container"


{/* <img src="assetsHeader\eu.jpeg" alt="Eu Bernardo Mol" /> */}
