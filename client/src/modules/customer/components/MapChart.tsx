import React, { useEffect, useState, memo } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps";

const geoUrl = "/features.json";
const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#ffedea" as unknown as number, "#ff5233" as unknown as number]);

const MapChart = ({
  setTooltipContent,
}: {
  setTooltipContent: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [data, setData] = useState<any>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    csv(`/heatmap1.csv`).then((data) => {
      setData(data);
    });
  }, []);

  // console.log(131 - count)

  return (
    <div data-tip="" style={{ "marginTop": "-8rem"}}>
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147,
        }}
      >
        <Sphere stroke="#E4E5E6" strokeWidth={0.5} id={""} fill={"white"} />
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
        {data.length > 0 && (
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                // console.log(geo.properties.name)
                const d = data.find((s: any) => {
                  // console.log(s.Country)
                  return (
                    s.Country === geo.properties.name &&
                    s["food avg"] !== "#DIV/0!"
                  );
                });

                if (!d) {
                  // console.log(geo.properties.name);
                } else {
                  setCount(count + 1);
                }
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={
                      d
                        ? colorScale(Number(d["food avg"])).toString()
                        : "#F5F4F6"
                    }
                    onMouseEnter={() => {
                      d &&
                        setTooltipContent(
                          `country: ${d.Country}  <br />
                          CPI inflation: ${
                            Math.round(Number(d["food avg"]) * 10) / 10
                          }`
                        );
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    style={{
                      hover: {
                        fill: d ? "#F53" : "#F5F4F6",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        )}
      </ComposableMap>
    </div>
  );
};

export default memo(MapChart);
