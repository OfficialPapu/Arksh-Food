import React from "react";
import UserDetailsComp from "@/Components/Admin/Users/UserDetails";
export const metadata = {
  title: 'User Detail - Arksh Food',
  description: 'View detailed information about a specific user on Arksh Food.',
};
const page = () => {
  return (
    <div>
      <UserDetailsComp />
    </div>
  );
};

export default page;
