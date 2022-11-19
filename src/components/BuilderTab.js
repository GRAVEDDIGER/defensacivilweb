import React, { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import BuilderNewPost from "./BuilderNewPost";

function BuilderTabs({ tabs, setTabs }) {
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <TabList
        sx={{ width: "100%" }}
        onChange={handleChange}
        aria-label="lab API tabs example"
      >
        {tabs.map((page) => (
          <Tab label={page.label} value={page.id} key={page.id} />
        ))}
      </TabList>
      <TabPanel value="1">
        <BuilderNewPost value={value} tabs={tabs} />
      </TabPanel>
      <TabPanel value="2">
        <BuilderNewPost value={value} tabs={tabs} />
      </TabPanel>
      <TabPanel value="3">Item Three</TabPanel>
    </TabContext>
  );
}

export default BuilderTabs;
