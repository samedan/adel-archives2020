import React, { useState } from "react";
import { Tab } from "semantic-ui-react";
import AboutTab from "./AboutTab";
import PhotosTab from "./PhotosTab";
import EventsTab from "./EventsTab";
import FollowingTab from "./FollowingTab";

export default function ProfileContent({ profile, isCurrentLoggedUser }) {
  const [activeTab, setActiveTab] = useState(0);

  const panes = [
    {
      menuItem: "About",
      render: () => (
        <AboutTab profile={profile} isCurrentLoggedUser={isCurrentLoggedUser} />
      ),
    },
    {
      menuItem: "Photos",
      render: () => (
        <PhotosTab
          profile={profile}
          isCurrentLoggedUser={isCurrentLoggedUser}
        />
      ),
    },
    {
      menuItem: "Events",
      render: () => <EventsTab profile={profile} />,
    },
    {
      menuItem: "Followers",
      render: () => (
        <FollowingTab
          key={profile.id}
          profile={profile}
          activeTab={activeTab}
        />
      ),
    },
    {
      menuItem: "Following",
      render: () => (
        <FollowingTab
          key={profile.id}
          profile={profile}
          activeTab={activeTab}
        />
      ),
    },
  ];

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
      // activeIndex={1}
      onTabChange={(e, data) => setActiveTab(data.activeIndex)}
    />
  );
}
