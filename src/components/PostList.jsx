import { useContext, useEffect, useState } from "react"
import Post from "./Post"
import { PostListContext } from "../store/PostListContext"
import Blank from "./Blank";
import Loader from "./Loader";

const PostList = () => {
  const { postList, addInitialPosts } = useContext(PostListContext);
  const [fetching, setFetching] = useState(false);
  /*useEffect(() => {
    setFetching(true);
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("https://dummyjson.com/posts", {signal})
    .then((res) => res.json())
    .then((data) => {
      addInitialPosts(data.posts);
      setFetching(false);
    });
    return () => {
      controller.abort();
    }
  },[])*/

  return (
    <>
      {fetching && <Loader />}
      {!fetching && postList.length === 0 && <Blank />}
      {!fetching && postList.map((post) => <Post key={post.id} post={post} />)}
    </>
  );
};

export default PostList