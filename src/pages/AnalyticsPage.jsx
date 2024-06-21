import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../services/operations/post";
import CategoryData from "../components/charts/CategoryGraph";
import CommentData from "../components/charts/CommentData";
import Sidebar from "../components/comman/Sidebar";
import LoadingSpinner from "../components/comman/Spinner";
// import DataTableComponent from "../components/charts/DataTableComponent";

const Analytics = () => {
  const dispatch = useDispatch();
  const svgRef = useRef();
  const { post, loading } = useSelector((state) => state.post);

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

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    x.domain(categoryData.map((d) => d.category));
    y.domain([0, d3.max(categoryData, (d) => d.count)]);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},${height + margin.top})`)
      .call(xAxis);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .call(yAxis);

    svg
      .selectAll(".bar")
      .data(categoryData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => margin.left + x(d.category))
      .attr("y", (d) => margin.top + y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.count));
  }, [post]);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <>
      {post.length > 0 ? (
        <div className="flex ">
          <Sidebar />
          <div className=" w-screen mx-auto mt-1 p-2 ">
            {/* <h1 className="text-2xl font-semibold mb-4">Dashboard</h1> */}
            <div className=" p-4 rounded-lg ">
              {/* Main content goes here */}
              <p className="pl-16 py-4 text-3xl mb-10 font-bold transform transition-transform duration-300 hover:scale-105 shadow-lg float-animation bg-gradient-to-r from-gray-600 via-gray-300 to-white bg-clip-text text-transparent">
                Basic Blog Statistics
              </p>

              <div className="flex pt-10 max-sm:flex-col">
                <CategoryData post={post} />

                <CommentData post={post} />
              </div>
              {/* <DataTableComponent data={post} /> */}
            </div>

            <hr></hr>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default Analytics;
