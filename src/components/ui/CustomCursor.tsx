import { useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// CustomCursor
//
// Renderiza dois elementos sobrepostos na tela:
//   1. Um ponto pequeno (dot) — segue o mouse IMEDIATAMENTE.
//   2. Um anel (ring) — segue o mouse com DELAY via interpolação linear (lerp).
//
// O efeito de "lag" do anel é o que cria a sensação fluida e orgânica.
// ─────────────────────────────────────────────────────────────────────────────

const CustomCursor = () => {
  // useRef cria uma referência mutável para os elementos do DOM.
  // Usamos ref (e não state) porque precisamos ler/escrever os valores
  // frame a frame, e qualquer re-render causaria instabilidade na animação.
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;

    // Guarda de segurança: se por algum motivo os elementos não existirem, encerra.
    if (!dot || !ring) return;

    // ── Variáveis de posição ──────────────────────────────────────────────────

    // Posição REAL do mouse (atualizada pelo evento mousemove).
    let mouseX = -100; // começa fora da tela para não aparecer em (0,0)
    let mouseY = -100;

    // Posição ATUAL do anel (vai sendo interpolada a cada frame).
    // Também começa fora da tela para evitar um "salto" no primeiro frame.
    let ringX = -100;
    let ringY = -100;

    // ID do requestAnimationFrame, guardado para cancelar no cleanup.
    let animationId: number;

    // ── Lerp (Linear Interpolation) ───────────────────────────────────────────
    //
    // lerp(start, end, factor):
    //   Retorna um valor entre `start` e `end`, proporcional a `factor`.
    //   factor = 0   → retorna start (sem mover)
    //   factor = 1   → retorna end   (vai direto)
    //   factor = 0.1 → anda 10% do caminho restante por frame → cria o delay
    //
    // Com 60fps e factor=0.1, o anel nunca chega "de verdade" ao mouse,
    // mas a diferença se torna imperceptível após alguns frames — isso é
    // exatamente o que cria o efeito de "arrasto suave".
    const lerp = (start: number, end: number, factor: number): number =>
      start + (end - start) * factor;

    // ── Loop de animação ──────────────────────────────────────────────────────
    //
    // requestAnimationFrame chama a função `animate` antes de cada repintura
    // do browser (~60 vezes por segundo em telas 60Hz).
    // Isso é mais eficiente e preciso do que setInterval.
    const animate = () => {
      // O ponto segue o mouse INSTANTANEAMENTE.
      // Usamos transform (não top/left) pois é acelerado pela GPU.
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

      // O anel avança 10% do caminho que falta por frame → lag suave.
      ringX = lerp(ringX, mouseX, 0.1);
      ringY = lerp(ringY, mouseY, 0.1);
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

      // Agenda o próximo frame e guarda o ID para cancelamento.
      animationId = requestAnimationFrame(animate);
    };

    // pointer: fine = mouse de precisão (mouse, trackpad)
    // pointer: coarse = toque grosseiro (dedo em touchscreen)
    const isTouchDevice = !window.matchMedia("(pointer: fine)").matches;
    if (isTouchDevice) return; // encerra o useEffect inteiro sem fazer nada
    
    // Inicia o loop assim que o componente monta.
    animate();

    // ── Captura da posição do mouse ───────────────────────────────────────────
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // ── Visibilidade: some ao sair da janela, aparece ao entrar ───────────────
    const handleMouseLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    // ── Hover em elementos clicáveis ─────────────────────────────────────────
    //
    // Usamos event delegation: ouvimos o mouseover no `document` inteiro.
    // O método .closest() sobe na árvore DOM a partir do target do evento
    // e verifica se algum ancestral (ou o próprio elemento) bate no seletor.
    // Isso é mais performático do que adicionar listeners em cada elemento.
    const CLICKABLE = "a, button, [role='button'], input, label, select, textarea, [tabindex]:not([tabindex='-1'])";

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(CLICKABLE)) {
        // Adiciona classes CSS que ativam as transições de hover (ver index.css).
        ring.classList.add("cursor-ring--hover");
        dot.classList.add("cursor-dot--hover");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(CLICKABLE)) {
        ring.classList.remove("cursor-ring--hover");
        dot.classList.remove("cursor-dot--hover");
      }
    };

    // ── Registra todos os listeners ───────────────────────────────────────────
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    // ── Cleanup ───────────────────────────────────────────────────────────────
    //
    // A função retornada pelo useEffect é chamada quando o componente desmonta.
    // Sem isso, o requestAnimationFrame continuaria rodando em background
    // e os event listeners ficariam "pendurados" na memória (memory leak).
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []); // [] → roda apenas uma vez, no mount.

  // ── Markup ────────────────────────────────────────────────────────────────
  //
  // position: fixed → prende os elementos ao viewport (não rola com a página).
  // top/left: 0     → ponto de origem no canto superior esquerdo.
  // O translate(-50%, -50%) no JS centraliza cada elemento em relação ao cursor.
  // pointerEvents: none → o cursor não interfere com cliques na página.
  // willChange: transform → avisa o browser para preparar a camada GPU.
  return (
    <>
      {/* ── Ponto central ── */}
      <div
        ref={dotRef}
        className="cursor-dot"
        aria-hidden="true" // invisível para leitores de tela
      />

      {/* ── Anel com delay ── */}
      <div
        ref={ringRef}
        className="cursor-ring"
        aria-hidden="true"
      />
    </>
  );
};

export default CustomCursor;