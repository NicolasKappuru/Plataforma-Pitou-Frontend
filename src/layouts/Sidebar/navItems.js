export const navItems = [
  { id: 1, label: "Mi glosario",      path: "/glosario/propio",    icon: "book-2",       roles: ["administrador", "autor"] },
  { id: 2, label: "Obtener glosario", path: "/espera",     icon: "book-download", roles: ["lector"] },
  { id: 3, label: "Explorar",         path: "/glosario/explorar",  icon: "world",         roles: ["administrador", "autor", "lector"] },
  { id: 4, label: "Buscar",           path: "/glosario/busqueda",  icon: "search",        roles: ["administrador", "autor", "lector"] },
  { id: 5, label: "Usuarios",         path: "/usuarios",           icon: "users",         roles: ["administrador"] },
  { id: 6, label: "Solicitudes",      path: "/solicitudes",        icon: "mail",          roles: ["administrador"] },
  { id: 7, label: "Ajustes",          path: "/espera",                 icon: "settings",      roles: ["administrador", "autor", "lector"] },
];