
// js/app1.js


function initChart1(selector) {
  const width = 800, height = 500;
  const margin = { top: 30, right: 30, bottom: 40, left: 50 };


// Dades d'exemple
const data = [
  { categoria: "A", valor: 12 },
  { categoria: "B", valor: 23 },
  { categoria: "C", valor: 8 },
  { categoria: "D", valor: 17 },
  { categoria: "E", valor: 30 }
];

// Mides bàsiques
const width = 800;
const height = 400;
const margin = { top: 20, right: 20, bottom: 40, left: 50 };

// Crear SVG al SEGON contenidor (#chart2)
const svg = d3.select(selector)
  .append("svg")
  .attr("viewBox", `0 0 ${width} ${height}`)
  .attr("preserveAspectRatio", "xMidYMid meet");

// Escales
const x = d3.scaleBand()
  .domain(data.map(d => d.categoria))
  .range([margin.left, width - margin.right])
  .padding(0.2);

const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.valor)]).nice()
  .range([height - margin.bottom, margin.top]);

// Eixos
const xAxis = g => g
  .attr("transform", `translate(0, ${height - margin.bottom})`)
  .call(d3.axisBottom(x));

const yAxis = g => g
  .attr("transform", `translate(${margin.left}, 0)`)
  .call(d3.axisLeft(y));

// Dibuixar barres
svg.append("g")
  .selectAll("rect")
  .data(data)
  .join("rect")
  .attr("x", d => x(d.categoria))
  .attr("y", d => y(d.valor))
  .attr("width", x.bandwidth())
  .attr("height", d => y(0) - y(d.valor))
  .attr("fill", "#3b82f6")
  .on("mouseenter", function (event, d) {
    d3.select(this).attr("fill", "#1d4ed8");
    tooltip
      .style("opacity", 1)
      .html(`<strong>${d.categoria}</strong>: ${d.valor}`)
      .style("left", (event.pageX + 8) + "px")
      .style("top", (event.pageY - 24) + "px");
  })
  .on("mousemove", function (event) {
    tooltip
      .style("left", (event.pageX + 8) + "px")
      .style("top", (event.pageY - 24) + "px");
  })
  .on("mouseleave", function () {
    d3.select(this).attr("fill", "#3b82f6");
    tooltip.style("opacity", 0);
  });

// Afegir eixos
svg.append("g").attr("class", "axis").call(xAxis);
svg.append("g").attr("class", "axis").call(yAxis);

// Tooltip simple (HTML)
const tooltip = d3.select("body")
  .append("div")
  .style("position", "absolute")
  .style("pointer-events", "none")
  .style("background", "#111827")
  .style("color", "#fff")
  .style("padding", "6px 8px")
  .style("border-radius", "6px")
  .style("font-size", "12px")
  .style("opacity", 0);

document.addEventListener("DOMContentLoaded", () => {
  initChart2("#chart2");
});
