import ReactCForm from '../components/form/ReactCForm';

const ContactUs = () => {
  return (
    <>
      <div className="h-[100px] w-full bg-black"></div> 
        <div className="py-12 px-6">
          <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
          <ReactCForm />
        </div>
    </>
  );
};

export default ContactUs;
