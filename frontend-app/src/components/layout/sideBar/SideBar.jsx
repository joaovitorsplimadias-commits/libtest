"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./App.module.css";
import { useRouter, usePathname } from "next/navigation";

const SideBar = () => {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const menus = [
    {
      id: "colecao",
      title: "Coleção",
      iconInactive: "/images/",
      iconActive: "/images/",
      submenus: [
        {
          id: "gerenciarLivros",
          title: "Gerenciar livros",
          route: "/gerenciar-livros"
        },
        {
          id: "catalogarLivros",
          title: "Catalogar livros",
          route: "/catalogar-livros"
        },
        {
          id: "circulacao",
          title: "Circulação de livros",
          route: "/circulacao"
        },
        {
          id: "historico",
          title: "Histórico de livros e reservas",
          route: "/historico"
        }
      ]
    },
    {
      id: "administracao",
      title: "Administração da equipe",
      iconInactive: "/images/",
      iconActive: "/images/",
      submenus: [
        {
          id: "gerenciarEquipe",
          title: "Gerenciar equipe",
          route: "/gerenciar-equipe"
        },
        {
          id: "dashboardEquipe",
          title: "Dashboard da equipe",
          route: "/dashboard-equipe"
        },
        {
          id: "dashboardVendas",
          title: "Dashboard de vendas e reservas",
          route: "/gerenciar-livros"
        },
      ]
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image
          src="/images/livro.svg"
          width={70}
          height={40}
          alt="Logo da libtest"
          priority
        />
      </div>

      <div
        className={styles.hamburger}
        onClick={() => setMobileOpen(true)}
      >
        ☰
      </div>

      {mobileOpen && (
        <div
          className={styles.overlay}
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.active : ""}`}>
        {menus.map((item) => (
          <div key={item.id} className={styles.mobileItem}>
            <div className={styles.mobileItemTitle}
              onClick={() => {
                if (item.route) {
                  router.push(item.route);
                  setMobileOpen(false);
                }
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                <Image
                  src={item.iconInactive}
                  width={20}
                  height={20}
                  alt={item.title}
                />
                <span>{item.title}</span>
              </div>
            </div>
            {item.submenus && (
              <div className={styles.mobileSubmenu}>
                {item.submenus.map((sub) => (
                  <div
                    key={sub.id}
                    className={styles.mobileSubItem}
                    onClick={() => {
                      router.push(sub.route);
                      setMobileOpen(false);
                    }}
                  >
                    {sub.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;