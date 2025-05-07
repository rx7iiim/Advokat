'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    setReviews(storedReviews);
  }, []);
  

  return (
    <Box className="p-8">
      <Typography variant="h4" className="mb-6 font-bold">
        User Reviews
      </Typography>
      <div className="space-y-4">
        {reviews.map((review) => (
          <Box key={review.id} className="bg-gray-100 p-4 rounded-xl">
            <Typography className="font-semibold">{review.email}</Typography>
            <Typography className="text-sm text-gray-600">{review.body}</Typography>
          </Box>
        ))}
      </div>
    </Box>
  );
};

export default ReviewsPage;
