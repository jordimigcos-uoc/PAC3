
// Carregar el CSV i preparar les dades
d3.csv("data/hotel_bookings_clean.csv").then(rawData => {
  
   // Agrupar per any i mes
  const grouped = d3.rollup(
    rawData,
    v => v.length, // compta reserves
    d => d.arrival_date_year,
    d => d.arrival_date_month
  );

  // Ordre correcte dels mesos
  const monthOrder = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  // Convertir a array pla amb format {label: "YYYY-MMM", total_reserves: X}
  const formattedData = [];
  for (const [year, months] of grouped) {
    for (const month of monthOrder) {
      if (months.has(month)) {
        formattedData.push({
          label: `${year}-${month.substring(0,3)}`,
          total_reserves: months.get(month)
        });
      }
    }
  }

  // Ordenar per any i mes
  formattedData.sort((a, b) => {
    const [yearA, monthA] = a.label.split("-");
    const [yearB, monthB] = b.label.split("-");
    return yearA - yearB || monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);
  });

  // Cridar la funció que dibuixa la gràfica
  drawChart(formattedData);
});
