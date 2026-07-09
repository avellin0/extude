import React, { useState, useRef, useEffect } from 'react';
import './Chat2.css';
import { LeftBar } from '../home/components/leftBar/LeftBar';

interface ctMessage {
  ctId: string;
  ctAuthorId: string;
  ctText: string;
  ctTime: string;
  ctDateGroup: string;
}



interface ctContact {
  ctId: string;
  ctName: string;
  ctInitials: string;
  ctStatus: 'online' | 'offline';
  ctStatusLabel: string;
}

interface ctGroups {
  ctId: string;
  ctName: string;
  ctInitials: string;
  ctStatus: 'online' | 'offline';
  ctStatusLabel: string;
}



const ctContacts: ctContact[] = [
  { ctId: 'lucas', ctName: 'Lucas Mendes', ctInitials: 'LM', ctStatus: 'online', ctStatusLabel: 'On-line' },
  { ctId: 'mariana', ctName: 'Mariana Costa', ctInitials: 'MC', ctStatus: 'online', ctStatusLabel: 'On-line' },
  { ctId: 'rafael', ctName: 'Rafael Alves', ctInitials: 'RA', ctStatus: 'online', ctStatusLabel: 'On-line' },
  { ctId: 'juliana', ctName: 'Juliana P.', ctInitials: 'JP', ctStatus: 'online', ctStatusLabel: 'On-line' },
  { ctId: 'felipe', ctName: 'Felipe Souza', ctInitials: 'FS', ctStatus: 'online', ctStatusLabel: 'On-line' },
  { ctId: 'beatriz', ctName: 'Beatriz Lima', ctInitials: 'BL', ctStatus: 'offline', ctStatusLabel: 'Offline' },
  { ctId: 'gustavo', ctName: 'Gustavo H.', ctInitials: 'GH', ctStatus: 'offline', ctStatusLabel: 'Offline' },
];

const ctGroups: ctGroups[] = [
  { ctId: 'Devs', ctName: 'Devs 2026', ctInitials: 'DV', ctStatus: 'online', ctStatusLabel: 'On-line' },
]

const ctInitialMessages: ctMessage[] = [
  { ctId: 'm1', ctAuthorId: 'beatriz', ctText: 'Alguém recomenda livros bons sobre produtividade?', ctTime: '22:34', ctDateGroup: 'Ontem' },
  { ctId: 'm2', ctAuthorId: 'mariana', ctText: 'Eu gostei muito do livro Habitos Atômicos!.', ctTime: '22:40', ctDateGroup: 'Ontem' },
  { ctId: 'm3', ctAuthorId: 'lucas', ctText: 'Bom dia, pessoal! 👋 Alguém tem uma dica de como manter a consistência nos estudos nos finais de semana?', ctTime: '09:12', ctDateGroup: 'Hoje' },
  { ctId: 'm2', ctAuthorId: 'mariana', ctText: 'Eu costumo definir metas menores e recompensar quando cumpro.', ctTime: '09:15', ctDateGroup: 'Hoje' },
  { ctId: 'm5', ctAuthorId: 'rafael', ctText: 'Usar Pomodoro ajuda bastante. Mesmo no fim de semana faz diferença.', ctTime: '09:18', ctDateGroup: 'Hoje' },
  { ctId: 'm6', ctAuthorId: 'juliana', ctText: 'Organizar o ambiente de estudo também melhora muito a concentração.', ctTime: '09:21', ctDateGroup: 'Hoje' },
  { ctId: 'm7', ctAuthorId: 'felipe', ctText: 'Estou tentando criar uma rotina de programação todos os dias.', ctTime: '09:30', ctDateGroup: 'Hoje' },
];


const ctPrivateChats: Record<string, ctMessage[]> = {
  beatriz: [
    {
      ctId: 'm1',
      ctAuthorId: 'beatriz',
      ctText: 'Oi Davi, pode me enviar aquele PDF?',
      ctTime: '13:27',
      ctDateGroup: 'Ontem',
    },
    {
      ctId: 'm2',
      ctAuthorId: 'me',
      ctText: 'Claro! Já vou te mandar.',
      ctTime: '13:29',
      ctDateGroup: 'Ontem',
    },
  ],

  lucas: [
    {
      ctId: 'm3',
      ctAuthorId: 'lucas',
      ctText: 'Tu não sabe da novidade!',
      ctTime: '13:27',
      ctDateGroup: 'Ontem',
    },
    {
      ctId: 'm4',
      ctAuthorId: 'lucas',
      ctText: 'Consegui passar naquela vaga!',
      ctTime: '13:28',
      ctDateGroup: 'Ontem',
    },
    {
      ctId: 'm5',
      ctAuthorId: 'me',
      ctText: 'Caraca, parabéns! Sabia que você ia conseguir.',
      ctTime: '13:30',
      ctDateGroup: 'Ontem',
    },
  ],

  rafael: [
    {
      ctId: 'm6',
      ctAuthorId: 'rafael',
      ctText: 'Valeu pela ajuda ontem! Deu tudo certo.',
      ctTime: '09:15',
      ctDateGroup: 'Hoje',
    },
    {
      ctId: 'm7',
      ctAuthorId: 'me',
      ctText: 'Boa! Fico feliz que tenha dado certo.',
      ctTime: '09:18',
      ctDateGroup: 'Hoje',
    },
  ],

  juliana: [
    {
      ctId: 'm8',
      ctAuthorId: 'juliana',
      ctText: 'Você vai participar da sessão de estudos hoje?',
      ctTime: '10:42',
      ctDateGroup: 'Hoje',
    },
    {
      ctId: 'm9',
      ctAuthorId: 'me',
      ctText: 'Vou sim, devo entrar depois do almoço.',
      ctTime: '10:45',
      ctDateGroup: 'Hoje',
    },
  ],

  felipe: [
    {
      ctId: 'm10',
      ctAuthorId: 'felipe',
      ctText: 'Terminei aquele desafio de Node.js que você comentou.',
      ctTime: '11:18',
      ctDateGroup: 'Hoje',
    },
    {
      ctId: 'm11',
      ctAuthorId: 'me',
      ctText: 'Boa! Depois me mostra como você resolveu.',
      ctTime: '11:21',
      ctDateGroup: 'Hoje',
    },
  ],

  mariana: [
    {
      ctId: 'm12',
      ctAuthorId: 'mariana',
      ctText: 'Acabei de enviar minhas anotações. Dá uma olhada depois.',
      ctTime: '12:05',
      ctDateGroup: 'Hoje',
    },
    {
      ctId: 'm13',
      ctAuthorId: 'me',
      ctText: 'Obrigado! Vou ler ainda hoje.',
      ctTime: '12:08',
      ctDateGroup: 'Hoje',
    },
  ],

  gustavo: [
    {
      ctId: 'm14',
      ctAuthorId: 'gustavo',
      ctText: 'Bora estudar depois do almoço?',
      ctTime: '12:31',
      ctDateGroup: 'Hoje',
    },
    {
      ctId: 'm15',
      ctAuthorId: 'me',
      ctText: 'Fechado! Me chama quando estiver online.',
      ctTime: '12:33',
      ctDateGroup: 'Hoje',
    },
  ],
};

const ctIconMap: Record<string, React.ReactNode> = {
  home: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5 12 3l9 6.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M9 21v-6h6v6" />
    </svg>
  ),
  play: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="m10 8 6 4-6 4Z" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    </svg>
  ),
  flag: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1Z" />
      <path d="M4 22V3" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  ),
  smile: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  ),
  send: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  ),
  chevron: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
};

export const Chat: React.FC = () => {
  const [ctActiveTab, setCtActiveTab] = useState<'pessoas' | 'grupos'>('grupos');
  const [ctSelectedGroupId, setctSelectedGroupId] = useState<string>('Devs');
  const [ctGropuMessages, setCtGroupMessages] = useState<ctMessage[]>(ctInitialMessages);


  const [ctDraft, setCtDraft] = useState<string>('');
  const ctScrollRef = useRef<HTMLDivElement>(null);

  const ctContactsById: Record<string, ctContact> = ctContacts.reduce((acc, c) => {
    acc[c.ctId] = c;
    return acc;
  }, {} as Record<string, ctContact>);

  const ctSelected =
    ctActiveTab === 'pessoas'
      ? ctContacts.find(c => c.ctId === ctSelectedGroupId)
      : ctGroups.find(g => g.ctId === ctSelectedGroupId);


  useEffect(() => {
    if (ctScrollRef.current) {
      ctScrollRef.current.scrollTop = ctScrollRef.current.scrollHeight;
    }
  }, [ctGropuMessages, ctSelectedGroupId]);

  const ctHandleSelectContact = (id: string): void => {
    setctSelectedGroupId(id);
  };

  const ctHandleSendMessage = (): void => {
    const ctTrimmed = ctDraft.trim();
    if (ctTrimmed.length === 0) return;
    const ctNow = new Date();
    const ctHours = ctNow.getHours().toString().padStart(2, '0');
    const ctMinutes = ctNow.getMinutes().toString().padStart(2, '0');
    const ctNewMessage: ctMessage = {
      ctId: `m${Date.now()}`,
      ctAuthorId: 'me',
      ctText: ctTrimmed,
      ctTime: `${ctHours}:${ctMinutes}`,
      ctDateGroup: 'Hoje',
    };
    setCtGroupMessages((prev) => [...prev, ctNewMessage]);
    setCtDraft('');
  };

  const ctHandleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      ctHandleSendMessage();
    }
  };

  const ctCurrentMessages =
  ctActiveTab === 'grupos'
    ? ctGropuMessages
    : ctPrivateChats[ctSelectedGroupId] ?? [];

  let ctLastDateGroup = '';

  return (
    <div className="ct-app">
      <div className='hp-layout'>
        <LeftBar />
      </div>

      <main className="ct-chat-panel">
        {ctSelected && (
          <>
            <header className="ct-chat-header">
              <>
                <div className="ct-avatar ct-avatar-md">
                  {ctSelected.ctInitials}
                </div>

                <div className="ct-chat-header-info">
                  <span className="ct-chat-header-name">
                    {ctSelected.ctName}
                  </span>

                  <span className="ct-chat-header-status">
                    {ctSelected.ctStatus === 'online' && (
                      <span className="ct-status-dot ct-status-dot-online" />
                    )}

                    {ctSelected.ctStatus === 'online'
                      ? 'Online agora'
                      : 'Offline'}
                  </span>
                </div>
              </>
            </header>

            <div className="ct-messages" ref={ctScrollRef}>
              {ctCurrentMessages.map((msg) => {
                const ctAuthor = msg.ctAuthorId === 'me'
                  ? { ctInitials: 'DA', ctName: 'Você' }
                  : ctContactsById[msg.ctAuthorId];

                const ctShowDivider = msg.ctDateGroup !== ctLastDateGroup;
                ctLastDateGroup = msg.ctDateGroup;
                const ctIsMe = msg.ctAuthorId === 'me';

                return (
                  <React.Fragment key={msg.ctId}>
                    {ctShowDivider && (
                      <div className="ct-date-divider">
                        <span className="ct-date-divider-label">{msg.ctDateGroup}</span>
                      </div>
                    )}
                    <div className={`ct-message-row${ctIsMe ? ' ct-message-row-me' : ''}`}>
                      <div className="ct-avatar ct-avatar-sm">{ctAuthor?.ctInitials}</div>
                      <div className="ct-message-content">
                        <div className="ct-message-meta">
                          <span className="ct-message-author">{ctAuthor?.ctName}</span>
                          <span className="ct-message-time">{msg.ctTime}</span>
                        </div>
                        <p className="ct-message-text">{msg.ctText}</p>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </>

        )}

        <div className="ct-composer">
          <input
            className="ct-composer-input"
            type="text"
            placeholder="Digite sua mensagem..."
            value={ctDraft}
            onChange={(e) => setCtDraft(e.target.value)}
            onKeyDown={ctHandleKeyDown}
          />
          <button className="ct-composer-emoji" type="button" aria-label="Emoji">
            {ctIconMap.smile}
          </button>
          <button
            className="ct-composer-send"
            type="button"
            onClick={ctHandleSendMessage}
            disabled={ctDraft.trim().length === 0}
            aria-label="Enviar mensagem"
          >
            {ctIconMap.send}
          </button>
        </div>
      </main>

      <aside className="ct-people-panel">
        <div className="ct-people-tabs">
          <button
            className={`ct-people-tab${ctActiveTab === 'pessoas' ? ' ct-people-tab-active' : ''}`}
            onClick={() => setCtActiveTab('pessoas')}
            type="button"
          >
            Pessoas
          </button>
          <button
            className={`ct-people-tab${ctActiveTab === 'grupos' ? ' ct-people-tab-active' : ''}`}
            onClick={() => setCtActiveTab('grupos')}
            type="button"
          >
            Grupos
          </button>
        </div>

        <div className="ct-people-list">
          {ctActiveTab === 'pessoas' ? (
            ctContacts.map((contact) => (
              <button
                key={contact.ctId}
                className={`ct-people-item${contact.ctId === ctSelectedGroupId ? ' ct-people-item-active' : ''}`}
                onClick={() => ctHandleSelectContact(contact.ctId)}
                type="button"
              >
                <div className="ct-avatar ct-avatar-md">{contact.ctInitials}</div>
                <div className="ct-people-item-info">
                  <span className="ct-people-item-name">{contact.ctName}</span>
                  <span className="ct-people-item-status">{contact.ctStatusLabel}</span>
                </div>
                <span className={`ct-status-dot${contact.ctStatus === 'online' ? ' ct-status-dot-online' : ' ct-status-dot-offline'}`} />
              </button>
            ))
          ) : (
            ctGroups.map((contact) => (
              <button
                key={contact.ctId}
                className={`ct-people-item${contact.ctId === ctSelectedGroupId ? ' ct-people-item-active' : ''}`}
                onClick={() => ctHandleSelectContact(contact.ctId)}
                type="button"
              >
                <div className="ct-avatar ct-avatar-md">{contact.ctInitials}</div>
                <div className="ct-people-item-info">
                  <span className="ct-people-item-name">{contact.ctName}</span>
                  <span className="ct-people-item-status">{contact.ctStatusLabel}</span>
                </div>
                <span className={`ct-status-dot${contact.ctStatus === 'online' ? ' ct-status-dot-online' : ' ct-status-dot-offline'}`} />
              </button>
            ))
          )}

        </div>


      </aside>
    </div>
  );
};

