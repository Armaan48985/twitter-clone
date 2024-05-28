import React from "react";
import { Button } from "../ui/button";

const PostButton = ({classname, name}:any) => {
  return (
    <Button variant="default" className={`bg-[#1B8CD8] rounded-3xl ${classname} hover:bg-[#3598db]`}>
      {name}
    </Button>
  );
};

export default PostButton;
