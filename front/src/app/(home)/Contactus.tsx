'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Menu, MenuItem, Typography, Divider, Box, Container } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { FaCheck } from 'react-icons/fa';
import Image from 'next/image';
import axios from 'axios';

const ContactUs = () => {
  const [language, setLanguage] = useState('English');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isSent, setIsSent] = useState(false);
  const [email, setEmail] = useState('');
  const [reviews, setReviews] = useState([]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (lang: string) => {
    setLanguage(lang);
    setAnchorEl(null);
  };
  const handleClickflech = () => {
    const newReview = {
      id: Date.now(),
      email,
      body: 'This is a fake review'
    };
  
    const existingReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    const updatedReviews = [newReview, ...existingReviews];
  
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
  
    setIsSent(true);
    setEmail('');
  };
  
  
  useEffect(() => {
    axios
      .post('https://jsonplaceholder.typicode.com/comments?_limit=10')
      .then((res) => setReviews(res.data))
      .catch((err) => console.error('Error fetching reviews:', err));
  }, []);
  
  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    setReviews(storedReviews);
  }, []);
  
  
  return (
    <Box id="contactus">
      <Container className="w-[1100px] h-[220px] rounded-3xl bg-gradient-to-r from-blue-700 to-colorGradient text-white p-14">
        <Box className="flex flex-col md:flex-row items-center justify-between gap-10 font-semibold">
          <Box className="flex-1 flex-col">
            <Typography variant="h5" className="text-4xl font-bold text-white">
              Have questions or need assistance?
            </Typography>
            <Typography variant="body1" className="text-2xl font-medium text-white mt-6">
              Get in touch with us, we're here to help
            </Typography>
            <Typography variant="body1" className="text-2xl font-medium text-white">
              you streamline your legal work.
            </Typography>
          </Box>
          <Box className="mb-5 bg-white text-black p-4 rounded-xl shadow-md flex flex-col items-center gap-4">
            <Typography variant="body1">📧 contact@yourwebsite.com</Typography>
            <Typography variant="body1">📞 +213 555 12 34 56</Typography>
          </Box>
        </Box>
      </Container>

      <Divider className="my-6 border-gray-300 w-full" />
      <Box className="flex flex-col md:flex-row justify-between items-center px-8 py-4 ml-32 w-full">
        <Button onClick={handleClick} className="capitalize text-gray-700 flex items-center">
          {language} <ExpandMore className="ml-2" />
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleClose(language)}>
          <MenuItem onClick={() => handleClose('English')}>English</MenuItem>
          <MenuItem onClick={() => handleClose('Arabic')}>العربية</MenuItem>
          <MenuItem onClick={() => handleClose('French')}>French</MenuItem>
          <MenuItem onClick={() => handleClose('Tamazight')}>القبايلية مكانش</MenuItem>
        </Menu>

        <Image
          src="/logo bold.png"
          alt="Advokat Logo"
          width={236}
          height={48}
          className="mr-60"
        />
      </Box>

      <Container className="flex flex-col text-gray-700 space-y-4 ml-32">
        <div className="flex justify-between">
          <div>
            <Link href="/reviews">
              <Typography className="hover:underline">See All Reviews</Typography>
            </Link>
            <Typography variant="body1" className="text-fotColor font-semibold">
              Leave a review
            </Typography>
            <Typography variant="body2" className="mt-5">
              Share your experience with us!
            </Typography>
            <Box className="flex space-x-2 mt-4 mb-5">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-emailColor border p-2 rounded-3xl w-60"
              />
              <Button
                onClick={handleClickflech}
                className={`rounded-3xl w-30 transition-all duration-300 ${
                  isSent ? 'bg-green-500' : 'bg-customGray'
                }`}
                variant="contained"
              >
                {isSent ? <FaCheck className="text-white text-lg" /> : 'Send'}
              </Button>
            </Box>
          </div>

          <div className="flex flex-col items-end text-balance mr-20">
            <ul className="space-y-4">
              <li><Link href="/" className="block hover:text-gray-400">About</Link></li>
              <li><a href="#pricing" className="block hover:text-gray-400">Pricing</a></li>
              <li><a href="#testimonials" className="block hover:text-gray-400">Testimonials</a></li>
              <li><a href="#contactus" className="block hover:text-gray-400">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <Divider className="my-6 border-gray-300 w-full" />
        <Box className="flex justify-between w-full">
          <Typography variant="body2" className="text-gray-500 cursor-pointer">Privacy Policy</Typography>
          <Typography variant="body2" className="text-gray-500 cursor-pointer">Terms of Service</Typography>
          <Typography variant="body2" className="text-gray-500 cursor-pointer">Cookie Policy</Typography>
          <Typography variant="body2" className="text-gray-500 cursor-pointer">© 2025 Advokat. All rights reserved</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactUs;
