import React from 'react'
import Header from '../components/Header'
import Nav from '../components/Nav'
import Category from '../components/Category'
import Hero from "../components/Hero";
import Products from '../components/Products';
import WhyChooseUs from '../components/WhyChooseUs';
import Footer from '../components/Footer';
export default function Home() {
  return (
    <div>
        
      <Nav/>
      <Header/>
      <Category/>
      <Hero/>
      <Products/>
      <WhyChooseUs/>
      <Footer/>
      
    </div>
  )
}
