import React from 'react';
import BlogList from '../components/BlogList';
import { useNavigate } from 'react-router-dom';
import { HomeProps } from '../types';

const Home: React.FC<HomeProps> = () => {
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/post/${id}`);
  };

  return <BlogList onClick={(id: string) => handleClick(id)} />

};

export default Home;
