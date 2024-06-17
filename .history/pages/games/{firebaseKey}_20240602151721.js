import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleReview } from '../../../api/reviewData.js';
import AddAReviewForm from '../../../components/forms/addAReviewForm.js';

export default function EditGame() {
  const [editGame, setEditGame] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleReview(firebaseKey).then((data) => {
      setEditReview(data);
    });
  }, [firebaseKey]);

  return (
    firebaseKey ? <AddAReviewForm firebaseKey={firebaseKey} /> : 'Loading...'
  );
}
