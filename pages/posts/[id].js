// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { getSinglePost, deletePost } from '../../utils/data/postData';
// import { useAuth } from '../../utils/context/authContext';

// function ViewPost() {
//   const [postDeets, setPostDeets] = useState({});
//   const router = useRouter();

//   const { id } = router.query;

//   const getPostDeets = () => {
//     getSinglePost(id).then(setPostDeets);
//   };

//   useEffect(() => {
//     getPostDeets();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   const deleteThisPost = () => {
//     console.warn('Deleting post with ID:', id);
//     if (window.confirm('Delete Post?')) {
//       deletePost(id).then(() => {
//         router.push('/');
//       });
//     }
//   };

//   return (
//     <div>
//       {/* <h1>{postDeets.title}</h1>
//       <p>Author: {postDeets.rareuser}</p>
//       <p>{postDeets.content}</p>
//       <p>Reactions: {postDeets.reactions}</p>
//       <p>Tags: {postDeets.tags}</p>
//       <p>Category: {postDeets.category}</p>
//       view comments button? */}
//     </div>
//   );
// }

// export default ViewPost;
