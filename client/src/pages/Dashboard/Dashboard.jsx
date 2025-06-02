import React from 'react'
import { Routes, Route, useNavigate, redirect } from 'react-router-dom'
import Overview from './Overview'
import axios from 'axios';
import Header from '../../components/Header';
import Records from './Records';
import useSetTitle from '../../hook/useSetTitle';

const Dashboard = () => {

  useSetTitle({ title: "Dashboard - Finance Tracker" });

  return (
    <>
    <section className='bg-gray-200 min-h-screen dark:bg-gray-700'>
    <Header />
    <Overview />
        </section>
    </>
  )
}

export default Dashboard