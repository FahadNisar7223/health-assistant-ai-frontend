'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import doc3 from "../../assests/doc3.jpg"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {  Nut, BriefcaseMedical } from "lucide-react"
import { useRouter } from 'next/navigation'

const Home: React.FC = () => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push('/chatbot'); 
  };


 
  const handleNutritionNavigation = () => {
    router.push('/healthform');
  };

 
  return (
    <div className="min-h-screen bg-purple-50">
    <div className="relative w-full h-[400px]">
      <Image
        src={doc3}
        alt="Doctor with patient"
        layout="fill"
        objectFit="cover"
        className="opacity-60"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10">
        <h1 className="text-4xl font-bold text-purple-800 mb-4">Health Mate AI</h1>
        <p className="text-purple-700 mb-6">Experience personalized health insights and guidance with your AI-powered assistant. Get smarter, faster care at your fingertips, anytime, anywhere.</p>
        <div className="flex space-x-4 mt-4 gap-4">
  </div>
      </div>
  
    </div>
  
    <div className="container mx-auto px-12 py-8">
     
      <div className="grid md:grid-cols-2 mb-4  justify-center">
        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }} className="max-w-lg mx-auto">
          <Card className="bg-purple-600 text-white hover:bg-purple-700  transition-colors duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BriefcaseMedical className="mr-2" />
                Find Your Specialist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Easily check which doctors are available based on your health needs. Get matched with the right specialists and book appointments instantly.</p>
            </CardContent>
            <CardFooter>
          
                  <Button variant="secondary" className="w-full hover:bg-purple-200 transition-colors duration-300" onClick={handleNavigation}>Find a Doctor</Button>
              
            </CardFooter>
          </Card>
        </motion.div>
  
        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }} className="max-w-lg mx-auto">
          <Card className="bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Nut className="mr-2" />
                Personalized Nutrition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Discover a tailored nutrition plan designed just for you. Achieve your health goals with expert guidance from our AI-powered diet assistant.</p>
            </CardContent>
            <CardFooter>
            
                  <Button variant="secondary" className="w-full hover:bg-purple-200 transition-colors duration-300" onClick={handleNutritionNavigation}>Get Your Diet Plan</Button>
               
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  </div>
  

  )
}

export default Home;
