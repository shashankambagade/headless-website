import React from 'react';

const ThankYou = () => {
  return (<>
            <div className="h-[100px] w-full bg-black"></div> 
            <div className="min-h-screen flex items-center justify-center text-center">
              <div>
                <h1 className="text-3xl font-bold m-14">Thank You!</h1>
                <p>Your message has been sent successfully. We’ll get back to you shortly.</p>
              </div>
            </div>
            </>
  );
};

export default ThankYou;
