
import {
    useState,
    useRef,
    useEffect,
    useCallback,
    useMemo,
} from "react";
import "./styles.css";
import { LeftBar } from "../home/components/leftBar/LeftBar";
import { useParams } from "react-router-dom";

interface Reaction {
    emoji: string;
    count: number;
    active: boolean;
}

interface User {
    id: string;
    name: string;
    username: string;
    avatar: string;
    online?: boolean;
}

interface Message {
    id: string;
    author: User;
    time: string;
    text: string;
    reactions: Reaction[];
}

interface Channel {
    id: string;
    name: string;
    description: string;
    members: number;
    messages: Message[];
}

// interface DirectMessage {
//     id: string;
//     user: User;
//     messages: Message[];
// }

// interface Room {
//     id: string;
//     name: string;
//     members: number;
// }

const ct_loggedUser: User = {
    id: "1",
    name: "Lucas Mendes",
    username: "@lucasmendes",
    avatar: "LM",
};

const ct_users: User[] = [
    {
        id: "1",
        name: "Lucas Mendes",
        username: "@lucas",
        avatar: "LM",
        online: true,
    },
    {
        id: "2",
        name: "Mariana Costa",
        username: "@mariana",
        avatar: "MC",
        online: true,
    },
    {
        id: "3",
        name: "Rafael Alves",
        username: "@rafael",
        avatar: "RA",
        online: true,
    },
    {
        id: "4",
        name: "Juliana P.",
        username: "@juliana",
        avatar: "JP",
        online: true,
    },
    {
        id: "5",
        name: "Felipe Souza",
        username: "@felipe",
        avatar: "FS",
        online: true,
    },
    {
        id: "6",
        name: "Beatriz Lima",
        username: "@bia",
        avatar: "BL",
        online: false,
    },
    {
        id: "7",
        name: "Gustavo H.",
        username: "@gustavo",
        avatar: "GH",
        online: false,
    },
];

const ct_createMessages = (): Message[] => [
    {
        id: "m1",
        author: ct_users[0],
        time: "09:12",
        text: "Bom dia, pessoal! 👋 Alguém tem uma dica de como manter a consistência nos estudos nos finais de semana?",
        reactions: [
            {
                emoji: "💜",
                count: 12,
                active: false,
            },
        ],
    },
    {
        id: "m2",
        author: ct_users[1],
        time: "09:15",
        text: "Eu costumo definir metas menores e recompensar quando cumpro.",
        reactions: [
            {
                emoji: "👍",
                count: 8,
                active: false,
            },
        ],
    },
    {
        id: "m3",
        author: ct_users[2],
        time: "09:18",
        text: "Usar Pomodoro ajuda bastante. Mesmo no fim de semana faz diferença.",
        reactions: [
            {
                emoji: "👏",
                count: 6,
                active: false,
            },
        ],
    },
    {
        id: "m4",
        author: ct_users[3],
        time: "09:21",
        text: "Organizar o ambiente de estudo também melhora muito a concentração.",
        reactions: [
            {
                emoji: "❤️",
                count: 5,
                active: false,
            },
        ],
    },
    {
        id: "m5",
        author: ct_users[4],
        time: "09:30",
        text: "Estou tentando criar uma rotina de programação todos os dias.",
        reactions: [],
    },
    {
        id: "m6",
        author: ct_users[5],
        time: "09:34",
        text: "Alguém recomenda livros bons sobre produtividade?",
        reactions: [],
    },
    {
        id: "m7",
        author: ct_users[6],
        time: "09:40",
        text: "Tenho usado uma lista semanal de tarefas.",
        reactions: [],
    },
    {
        id: "m8",
        author: ct_users[1],
        time: "09:50",
        text: "Muito bom ver essa comunidade crescendo!",
        reactions: [],
    },
];

const ct_channels: Channel[] = [
    {
        id: "general",
        name: "geral",
        description: "Converse sobre qualquer assunto relacionado aos estudos.",
        members: 128,
        messages: ct_createMessages(),
    },
    ...[
        "sql",
        "python",
        "inglês",
        "estudos",
        "produtividade",
        "livros",
    ].map((name, index) => ({
        id: String(index + 2),
        name,
        description: "Discussões da comunidade.",
        members: 50,
        messages: ct_createMessages(),
    })),
];


export function ChatPage() {
    const [ct_activeChannel] = useState<Channel>(ct_channels[0]);
    const [ct_messages, setHpMessages] = useState<Message[]>(ct_activeChannel.messages);
    const [ct_input, setHpInput] = useState("");
    const [ct_search] = useState("");
    // const [ct_showModal, sethpShowModal] = useState(false);
    const [ct_typing, setHpTyping] = useState(false);
    const [ct_loading, setHpLoading] = useState(true);
    const ct_inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setTimeout(() => {
            setHpLoading(false);
        }, 900);
    }, []);

    useEffect(() => {
        setHpMessages(ct_activeChannel.messages);
    }, [ct_activeChannel]);

    const ct_filteredMessages = useMemo(() => {
        return ct_messages.filter((message) =>
            message.text
                .toLowerCase()
                .includes(ct_search.toLowerCase())
        );
    }, [ct_messages, ct_search]);

    const ct_sendMessage = useCallback(() => {
        if (!ct_input.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            author: ct_loggedUser,
            time: "Agora",
            text: ct_input,
            reactions: [],
        };

        setHpMessages((prev) => [
            ...prev,
            newMessage,
        ]);

        setHpInput("");
        setHpTyping(false);

    }, [ct_input]);

    // const ct_toggleReaction = (
    //     messageId: string
    // ) => {

    //     setHpMessages((messages) =>
    //         messages.map(message => {

    //             if (message.id !== messageId)
    //                 return message;


    //             return {
    //                 ...message,
    //                 reactions:
    //                     message.reactions.map(r => ({
    //                         ...r,
    //                         active: !r.active,
    //                         count:
    //                             r.active
    //                                 ? r.count - 1
    //                                 : r.count + 1
    //                     }))
    //             };

    //         })
    //     );

    // };

    const {name} = useParams<{name: string}>()

    return (
        <main id="ct_chat_layout">
            <LeftBar />
            <section id="ct_messages_area">
                <div className="ct_messages_container">
                    {ct_loading ?
                        <div className="ct_skeleton">
                            Carregando mensagens...
                        </div> :
                        ct_filteredMessages.length === 0 ?
                            <div>
                                Nenhuma mensagem encontrada
                            </div> :
                            ct_filteredMessages.map(message => (
                                <article key={message.id} className="ct_message_card">
                                    <span className="ct_avatar">
                                        {message.author.avatar}
                                    </span>
                                    <div className="ct_message_content">
                                        <div className="ct_message_header">
                                            <strong>{message.author.name}</strong>
                                        </div>
                                        <div className="ct_message_text">
                                            <p>{message.text} </p><small>{message.time}</small>
                                        </div>
                                    </div>
                                </article>
                            ))}
                </div>

                <div className="ct_typing">
                    {ct_typing && `${name} está digitando`}
                </div>
                <footer id="ct_chat_input">
                    <input ref={ct_inputRef}
                        value={ct_input}
                        placeholder="Digite sua mensagem..."
                        onChange={(e) => {
                            setHpInput(e.target.value);
                            setHpTyping(true);
                        }}

                        onKeyDown={(e) => {
                            if (e.key === "Enter")
                                ct_sendMessage();
                        }} />
                    <button onClick={ct_sendMessage} >
                        ➤
                    </button>
                </footer>
            </section>

            <aside id="ct_right_panel">
                {ct_users.map(user => (
                    <div className="ct_member_item" key={user.id}>
                        <span className="ct_avatar">
                            {user.avatar}
                        </span>
                        {user.name}
                        <i className={user.online? 'ct_member_online':'ct_member_offline'}/>
                    </div>
                ))}
            </aside>
        </main>
    );
}