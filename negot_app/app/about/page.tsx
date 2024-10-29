// about/page.tsx

import React from "react";

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-8">
        About Us
      </h1>
      
      <p className="text-lg  mb-6 text-primary">
        Negot AI is an innovative AI application designed to streamline the process of analyzing contracts. Using the power of artificial intelligence, Negot AI helps users quickly and accurately identify potential risks and opportunities within contracts of any kind, empowering businesses and individuals to make well-informed decisions.
      

     
        Our mission is to revolutionize the way contracts are analyzed, making it accessible, fast, and reliable for everyone. With Negot AI, we aim to provide comprehensive insights that allow users to unlock the full potential of their agreements, minimizing risks and maximizing opportunities.
      

    
        We understand that contracts can be complex and time-consuming to review. Negot AI leverages advanced AI technology to break down contracts into understandable components, providing insights that are essential for efficient and effective decision-making. By automating this process, we help save valuable time and resources, so you can focus on what matters most.
      
</p>
      <p className="text-lg text-primary">
        Have questions or want to learn more about how Negot AI can support your contract management needs? Feel free to reach out to us at{" "}
        <a href="mailto:support@negot.ai" className="text-primary underline">
          support@negot.ai
        </a>. We’re here to help you get the most out of your contracts.
      </p>
    </div>
  );
}
