
import './App.css'
import Card from '../../Componentes/Card/Card'
import Header from '../../Componentes/Header/Header'
import { useState } from 'react'

import fotoTrecco from "../../Componentes/Card/assetsCard/Trecco.png";
import logoAngular from "../../Componentes/Card/assetsCard/angular.svg";
import logoNode from "../../Componentes/Card/assetsCard/nodedotjs.svg";

import fotoZoppy from "../../Componentes/Card/assetsCard/zoppy.jpeg";
import logoReact from "../../Componentes/Card/assetsCard/react.svg";
import logoDotNet from "../../Componentes/Card/assetsCard/dotnet.svg";

// import fotoDjango from "./Componentes/Card/assetsCard/django.jpg";
// import logoReact from "./Componentes/Card/assetsCard/react.svg";
import fotoDjango from "../../Componentes/Card/assetsCard/python.png";
import logoPthon from "../../Componentes/Card/assetsCard/python.svg";

import fotoLaravel from "../../Componentes/Card/assetsCard/laravel.jpg";
// import logoReact from "./Componentes/Card/assetsCard/react.svg";
import logoLaravel from "../../Componentes/Card/assetsCard/laravel.svg";

import fotoAlura from "../../Componentes/Card/assetsCard/alura.jpeg";

export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header/>
      <ul className="mural__cards">
        <li>
            <Card 
              linkProjeto = "https://trecco.vercel.app/"
              fotoProjeto = {fotoTrecco}
              textoProjeto = "Projeto anteriormente conhecido como reclamão, que virou um gerenciador de tarefas" 
              logoFront = {logoReact}
              logoBack = {logoDotNet}
            />
        </li>
        <li>
            <Card 
              linkProjeto = "youtube.com"
              fotoProjeto = {fotoZoppy}
              textoProjeto = "Projeto crud de pedidos de produtos." 
              logoFront = {logoAngular}
              logoBack = {logoNode}
            />
          </li>
          <li>
            <Card 
              linkProjeto = "youtube.com"
              fotoProjeto = {fotoDjango}
              textoProjeto = "Projeto anteriormente  coss, que virou um gerenciador de tarefas" 
              logoFront = {logoAngular}
              logoBack = {logoPthon}
            />
          </li>
          <li>
            <Card 
              linkProjeto = "youtube.com"
              fotoProjeto = {fotoLaravel}
              textoProjeto = "Projeto anteriormente conhecido como reclamão, que virou um gerenciador de tarefas" 
              logoFront = {logoAngular}
              logoBack = {logoLaravel}
            />
          </li>
          <li>
            <Card 
              linkProjeto = "/certificados"
              fotoProjeto = {fotoAlura}
              textoProjeto = "Projetos e Certificados da Alura. A maior escola de tecnologia do Brasil" 
              logoFront = {logoAngular}
              logoBack = {logoNode}
            />
          </li>
      </ul>
    </div>
  )
}


