import { useState } from "react";
import type { CreatePostModalProps } from "../interfaces/interface";
import { IconX } from "../icons/icons";

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ onClose, onPublish }) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [error, setError] = useState("");

    const handleTagKey = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const tag = tagInput.trim().replace(/^#/, "");
            if (tag && !tags.includes(`#${tag}`)) {
                setTags([...tags, `#${tag}`]);
            }
            setTagInput("");
        }
    };

    const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

    const handlePublish = () => {
        if (!title.trim()) { setError("O título é obrigatório."); return; }
        onPublish({ title, description: body, tags, type: "RESUMO" });
        onClose();
    };

    return (
        <div className="hp_modal_overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="hp_modal" role="dialog" aria-label="Criar novo post">
                <div className="hp_modal_header">
                    <h2>Criar Post</h2>
                    <button className="hp_modal_close" onClick={onClose} aria-label="Fechar modal">
                        <IconX />
                    </button>
                </div>
                <div className="hp_modal_body">
                    {error && <p className="hp_modal_error">{error}</p>}
                    <label className="hp_modal_label" htmlFor="hp_modal_title">Título <span className="hp_required">*</span></label>
                    <input
                        id="hp_modal_title"
                        className="hp_modal_input"
                        type="text"
                        placeholder="Dê um título ao seu post..."
                        value={title}
                        onChange={(e) => { setTitle(e.target.value); setError(""); }}
                    />
                    <label className="hp_modal_label" htmlFor="hp_modal_body">Conteúdo</label>
                    <textarea
                        id="hp_modal_body"
                        className="hp_modal_textarea"
                        placeholder="Escreva o conteúdo do seu post..."
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                    <label className="hp_modal_label">Tags</label>
                    <div className="hp_tags_input_wrap">
                        {tags.map((tag) => (
                            <span key={tag} className="hp_tag_chip">
                                {tag}
                                <button onClick={() => removeTag(tag)} aria-label={`Remover tag ${tag}`}><IconX /></button>
                            </span>
                        ))}
                        <input
                            className="hp_tags_input"
                            type="text"
                            placeholder="Digite e pressione Enter..."
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleTagKey}
                        />
                    </div>
                </div>
                <div className="hp_modal_footer">
                    <button className="hp_btn_secondary" onClick={onClose}>Cancelar</button>
                    <button className="hp_btn_primary" onClick={handlePublish}>Publicar</button>
                </div>
            </div>
        </div>
    );
};
