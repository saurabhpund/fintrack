import React from 'react'
import { Routes, Route, useNavigate, redirect } from 'react-router-dom'
import Overview from './Overview'
import axios from 'axios';
import Header from '../../components/Header';
import Modal from '../../components/modal';
import Records from './Records';

const Dashboard = () => {

  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
    <section className='bg-gray-200 min-h-screen dark:bg-gray-700'>
    <Header setShowModal={setShowModal} />
    <Modal showModal={showModal} setShowModal={setShowModal} />
    <Overview />
        </section>
    </>
  )
}

export default Dashboard