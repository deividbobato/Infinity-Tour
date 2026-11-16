document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("menu");
  const links = document.querySelectorAll(".nav__link");

  /* Sombra no header ao rolar */
  const onScroll = () =>
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Menu mobile */
  const setMenu = (open) => {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  };
  toggle.addEventListener("click", () =>
    setMenu(!menu.classList.contains("is-open")),
  );
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) setMenu(false);
  });

  /* Link ativo conforme a seção visível */
  const sections = [...links]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter((s) => s && !s.hidden);

  const setActive = (id) => {
    links.forEach((l) =>
      l.classList.toggle("is-active", l.getAttribute("href") === `#${id}`),
    );
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-40% 0px -55% 0px" },
  );

  sections.forEach((s) => observer.observe(s));

  /* Chegou no fim da página = Contato ativo */
  window.addEventListener(
    "scroll",
    () => {
      if (telaAtual !== "home") return;

      const fim =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 4;
      if (fim) setActive("contato");
    },
    { passive: true },
  );
});

const WHATSAPP = "554591376652";
const MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
const formatar = (d) =>
  `${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`;

const PASSEIOS = {
  cataratas: {
    nome: "Cataratas do Iguaçu",
    img: "imagem/cataratas.png",
    duracao: "3 horas",
    saidas: "08:00 | 11:00",
    desc: "Visite as Cataratas do Iguaçu, umas das 7 maravilhas naturais do muundo, localizada no Paque nacional do Iguaçu . Sinta a força e a magia das 275 quedas d’água impressionantes ao longo de uma passarela suspensa perfeita para contemplação e fotos.",
    inclui: [
      "Transporte premium em van executiva com ar-condicionado",
      "Guia credenciado pelo Ministerio do Turismo (Mtur)",
      "Ingressos oficial de entrada ao Parque Naciona incluido",
    ],
  },

  itaipu: {
    nome: "Usina de Itaipu",
    img: "imagem/itaipu.png",
    duracao: "2 horas",
    saidas: "09:00 | 14:00",
    desc: "Conheça a maior usina hidrelétrica em produção de energia limpa do planeta e descubra os bastidores de uma engenharia colossal.", // exemplo
    inclui: [
      "Transporte premium em van executiva com ar-condicionado",
      "Guia credenciado pelo Ministério do Turismo (MTur)",
      "Ingresso da visita panorâmica incluído",
    ],
  },

  marco: {
    nome: "Marcos das 3 Fronteiras",
    img: "imagem/marco.png",
    duracao: "3 horas",
    saidas: "17:00",
    desc: "O encontro de 3 países: Brasil, Argentina e Paraguai. Show cultural e pôr do sol inesquecível.", // exemplo
    inclui: [
      "Transporte premium em van executiva com ar-condicionado",
      "Guia credenciado pelo Ministério do Turismo (MTur)",
      "Ingresso do show cultural incluído",
    ],
  },

  aves: {
    nome: "Ṕarque das Aves",
    img: "imagem/images.jpeg",
    duracao: "2 horas",
    saidas: "09:00 | 13:00",
    desc: "Mais de 1.300 aves de 143 espécies da Mata Atlântica em viveiros de imersão espetaculares.", // exemplo
    inclui: [
      "Transporte premium em van executiva com ar-condicionado",
      "Guia credenciado pelo Ministério do Turismo (MTur)",
      "Ingresso oficial do parque incluído",
    ],
  },

  "dois-dias": {
    nome: "Foz em 2 dias",
    img: "imagem/cataratas.png",
    duracao: "2 dias",
    saidas: "08:00",
    desc: "Roteiro de 2 dias com os principais passeios de Foz do Iguaçu: Cataratas, Parque das Aves e Marco das 3 Fronteiras.",
    inclui: [
      "Cataratas do Iguaçu",
      "Parque das Aves",
      "Marco das 3 Fronteiras",
      "Transporte premium em van executiva com ar-condicionado",
      "Guia credenciado pelo Ministério do Turismo (MTur)",
    ],
  },

  "tres-dias": {
    nome: "Foz em 3 dias",
    img: "imagem/itaipu.png",
    duracao: "3 dias",
    saidas: "08:00",
    desc: "Roteiro de 3 dias com 5 passeios: Cataratas, Itaipu, Parque das Aves, Marco das 3 Fronteiras e almoço premium.",
    inclui: [
      "Cataratas do Iguaçu",
      "Usina de Itaipu",
      "Parque das Aves",
      "Marco das 3 Fronteiras",
      "Almoço Premium Porto Canoas",
      "Transporte premium em van executiva com ar-condicionado",
      "Guia credenciado pelo Ministério do Turismo (MTur)",
    ],
  },

  completo: {
    nome: "Experiência Completa",
    img: "imagem/turismo.png",
    duracao: "4 dias",
    saidas: "08:00",
    desc: "A experiência mais completa de Foz do Iguaçu, com 7 passeios, incluindo o lado argentino, safari de barco e voo de helicóptero.",
    inclui: [
      "Cataratas Brasil & Argentina",
      "Macuco Safari de Barco",
      "Voo de Helicóptero",
      "Itaipu Especial",
      "Parque das Aves",
      "Marco Premium",
      "Jantar Temático Show",
      "Guia credenciado pelo Ministério do Turismo (MTur)",
    ],
  },
};

const telas = {
  home: document.getElementById("home"),
  detalhe: document.getElementById("view-detalhe"),
  agendar: document.getElementById("view-agendar"),
  resumo: document.getElementById("view-resumo"),
  sucesso: document.getElementById("view-sucesso"),
};

let telaAtual = "home";

const mostrarTela = (nome) => {
  telaAtual = nome;
  Object.entries(telas).forEach(([n, el]) => (el.hidden = n !== nome));
};
const irParaTopo = () => window.scrollTo({ top: 0, behavior: "instant" });

document.addEventListener("click", (e) => {
  const alvo = e.target.closest("[data-goto]");
  if (!alvo) return;
  mostrarTela(alvo.dataset.goto);
  irParaTopo();
});

document.querySelectorAll('a[href^="#"]').forEach((a) =>
  a.addEventListener("click", () => {
    if (telaAtual !== "home") mostrarTela("home");
  }),
);

const estado = {
  passeio: null,
  inicio: null,
  saida: null,
  pessoas: 2,
};

document
  .querySelectorAll("[data-passeio]")
  .forEach((btn) =>
    btn.addEventListener("click", () => abrirDetalhe(btn.dataset.passeio)),
  );

function abrirDetalhe(id) {
  const p = PASSEIOS[id];
  estado.passeio = id;
  document.getElementById("det-breadcrumb").textContent = p.nome;
  document.getElementById("det-nome").textContent = p.nome;
  document.getElementById("det-desc").textContent = p.desc;
  document.getElementById("det-duracao").textContent = p.duracao;
  document.getElementById("det-saidas").textContent = p.saidas;
  document.getElementById("det-inclusos").innerHTML = p.inclui
    .map((i) => `<li>${i}</li>`)
    .join("");
  const img = document.getElementById("det-img");
  img.src = p.img;
  img.alt = p.nome;
  mostrarTela("detalhe");
  irParaTopo();
}

document.getElementById("btn-selecionar").addEventListener("click", () => {
  mostrarTela("agendar");
  irParaTopo();
});

function criarCalendario(raiz, aoEscolher) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  let ano = hoje.getFullYear();
  let mes = hoje.getMonth();
  let minimo = hoje;
  let selecionada = null;

  raiz.innerHTML = `
      <div class="cal__topo">
        <strong class="cal__titulo"></strong>
          <div class="cal__setas">
            <button type="button" class="cal__nav" data-dir="-1" aria-label="Mês anterior">‹</button>
            <button type="button" class="cal__nav" data-dir="1" aria-label="Próximo mês">›</button>
          </div>
      </div>
      <div class="cal__grade"></div>`;

  const titulo = raiz.querySelector(".cal__titulo");
  const grade = raiz.querySelector(".cal__grade");

  function desenhar() {
    titulo.textContent = `${MESES[mes]} ${ano}`;
    grade.innerHTML = ["D", "S", "T", "Q", "Q", "S", "S"]

      .map((d) => ` <span class="cal__dow">${d}</span>`)
      .join("");

    const vazios = new Date(ano, mes, 1).getDay();
    const total = new Date(ano, mes + 1, 0).getDate();

    for (let i = 0; i < vazios; i++)
      grade.appendChild(document.createElement("span"));
    for (let dia = 1; dia <= total; dia++) {
      const data = new Date(ano, mes, dia);
      const b = document.createElement("button");

      b.type = "button";
      b.className = "cal__dia";
      b.textContent = dia;

      if (data < minimo) b.disabled = true;

      if (selecionada && data.getTime() === selecionada.getTime())
        b.classList.add("is-selected");
      b.addEventListener("click", () => {
        selecionada = data;
        aoEscolher(data);
        desenhar();
      });
      grade.appendChild(b);
    }
  }
  raiz.querySelectorAll(".cal__nav").forEach((b) =>
    b.addEventListener("click", () => {
      mes += Number(b.dataset.dir);
      if (mes < 0) {
        mes = 11;
        ano--;
      }
      if (mes > 11) {
        mes = 0;
        ano++;
      }
      desenhar();
    }),
  );
  desenhar();
  return {
    definirMinimo(d) {
      minimo = d;
      if (selecionada && selecionada < d) selecionada = null;
      desenhar();
    },
    limpar() {
      selecionada = null;
      minimo = hoje;
      desenhar();
    },
  };
}

const txtInicio = document.getElementById("txt-inicio");
const txtSaida = document.getElementById("txt-saida");
const VAZIO = "selecione a data";

const calInicio = criarCalendario(
  document.getElementById("cal-inicio"),
  (d) => {
    estado.inicio = d;
    txtInicio.textContent = formatar(d);
    if (estado.saida && estado.saida < d) {
      estado.saida = null;
      txtSaida.textContent = VAZIO;
    }
    calSaida.definirMinimo(d);
  },
);

const calSaida = criarCalendario(document.getElementById("cal-saida"), (d) => {
  estado.saida = d;
  txtSaida.textContent = formatar(d);
});

const qtd = document.getElementById("qtd");
const ajustar = (n) => {
  estado.pessoas = Math.min(15, Math.max(2, estado.pessoas + n));
  qtd.textContent = estado.pessoas;
};

document
  .getElementById("btn-menos")
  .addEventListener("click", () => ajustar(-1));
document.getElementById("btn-mais").addEventListener("click", () => ajustar(1));

const erro = document.getElementById("agenda-erro");
document.getElementById("btn-resumo").addEventListener("click", () => {
  if (!estado.inicio || !estado.saida) {
    erro.textContent = "selecione a data de inicio e a data de saida.";
    erro.hidden = false;
    return;
  }
  erro.hidden = true;

  const p = PASSEIOS[estado.passeio];
  document.getElementById("res-img").src = p.img;
  document.getElementById("res-img").alt = p.nome;
  document.getElementById("res-passeio").textContent = p.nome;
  document.getElementById("res-duracao").textContent = p.duracao;
  document.getElementById("res-inicio").textContent = formatar(estado.inicio);
  document.getElementById("res-saida").textContent = formatar(estado.saida);
  document.getElementById("res-pessoas").textContent =
    `${estado.pessoas} Passageiros`;
  mostrarTela("resumo");
  irParaTopo();
});

document.getElementById("btn-confirmar").addEventListener("click", () => {
  const p = PASSEIOS[estado.passeio];
  const msg =
    `Olá! Gostaria de solicitar um passeio:\n` +
    `Passeio: ${p.nome}\n` +
    `Duração: ${p.duracao}\n` +
    `Início: ${formatar(estado.inicio)}\n` +
    `Saída: ${formatar(estado.saida)}\n` +
    `Passageiros: ${estado.pessoas}`;
  window.open(
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`,
    "_blank",
    "noopener",
  );

  estado.passeio = estado.inicio = estado.saida = null;
  estado.pessoas = 2;
  qtd.textContent = 2;
  txtInicio.textContent = txtSaida.textContent = VAZIO;
  calInicio.limpar();
  calSaida.limpar();

  mostrarTela("sucesso");
  irParaTopo();
});
