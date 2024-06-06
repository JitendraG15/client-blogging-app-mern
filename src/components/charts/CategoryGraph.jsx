import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const CategoryData = ({ post }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Clear previous render
    svg.selectAll("*").remove();

    // Data processing
    const categories = {};

    post.forEach((post) => {
      const categoryName = post.category.categoryName;
      if (categories[categoryName]) {
        categories[categoryName]++;
      } else {
        categories[categoryName] = 1;
      }
    });

    // Create bar chart for categories
    const categoryData = Object.entries(categories).map(
      ([category, count]) => ({ category, count })
    );

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const x = d3.scaleBand().range([0, width]).padding(0.1);
    const y = d3.scaleLinear().range([height, 0]);
    const color = d3
      .scaleSequential(d3.interpolateBlues)
      .domain([0, d3.max(categoryData, (d) => d.count)]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y).tickFormat(d3.format("d")).ticks(5); // Set number of ticks

    x.domain(categoryData.map((d) => d.category));
    y.domain([0, d3.max(categoryData, (d) => d.count)]);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},${height + margin.top})`)
      .call(xAxis)
      .attr("aria-hidden", "true");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .call(yAxis)
      .attr("aria-hidden", "true");

    svg
      .selectAll(".bar")
      .data(categoryData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => margin.left + x(d.category))
      .attr("y", (d) => margin.top + y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.count))
      .attr("fill", (d) => color(d.count));
  }, [post]);

  return (
    <div className="mx-auto flex flex-col items-start" role="img" aria-label="Bar chart showing number of posts per category">
      <svg ref={svgRef} width={600} height={400} aria-hidden="true"></svg>
      <h1 className="text-lg py-2 px-10" id="chart-title"><strong>Fig:</strong> Number of Posts per Category</h1>
    </div>
  );
};

export default CategoryData;
