import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const PostButton = ({classname, name, onClickFunc}:any) => {

  const router = useRouter();

  return (
    <Button 
        variant="default" 
        className={`bg-[#1B8CD8] rounded-3xl ${classname} hover:bg-[#3598db]`}
        onClick={onClickFunc}
      >
      {name}
    </Button>
  );
};

export default PostButton;
