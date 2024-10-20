import React, { useEffect, useRef } from "react";

const TableauDashboard = () => {
  const dashboardRef = useRef(null);

  useEffect(() => {
    const divElement = dashboardRef.current;
    const vizElement = divElement.getElementsByTagName("object")[0];

    // Set styles for full screen
    vizElement.style.width = "100%";
    vizElement.style.height = "100vh"; // Full viewport height

    const scriptElement = document.createElement("script");
    scriptElement.src = "https://public.tableau.com/javascripts/api/viz_v1.js";
    vizElement.parentNode.insertBefore(scriptElement, vizElement);
  }, []);

  return (
    <div
      className="tableauPlaceholder"
      id="viz1729399092054"
      ref={dashboardRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh", // Full viewport height
      }}
    >
      <noscript>
        <a href="#">
          <img
            alt="Dashboard 1"
            src="https://public.tableau.com/static/images/Bo/Book1_17293990532010/Dashboard1/1_rss.png"
            style={{ border: "none" }}
          />
        </a>
      </noscript>
      <object className="tableauViz" style={{ display: "none" }}>
        <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
        <param name="embed_code_version" value="3" />
        <param name="site_root" value="" />
        <param name="name" value="Book1_17293990532010/Dashboard1" />
        <param name="tabs" value="no" />
        <param name="toolbar" value="yes" />
        <param
          name="static_image"
          value="https://public.tableau.com/static/images/Bo/Book1_17293990532010/Dashboard1/1.png"
        />
        <param name="animate_transition" value="yes" />
        <param name="display_static_image" value="yes" />
        <param name="display_spinner" value="yes" />
        <param name="display_overlay" value="yes" />
        <param name="display_count" value="yes" />
        <param name="language" value="en-US" />
        <param name="filter" value="publish=yes" />
      </object>
    </div>
  );
};

export default TableauDashboard;
