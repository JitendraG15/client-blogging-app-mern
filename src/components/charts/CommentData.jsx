import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const CommentData = ({ post }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Clear previous render
    svg.selectAll("*").remove();

    // Data processing
    const commentsPerPost = {};

    post.forEach((post) => {
      commentsPerPost[post.title] = post.comments.length;
    });

    // Create bar chart for comments per post
    const commentsData = Object.entries(commentsPerPost).map(
      ([title, count]) => ({ title, count })
    );

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const x = d3.scaleBand().range([0, width]).padding(0.1);
    const y = d3.scaleLinear().range([height, 0]);
    const color = d3
      .scaleSequential(d3.interpolateBlues)
      .domain([0, d3.max(commentsData, (d) => d.count)]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y).tickFormat(d3.format("d")).ticks(5); // Set number of ticks

    x.domain(commentsData.map((d) => d.title));
    y.domain([0, d3.max(commentsData, (d) => d.count)]);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},${height + margin.top})`)
      .call(xAxis)
      .selectAll("text")
      .remove(); // Remove text labels from x-axis

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .call(yAxis);

    svg
      .selectAll(".bar")
      .data(commentsData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => margin.left + x(d.title))
      .attr("y", (d) => margin.top + y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.count))
      .attr("fill", (d) => color(d.count))
      .append("title")
      .text((d) => `${d.title}: ${d.count} comments`);
  }, [post]);

  return (
    <div className="mx-auto  ">
      <h1 className="text-2xl py-2 ">Number of Comments per Post</h1>
      <svg ref={svgRef} width={600} height={400}></svg>
    </div>
  );
};

export default CommentData;
