import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Authorziation from './components/auth/Auth.components';
import Character from './components/character/Character.components';
import CharacterSettings from './components/character/components/CharacterSettings.components';
import Chat from './components/chat/Chat.components';
import Hud from './components/hud/Hud.components';
import Settings from './components/menu/UserMenu.components';
import Tablet from './components/tablet/Tablet';

import './assets/scss/index.scss';
import Collector from './components/job/Collector';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/hud' element={<Hud />} />
        <Route path='/auth' element={<Authorziation />} />
        <Route path='/character' element={<Character />} />
        <Route path='/characterSettings' element={<CharacterSettings />} />
        <Route path='/userMenu' element={<Settings />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/tablet' element={<Tablet />} />
        <Route path='/collectors' element={<Collector />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);