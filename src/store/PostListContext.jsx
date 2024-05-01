import { createContext, useReducer } from "react";

export const PostListContext = createContext({
  postList: [],
  addPost: () => {},
  addInitialPosts: () => {},
  deletePost: () => {},
});

const postListReducer = (curPostList, action) => {
  let newPostList = curPostList;
  if(action.type === 'DELETE_POST'){
    newPostList = curPostList.filter((post) => post.id !== action.payload.postId)
  }
  else if(action.type === 'ADD_POST'){
    newPostList = [action.payload, ...curPostList];
  }
  else if(action.type === 'ADD_INITIAL_POST'){
    newPostList = action.payload.posts;
  }
  return newPostList;
}

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer,[]);

  const addPost = (post) => {
    dispatchPostList({
      type: "ADD_POST",
      payload: post,
    })
  };

  const addInitialPosts = (posts) => {
    dispatchPostList({
      type: "ADD_INITIAL_POST",
      payload: {
        posts,
      }
    })
  };

  const deletePost = (postId) => {
    dispatchPostList({
      type: "DELETE_POST",
      payload: {
        postId,
      },
    });
  };

  return (
    <PostListContext.Provider value={{
      postList,
      addPost,
      addInitialPosts,
      deletePost,
    }}>{children}</PostListContext.Provider>
  );
};

// const DEFAULT_POST_LIST = [
//   {
//     id: '1',
//     title: 'Alibag Diaries',
//     body: 'Hello friends, I going to Alibag for the New year Celebrations.',
//     reactions: 2,
//     userId: 'user-9',
//     tags: ['party','enjoy','new_year']
//   },
//   {
//     id: '2',
//     title: 'Diploma Completed',
//     body: 'Hello friends, I recently completed my Diploma in Computer Engineering from DBATU, University Lonere with an pointer of 9.58',
//     reactions: 10,
//     userId: 'user-2',
//     tags: ['diploma','graduated','result']
//   }
// ]

export default PostListProvider;