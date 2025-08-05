import axios from 'axios';

const BASE_URL = 'https://gomowebb.com/headless-poc/wp-json/wp/v2';

// 👉 Generic fetcher
const fetch = (url, params = {}) => axios.get(`${BASE_URL}/${url}`, { params }).then(res => res.data);

// ✅ Pages
export const getPageBySlug = (slug) => fetch('pages', { slug }); 

// ✅ Posts
export const getAllPosts = () => fetch('posts');
export const getPostBySlug = (slug) => fetch('posts', { slug });

// ✅ Categories (if needed)
export const getCategories = () => fetch('categories');

// ✅ Case Studies
export const getAllCaseStudies = () => fetch('case-study');
export const getCaseStudyBySlug = (slug) => fetch('case-study', { slug });

// ✅ Services
export const getAllServices = () => fetch('service');
export const getServiceBySlug = (slug) => fetch('service', { slug });

// Menu
export const getMenuItems = () => axios.get('https://gomowebb.com/headless-poc/wp-json/myroutes/menu').then(res => res.data || []);

// Contact Form
export const submitContactForm = (formData) =>
  axios.post('https://gomowebb.com/headless-poc/wp-json/contact-form-7/v1/contact-forms/123/feedback', formData);

export const getPageWithACF = async (slug) => {
  const pages = await fetch('pages', { slug });
  const page = pages[0];

  return {
    id: page.id,
    title: page.title?.rendered,
    content: page.content?.rendered,
    acf: page.acf || {} // Safe fallback if ACF plugin/fields not exposed
  };
};

export const getPageWithYoast = async (slug) => {
  const res = await fetch('pages', { slug });
  const page = res[0];
  return {
    id: page.id,
    title: page.title?.rendered,
    content: page.content?.rendered,
    acf: page.acf || {},
    yoast: page.yoast_head_json || {}
  };
};
