// privacy/page.tsx

import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl  font-extrabold tracking-tight sm:text-5xl text-transparent xl:text-6xl/none bg-clip-text bg-gradient-to-r from-primary to-secondary mb-10">
        Privacy Policy
      </h1>
      
      <p className="text-lg text-primary mb-6">
        At Negot AI, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines the types of information we collect, how we use it, and your rights in relation to your data.
      

     
        Negot AI collects personal information that you provide, such as your name, email address, and any additional data you input for contract analysis. We may also collect data automatically when you interact with our platform, including usage data and device information.
      
    
        We use your information to provide and improve our services. This includes analyzing contract data to identify risks and opportunities, personalizing user experience, enhancing platform functionality, and maintaining platform security.
    

      
        We implement robust security measures to safeguard your information. However, please note that no online platform is entirely secure. While we strive to protect your data, we cannot guarantee complete security.
  

      
        You have the right to access, correct, or delete your personal information. You can also opt-out of data collection and processing where applicable. To exercise these rights, please contact our support team.
   

        We may update this Privacy Policy periodically to reflect changes in our practices or for legal reasons. Please review this page regularly to stay informed of any updates.
      </p>

      <p className="text-lg text-priamry">
        If you have any questions about this Privacy Policy or our data practices, please reach out to us at{" "}
        <a href="mailto:support@negot.ai" className="text-primary underline">
          support@negot.ai
        </a>.
      </p>
    </div>
  );
}
