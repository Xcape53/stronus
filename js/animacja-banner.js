// animacja-banner.js
// Wersja finalna z poprawioną logiką bezpośredniego przejścia do Stanu 3.

window.addEventListener('load', () => {
  setTimeout(() => {
    try {
      console.log("INFO: Próba uruchomienia animacji banera...");
      runBannerAnimation();
    } catch (error) {
      console.error("KRYTYCZNY BŁĄD podczas uruchamiania animacji:", error);
    }
  }, 500);
});

function runBannerAnimation() {
  'use strict';
  
  const container = document.querySelector('.tf__banner_img');
  if (!container) {
    console.error("BŁĄD KRYTYCZNY: Nie znaleziono kontenera '.tf__banner_img'.");
    return;
  }
  const svgElement = container.querySelector("svg");
  if (!svgElement) {
    console.error("BŁĄD KRYTYCZNY: Nie znaleziono elementu <svg> wewnątrz '.tf__banner_img'.");
    return;
  }
  const svg = d3.select(svgElement);
  if (container.clientWidth === 0 || container.clientHeight === 0) {
    console.error("BŁĄD KRYTYCZNY: Wymiary kontenera to 0.");
    return;
  }
  console.log("SUCCESS: Kontener i SVG znalezione. Inicjalizacja D3.js...");

  const STAGE2_OFFSETS = [
    { x: -86.25, y: 31.5 }, { x: -148.5, y: -26.25 }, { x: -62.25, y: -57.75 },
    { x: -42.75, y: -141.75 }, { x: 84.75, y: -30.75 }, { x: 63, y: 56.25 }
  ];
  const STAGE3_OFFSETS = [
    { x: -86.25, y: 31.5 }, { x: -148.5, y: -26.25 }, { x: -128.25, y: -112.5 }, { x: -189, y: -168.75 }, { x: -211.5, y: -83.25 }, { x: -295.5, y: -51.75 }, { x: -252.75, y: -225.75 }, { x: -168, y: -256.5 }, { x: -104.25, y: -200.25 }, { x: -22.5, y: -231 }, { x: -84, y: -288.75 }, { x: -61.5, y: -369 }, { x: 63.75, y: -262.5 }, { x: 42.75, y: -174.75 }, { x: 105, y: -120 }, { x: 191.25, y: -147 }, { x: 128.25, y: -204.75 }, { x: 148.5, y: -291.75 }, { x: 273.75, y: -179.25 }, { x: 252.75, y: -92.25 }, { x: 168, y: -59.25 }, { x: 128.25, y: 112.5 }, { x: 209.25, y: 82.5 }, { x: 232.5, y: -3.75 }, { x: 294, y: 52.5 }, { x: 273, y: 136.5 }, { x: -62.25, y: -57.75 }, { x: -42.75, y: -141.75 }, { x: 84.75, y: -30.75 }, { x: 63, y: 56.25 }, { x: -22.5, y: 88.5 }, { x: -43.5, y: 174.75 }, { x: 39, y: 145.5 }, { x: 102, y: 201 }, { x: -66, y: 261.75 }, { x: -128.25, y: 205.5 }, { x: -99.75, y: 104.25 }, { x: -233.25, y: 6.75 }, { x: -254.25, y: 92.25 }, { x: -192.75, y: 149.25 }, { x: -276, y: 179.25 }, { x: -338.25, y: 123 }
  ];
  let nodes = [{ id: "A", main: true, label: "0", stage: 1 },{ id: "S1_node_1", label: "1", stage: 1 }];
  let links = [{ source: "A", target: "S1_node_1" }];
  const defs = svg.append("defs");
  const gradient = defs.append("linearGradient").attr("id", "line-gradient").attr("gradientUnits", "userSpaceOnUse");
  gradient.append("stop").attr("offset", "0%").attr("stop-color", "#2c7ffe");
  gradient.append("stop").attr("offset", "100%").attr("stop-color", "#642efd");
  let width, height;
  function updateDimensions() {
    const rect = container.getBoundingClientRect();
    width = rect.width; height = rect.height;
    gradient.attr("x1", 0).attr("y1", 0).attr("x2", width).attr("y2", height);
  }
  updateDimensions();
  nodes.forEach(node => { node.fy = height / 2; });
  function forceRelativePosition(strength = 0.1) {
    let localNodes;
    function force(alpha) {
      if (!extrasAdded || !localNodes) return;
      const mainNode = localNodes.find(d => d.main);
      if (!mainNode) return;
      for (const node of localNodes) {
        if (node.main || !node.targetOffset) continue;
        const targetX = mainNode.x + node.targetOffset.x;
        const targetY = mainNode.y + node.targetOffset.y;
        node.vx += (targetX - node.x) * strength * alpha;
        node.vy += (targetY - node.y) * strength * alpha;
      }
    }
    force.initialize = function(_nodes) { localNodes = _nodes; };
    return force;
  }
  const simulation = d3.forceSimulation(nodes).force("link", d3.forceLink(links).id(d => d.id).distance(22.5).strength(0.5)).force("charge", d3.forceManyBody().strength(-40)).force("center", d3.forceCenter(width / 2, height / 2)).force("relative", forceRelativePosition(1.0)).force("x", d3.forceX(width / 2).strength(0.02)).force("y", d3.forceY(height / 2).strength(0.02)).velocityDecay(0.6).alphaDecay(0.02).alphaTarget(0.2);
  const linkG = svg.append("g").attr("stroke-linecap", "round");
  const nodeG = svg.append("g");
  let linkSel = linkG.selectAll("line");
  let nodeSel = nodeG.selectAll("g.node-group");
  const initialDistance = 75;
  nodes[0].x = width / 2 - initialDistance;
  nodes[1].x = width / 2 + initialDistance;
  const jitterStrength = 0.16, fleeRadius = 600, maxFleeForce = 8;
  let mouse = { x: null, y: null };
  svg.on("mousemove", (event) => { const pt = d3.pointer(event); mouse.x = pt[0]; mouse.y = pt[1]; }).on("mouseleave", () => { mouse.x = null, mouse.y = null; });
  simulation.on("tick", () => {
    nodes.forEach(d => {
      d.vx += (Math.random() - 0.5) * jitterStrength;
      if (extrasAdded) { d.vy += (Math.random() - 0.5) * jitterStrength; }
    });
    if (mouse.x !== null && mouse.y !== null) {
      nodes.forEach(d => {
        const dx = d.x - mouse.x, dy = d.y - mouse.y;
        let dist = Math.hypot(dx, dy) || 1e-6;
        if (dist < fleeRadius) {
          const strength = ((fleeRadius - dist) / fleeRadius) * maxFleeForce;
          d.vx += (dx / dist) * strength; d.vy += (dy / dist) * strength;
        }
      });
    }
    linkSel.attr("x1", d => d.source.x).attr("y1", d => d.source.y).attr("x2", d => d.target.x).attr("y2", d => d.target.y);
    nodeSel.attr("transform", d => `translate(${d.x}, ${d.y})`);
  });
  let extrasAdded = false, stage3Added = false, isAnimating = false;
  function idOf(nodeOrStr) { return (typeof nodeOrStr === 'string') ? nodeOrStr : nodeOrStr.id; }
  
  function checkNodePositionAndSwitchState() {
    if (isAnimating) return;
    const viewportHeight = window.innerHeight;
    const rect = svg.node().getBoundingClientRect();
    const nodeY = rect.top + (rect.height / 2);
    const zone1_end = viewportHeight / 6;
    const zone2_end = viewportHeight / 3;
    const zone3_end = 2 * viewportHeight / 3;
    const zone4_end = 5 * viewportHeight / 6;
    let targetStage;
    if (nodeY > 0 && nodeY < zone1_end) { targetStage = 1; } 
    else if (nodeY >= zone1_end && nodeY < zone2_end) { targetStage = 2; } 
    else if (nodeY >= zone2_end && nodeY < zone3_end) { targetStage = 3; } 
    else if (nodeY >= zone3_end && nodeY < zone4_end) { targetStage = 2; } 
    else if (nodeY >= zone4_end && nodeY <= viewportHeight) { targetStage = 1; } 
    else { targetStage = 1; }
    let currentStage = 1;
    if (stage3Added) { currentStage = 3; } else if (extrasAdded) { currentStage = 2; }
    if (targetStage === currentStage) return;

    // === POCZĄTEK KLUCZOWEJ ZMIANY ===
    // Dodano logikę do obsługi bezpośredniego przejścia ze Stanu 1 do 3
    if (targetStage === 3 && currentStage === 1) {
        addExtraNodesWithLinks(); // Najpierw dodajemy stan 2
        setTimeout(() => {
            addStage3Nodes(); // A zaraz potem dodajemy stan 3
        }, 450); // Czekamy na zakończenie poprzedniej animacji
    } 
    // === KONIEC KLUCZOWEJ ZMIANY ===
    else if (targetStage === 2 && currentStage === 1) { addExtraNodesWithLinks(); }
    else if (targetStage === 1 && currentStage === 2) { removeExtraNodesWithLinks(); }
    else if (targetStage === 3 && currentStage === 2) { addStage3Nodes(); }
    else if (targetStage === 2 && currentStage === 3) { removeStage3Nodes(); }
    else if (targetStage === 1 && currentStage === 3) { removeStage3Nodes(true); }
  }
  
  function addExtraNodesWithLinks() {
    if (extrasAdded) return;
    isAnimating = true; extrasAdded = true;
    const nodeA = nodes.find(n => n.id === "A"), node1 = nodes.find(n => n.label === "1");
    if (!nodeA) { isAnimating = false; return; }
    const newNodes = Array.from({ length: 5 }, (_, i) => {
      const label = (i + 2).toString();
      const parentNode = (label === "2") ? node1 : nodeA;
      return { id: `S2_node_${label}_${Date.now()}`, extra: true, stage: 2, label: label, x: parentNode.x, y: parentNode.y, targetOffset: STAGE2_OFFSETS[i + 1] };
    });
    nodes.find(n => n.label === "1").targetOffset = STAGE2_OFFSETS[0];
    nodes.push(...newNodes);
    links = [{ source: idOfNodeWithLabel("2"), target: idOfNodeWithLabel("1") }, { source: idOfNodeWithLabel("1"), target: idOfNodeWithLabel("0") }, { source: idOfNodeWithLabel("0"), target: idOfNodeWithLabel("3") }, { source: idOfNodeWithLabel("3"), target: idOfNodeWithLabel("4") }, { source: idOfNodeWithLabel("4"), target: idOfNodeWithLabel("5") }, { source: idOfNodeWithLabel("5"), target: idOfNodeWithLabel("6") }];
    simulation.nodes(nodes).force("link").links(links);
    simulation.force("relative").initialize(nodes);
    restartLinkSelection(); restartNodeSelection();
    const mainNode = nodes.find(n => n.main);
    if (mainNode) { mainNode.fx = width / 2; mainNode.fy = height / 2; }
    nodes.forEach(n => n.fy = null);
    simulation.alpha(0.7).restart();
    setTimeout(() => { isAnimating = false; }, 400);
  }
  function removeExtraNodesWithLinks() {
    if (!extrasAdded || stage3Added) return;
    isAnimating = true; extrasAdded = false;
    nodes = nodes.filter(d => d.stage < 2);
    links = [{ source: "A", target: idOfNodeWithLabel("1") }];
    nodes.forEach(n => n.targetOffset = null);
    const mainNode = nodes.find(n => n.main);
    if (mainNode) { mainNode.fx = null; }
    nodes.forEach(node => { node.fy = height / 2; });
    simulation.nodes(nodes).force("link").links(links);
    simulation.force("relative").initialize(nodes);
    restartLinkSelection(); restartNodeSelection();
    simulation.alpha(0.7).restart();
    isAnimating = false;
  }
  function addStage3Nodes() {
    if (stage3Added || !extrasAdded) return;
    isAnimating = true; stage3Added = true;
    const parentMap = { "1": "0" };
    for (let i = 1; i < 26; i++) { parentMap[(i + 1).toString()] = i.toString(); }
    parentMap["27"] = "0";
    for (let i = 27; i < 32; i++) { parentMap[(i + 1).toString()] = i.toString(); }
    parentMap["33"] = "32";
    for (let i = 33; i < 42; i++) { parentMap[(i + 1).toString()] = i.toString(); }
    const mainChainNodesToAdd = [], otherChainNodesToAdd = [];
    for (let i = 7; i <= 26; i++) { mainChainNodesToAdd.push(i.toString()); }
    for (let i = 27; i <= 42; i++) { otherChainNodesToAdd.push(i.toString()); }
    const animationSequence = [];
    const maxLength = Math.max(mainChainNodesToAdd.length, otherChainNodesToAdd.length);
    for (let i = 0; i < maxLength; i++) {
      if (mainChainNodesToAdd[i]) animationSequence.push(mainChainNodesToAdd[i]);
      if (otherChainNodesToAdd[i]) animationSequence.push(otherChainNodesToAdd[i]);
    }
    links = [];
    const existingNodes = nodes.filter(n => parseInt(n.label) > 0 && parseInt(n.label) <= 6);
    existingNodes.forEach(node => {
      const parentLabel = parentMap[node.label];
      const parentNode = nodes.find(n => n.label === parentLabel);
      if (parentNode) { links.push({ source: node.id, target: parentNode.id }); }
      node.targetOffset = STAGE3_OFFSETS[parseInt(node.label) - 1];
    });
    animationSequence.forEach((label, index) => {
      setTimeout(() => {
        const offsetIndex = parseInt(label) - 1;
        const newNode = { id: `S3_node_${label}_${Date.now()}`, extra: true, stage: 3, label, targetOffset: STAGE3_OFFSETS[offsetIndex] };
        const parentNode = nodes.find(n => n.label === parentMap[newNode.label]);
        if (parentNode) {
          newNode.x = parentNode.x; newNode.y = parentNode.y;
          links.push({ source: newNode.id, target: parentNode.id });
        }
        nodes.push(newNode);
        simulation.nodes(nodes).force("link").links(links);
        restartLinkSelection(); restartNodeSelection();
        simulation.alpha(0.3).restart();
      }, index * 10);
    });
    setTimeout(() => { isAnimating = false; }, animationSequence.length * 10 + 400);
  }
  function removeStage3Nodes(transitionTo1 = false) {
    if (!stage3Added) return;
    isAnimating = true; stage3Added = false;
    const labelsToRemove = [];
    for (let i = 42; i >= 7; i--) { labelsToRemove.push(i.toString()); }
    labelsToRemove.forEach((label, index) => {
      setTimeout(() => {
        const nodeIdToRemove = idOfNodeWithLabel(label);
        if (!nodeIdToRemove) return;
        nodes = nodes.filter(n => n.id !== nodeIdToRemove);
        links = links.filter(l => l.source.id !== nodeIdToRemove && l.target.id !== nodeIdToRemove);
        simulation.nodes(nodes).force("link").links(links);
        restartLinkSelection(); restartNodeSelection();
        simulation.alpha(0.1).restart();
      }, index * 10);
    });
    const totalAnimationTime = labelsToRemove.length * 10;
    setTimeout(() => {
      if (transitionTo1) {
        isAnimating = false;
        removeExtraNodesWithLinks();
      } else {
        links = [{ source: idOfNodeWithLabel("2"), target: idOfNodeWithLabel("1") }, { source: idOfNodeWithLabel("1"), target: idOfNodeWithLabel("0") }, { source: idOfNodeWithLabel("0"), target: idOfNodeWithLabel("3") }, { source: idOfNodeWithLabel("3"), target: idOfNodeWithLabel("4") }, { source: idOfNodeWithLabel("4"), target: idOfNodeWithLabel("5") }, { source: idOfNodeWithLabel("5"), target: idOfNodeWithLabel("6") }];
        nodes.forEach(node => {
          if (node.label !== "0") node.targetOffset = STAGE2_OFFSETS[parseInt(node.label) - 1];
        });
        simulation.force("link").links(links);
        restartLinkSelection();
        isAnimating = false;
      }
    }, totalAnimationTime + 100);
  }
  function idOfNodeWithLabel(label) {
    const node = nodes.find(n => n.label === label.toString());
    return node ? node.id : null;
  }
  function restartNodeSelection() {
    nodeSel = nodeG.selectAll("g.node-group").data(nodes, d => d.id);
    nodeSel.exit().remove();
    const enter = nodeSel.enter().append("g").attr("class", "node-group").attr("transform", d => `translate(${d.x || width / 2}, ${d.y || height / 2})`);
    enter.append("circle").attr("r", d => d.main ? 9 : 6).attr("fill", "transparent");
    enter.append("text").text(d => d.label).attr("text-anchor", "middle").attr("dy", ".3em").attr("fill", "transparent").attr("font-size", "10px").style("pointer-events", "none");
    nodeSel = enter.merge(nodeSel);
    nodeSel.select("circle").attr("fill", "transparent").attr("r", d => d.main ? 6 : 6);
  }
  function restartLinkSelection() {
    linkSel = linkG.selectAll("line").data(links, d => idOf(d.source) + "→" + idOf(d.target));
    linkSel.exit().remove();
    const enter = linkSel.enter().append("line").attr("stroke", "url(#line-gradient)").attr("stroke-width", 12).attr("opacity", 1);
    linkSel = enter.merge(linkSel);
  }
  function throttle(fn, wait) {
    let last = 0;
    return function(...args) {
      const now = Date.now();
      if (now - last >= wait) { last = now; fn.apply(this, args); }
    };
  }
  const throttledCheck = throttle(checkNodePositionAndSwitchState, 80);
  window.addEventListener("scroll", throttledCheck, { passive: true });
  
  setInterval(checkNodePositionAndSwitchState, 100);

  window.addEventListener("resize", () => {
    updateDimensions();
    simulation.force("center", d3.forceCenter(width / 2, height / 2)).force("x", d3.forceX(width / 2).strength(0.02)).force("y", d3.forceY(height / 2).strength(0.02));
    if (extrasAdded) {
      const mainNode = nodes.find(n => n.main);
      if (mainNode) { mainNode.fx = width / 2; mainNode.fy = height / 2; }
    } else {
      nodes.forEach(node => { node.fy = height / 2; });
    }
    simulation.alpha(0.3).restart();
  });
  restartNodeSelection();
  restartLinkSelection();
  checkNodePositionAndSwitchState();
}