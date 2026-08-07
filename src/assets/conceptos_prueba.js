export const conceptosPrueba = [
  {
    id: 1,
    titulo: "Herencia",
    descripcion: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Mecanismo por el cual una clase puede " },
            { type: "text", text: "heredar", marks: [{ type: "bold" }] },
            { type: "text", text: " atributos y métodos de otra clase base, reutilizando su comportamiento." },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Promueve la " },
            { type: "text", text: "reutilización", marks: [{ type: "italic" }] },
            { type: "text", text: " y la organización jerárquica del código." },
          ],
        },
      ],
    },
    categoria: "POO",
    color: "#7b8fc0",
    autor: "juanpablo",
  },
  {
    id: 2,
    titulo: "Encapsulamiento",
    descripcion: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Principio que consiste en ocultar el estado interno de un objeto y exponer solo lo " },
            { type: "text", text: "necesario", marks: [{ type: "underline" }] },
            { type: "text", text: " mediante métodos públicos." },
          ],
        },
      ],
    },
    categoria: "POO",
    color: "#7b8fc0",
    autor: "maria",
  },
  {
    id: 3,
    titulo: "Polimorfismo",
    descripcion: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Capacidad de un objeto de tomar distintas " },
            { type: "text", text: "formas", marks: [{ type: "italic" }] },
            { type: "text", text: ", permitiendo que una misma operación se comporte de manera diferente según el tipo. El ejemplo clasico es el de padre e hijo" },
          ],
        },
      ],
    },
    categoria: "POO",
    color: "#7b8fc0",
  },
  {
    id: 4,
    titulo: "Protocolo TCP/IP",
    descripcion: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Conjunto de protocolos que define cómo se " },
            { type: "text", text: "transmiten", marks: [{ type: "bold" }] },
            { type: "text", text: " los datos a través de una red, organizados en capas de abstracción." },
          ],
        },
      ],
    },
    categoria: "Redes",
    color: "#8bbfa0",
    autor: "carlos",
  },
  {
    id: 5,
    titulo: "DNS",
    descripcion: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Sistema de nombres de dominio que traduce nombres " },
            { type: "text", text: "legibles", marks: [{ type: "underline" }] },
            { type: "text", text: " por humanos a direcciones IP utilizables por las máquinas." },
          ],
        },
      ],
    },
    categoria: "Redes",
    color: "#8bbfa0",
  },
  {
    id: 6,
    titulo: "Subred",
    descripcion: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "División lógica de una red IP que permite " },
            { type: "text", text: "segmentar", marks: [{ type: "bold" }] },
            { type: "text", text: " el tráfico y mejorar la seguridad y el rendimiento de la red." },
          ],
        },
      ],
    },
    categoria: "Redes",
    color: "#8bbfa0",
    autor: "lucia",
  },
  {
    id: 7,
    titulo: "Singleton",
    descripcion: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Patrón de diseño creacional que garantiza que una clase tenga una " },
            { type: "text", text: "única", marks: [{ type: "italic" }] },
            { type: "text", text: " instancia y proporcione un punto de acceso global a ella." },
          ],
        },
      ],
    },
    categoria: "Patrones",
    color: "#b89ac0",
    autor: "juanpablo",
  },
  {
    id: 8,
    titulo: "Observer",
    descripcion: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Patrón de diseño que define una dependencia " },
            { type: "text", text: "uno a muchos", marks: [{ type: "underline" }] },
            { type: "text", text: " entre objetos, de modo que al cambiar uno, los demás son notificados." },
          ],
        },
      ],
    },
    categoria: "Patrones",
    color: "#b89ac0",
  },
  {
    id: 9,
    titulo: "Factory Method",
    descripcion: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Patrón creacional que define una " },
            { type: "text", text: "interfaz", marks: [{ type: "bold" }] },
            { type: "text", text: " para crear objetos, dejando a las subclases decidir qué clase instanciar." },
          ],
        },
      ],
    },
    categoria: "Patrones",
    color: "#b89ac0",
    autor: "sofia",
  },
]
