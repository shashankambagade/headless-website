import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

const ReactCForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [captchaToken, setCaptchaToken] = useState('');
  const [status, setStatus] = useState(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    recipient: '',
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: '',
    gclid: '',
  });

  const recipients = {
    sales: 'veeraj.j@gomogroup.com',
    support: 'shashank.a@gomogroup.com',
    inquiry: 'veeraj.j@gomogroup.com',
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    setForm((prev) => ({
      ...prev,
      utm_source: query.get('utm_source') || '',
      utm_medium: query.get('utm_medium') || '',
      utm_campaign: query.get('utm_campaign') || '',
      utm_term: query.get('utm_term') || '',
      utm_content: query.get('utm_content') || '',
      gclid: query.get('gclid') || '',
    }));
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    if (!captchaToken) {
      alert('Please complete the reCAPTCHA.');
      setStatus('error');
      return;
    }

    try {
      await axios.post('/api/send-email', {
        ...form,
        recipient: recipients[form.recipient],
        captchaToken, // ✅ send token to backend
      });

      navigate('/thank-you');
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto p-6 bg-white rounded shadow">
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full border p-2 rounded" />

      <select name="recipient" value={form.recipient} onChange={handleChange} required className="w-full border p-2 rounded">
        <option value="">Select recipient</option>
        <option value="sales">Sales</option>
        <option value="support">Tech Support</option>
        <option value="inquiry">General Inquiry</option>
      </select>

      <input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} required className="w-full border p-2 rounded" />
      <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required className="w-full border p-2 rounded" />

      {/* Hidden UTM + gclid fields */}
      <input type="hidden" name="utm_source" value={form.utm_source} />
      <input type="hidden" name="utm_medium" value={form.utm_medium} />
      <input type="hidden" name="utm_campaign" value={form.utm_campaign} />
      <input type="hidden" name="utm_term" value={form.utm_term} />
      <input type="hidden" name="utm_content" value={form.utm_content} />
      <input type="hidden" name="gclid" value={form.gclid} />

      {/* ✅ reCAPTCHA Widget */}
      <ReCAPTCHA
        sitekey="6LcCQ5MrAAAAAHcHDIAeKK8ji7Es3jmBbP4o6NyB" // ⛳ Replace with your real reCAPTCHA v2 site key
        onChange={(token) => setCaptchaToken(token)}
        className="my-4"
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {status === 'submitting' ? 'Sending...' : 'Send'}
      </button>

      {status === 'error' && <p className="text-red-600">❌ Something went wrong.</p>}
    </form>
  );
};

export default ReactCForm;
