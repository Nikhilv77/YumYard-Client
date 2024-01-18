import React from "react";

const BlogContent = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default BlogContent;
