import { useCallback, useState } from "react";
import { IconBell, IconPlus } from "../icons/icons"
import { INITIAL_POSTS, INITIAL_TOPICS, LOGGED_USER, POPULAR_CONTENT, popularIcons } from "../mockDatas/homeMock";
import type { Post, Topic } from "../interfaces/interface";
import { CreatePostModal } from "../createPost/CreatePostModel";

export function RightBar() {

    const [topics, setTopics] = useState<Topic[]>(INITIAL_TOPICS);
    const [showModal, setShowModal] = useState(false);
    const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);

    const handleFollowTopic = useCallback((id: number) => {
        setTopics((prev) =>
            prev.map((t) => (t.id === id ? { ...t, following: !t.following } : t))
        );
    }, []);

    const handlePublish = useCallback((partial: Partial<Post>) => {
        const newPost: Post = {
            id: Date.now(),
            type: partial.type ?? "RESUMO",
            title: partial.title ?? "",
            description: partial.description ?? "",
            author: LOGGED_USER.name,
            username: LOGGED_USER.username,
            avatarInitials: LOGGED_USER.initials,
            avatarColor: "#5b5cf6",
            timeAgo: "agora mesmo",
            tags: partial.tags ?? [],
            likes: 0,
            comments: 0,
            bookmarked: false,
            liked: false,
            thumbnailType: "default",
        };
        setPosts((prev) => [newPost, ...prev]);
    }, []);


    return (
        <>
            <aside id="hp_right_panel">

                <div id="hp_topbar_right">
                    <button id="hp_notif_btn" aria-label="Notificações">
                        <IconBell />
                        <span id="hp_notif_badge">3</span>
                    </button>
                    <button
                        id="hp_create_post_btn"
                        onClick={() => setShowModal(true)}
                    >
                        <span>+ Novo Post</span>
                    </button>
                </div>


                {/* Topics */}
                <div className="hp_panel_card">
                    <h3 className="hp_panel_title">Tópicos em alta</h3>
                    <ul id="hp_topics_list">
                        {topics.map((topic) => (
                            <li key={topic.id} className="hp_topic_item">
                                <span className="hp_topic_hash">#</span>
                                <span className="hp_topic_name">{topic.name}</span>
                                <span className="hp_topic_count">{topic.postCount}</span>
                                <button
                                    className={`hp_follow_topic_btn ${topic.following ? "hp_following" : ""}`}
                                    onClick={() => handleFollowTopic(topic.id)}
                                    aria-label={topic.following ? `Deixar de seguir ${topic.name}` : `Seguir ${topic.name}`}
                                >
                                    {topic.following ? "✓" : <IconPlus />}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button className="hp_panel_see_all">Ver todos</button>
                </div>

                {/* Popular content */}
                <div className="hp_panel_card">
                    <h3 className="hp_panel_title">Conteúdos populares hoje</h3>
                    <ul id="hp_popular_list">
                        {POPULAR_CONTENT.map((item) => (
                            <li key={item.id} className="hp_popular_item">
                                <span
                                    className="hp_popular_icon"
                                    style={{ background: item.iconBg }}
                                >
                                    {popularIcons[item.icon]}
                                </span>
                                <div className="hp_popular_info">
                                    <span className="hp_popular_title">{item.title}</span>
                                    <span className="hp_popular_sub">{item.subtitle}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button className="hp_panel_see_all">Ver todos</button>
                </div>
            </aside>

            {showModal && (
                <CreatePostModal
                    onClose={() => setShowModal(false)}
                    onPublish={handlePublish}
                />
            )}
        </>)
}