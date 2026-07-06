import "./LeftBar.css";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LOGGED_USER, navSections } from "../mockDatas/homeMock";
import { IconChevron } from "../icons/icons";
import type { LeftBarProps } from "../interfaces/interface";





export function LeftBar({ sidebarOpen, setSidebarOpen }: LeftBarProps) {


    const [activeNav, setActiveNav] = useState("home");
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

    const { name, id } = useParams<{ name: string; id: string }>();
    const navigate = useNavigate();






    return (
        <>
            < aside id="hp_sidebar" className={sidebarOpen ? "hp_sidebar_open" : ""} >
                <div id="hp_sidebar_logo">
                    <a href="#" id="hp_logo" aria-label="Extude home">


                        <span id="hp_logo_icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <span id="hp_logo_text">Extude</span>
                    </a>
                </div>

                <nav id="hp_nav">
                    {navSections.map((section, si) => (
                        <div key={si} className="hp_nav_section">
                            {section.label && (
                                <span className="hp_nav_section_label">{section.label}</span>
                            )}
                            {section.items.map((item) => (
                                <button
                                    key={item.id}
                                    className={`hp_nav_item ${activeNav === item.id ? "hp_nav_active" : ""}`}
                                    onClick={() => { setActiveNav(item.id); setSidebarOpen?.(false); navigate(`/${item.id}/${name}/${id}`);}}
                                    aria-current={activeNav === item.id ? "page" : undefined}
                                >
                                    <span className="hp_nav_icon">{item.icon}</span>
                                    <span className="hp_nav_label">{item.label}</span>
                                </button>
                            ))}
                        </div>
                    ))}
                </nav>

                {/* User profile footer */}

                <div id="hp_sidebar_footer"  ref={userMenuRef}>
                    <button
                        id="hp_user_profile_btn"
                        onClick={() => setUserMenuOpen((v) => !v)}
                        aria-expanded={userMenuOpen}
                        aria-label="Menu do usuário"
                    >
                        <span className="hp_avatar hp_avatar_md" style={{ background: "#5b5cf6" }}>
                            {LOGGED_USER.initials}
                        </span>
                        <div id="hp_user_info">
                            <span id="hp_user_name">{LOGGED_USER.name}</span>
                            <span id="hp_user_handle">{LOGGED_USER.username}</span>
                        </div>
                        <span id="hp_user_chevron"><IconChevron /></span>
                    </button>
                    {userMenuOpen && (
                        <div id="hp_user_menu">
                            <button className="hp_dropdown_item">Perfil</button>
                            <button className="hp_dropdown_item">Configurações</button>
                            <button className="hp_dropdown_item hp_dropdown_danger" onClick={() => navigate("/page")}>Sair</button>
                        </div>
                    )}

                    
                </div>
            </aside >
        </>)
}