const nodes = [
  { id: "Jordi" }, { id: "Client A" }, { id: "Client B" },
  { id: "Partner X" }, { id: "Product 1" }
];

const links = [
  { source: "Jordi", target: "Client A" },
  { source: "Jordi", target: "Client B" },
  { source: "Client A", target: "Product 1" },
  { source: "Client B", target: "Partner X" },
  { source: "Partner X", target: "Product 1" }
];

const width = 800, height = 400;

const svg = d3.select("#chart")
  .append("svg")
  .attr("viewBox", `0 0 ${width} ${height}`)
  .attr("preserveAspectRatio", "xMidYMid meet");

const link = svg.append("g")
  .attr("stroke", "#94a3b8")
  .attr("stroke-opacity", 0.8)
  .selectAll("line")
  .data(links)
  .join("line")
  .attr("stroke-width", 2);

const node = svg.append("g")
  .attr("stroke", "#fff")
  .attr("stroke-width", 1.5)
  .selectAll("circle")
  .data(nodes)
  .join("circle")
  .attr("r", 10)
  .attr("fill", d => d.id === "Jordi" ? "#ef4444" : "#22c55e");

const label = svg.append("g")
  .selectAll("text")
  .data(nodes)
  .join("text")
  .text(d => d.id)
  .attr("font-size", 12)
  .attr("font-family", "sans-serif")
  .attr("fill", "#111827");

const simulation = d3.forceSimulation(nodes)
  .force("link", d3.forceLink(links).id(d => d.id).distance(120))
  .force("charge", d3.forceManyBody().strength(-250))
  .force("center", d3.forceCenter(width / 2, height / 2))
  .on("tick", ticked);

function ticked() {
  link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);

  node
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);

  label
    .attr("x", d => d.x + 12)
    .attr("y", d => d.y + 4);
}

function drag(simulation) {
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x; d.fy = d.y;
  }
  function dragged(event, d) { d.fx = event.x; d.fy = event.y; }
  function dragended(event, d) { if (!event.active) simulation.alphaTarget(0); d.fx = null; d.fy = null; }
  return d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended);
}

// habilitar drag
node.call(drag(simulation));
