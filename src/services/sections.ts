import type { Section } from '../types/section';
import api from './axios';

export const getSections = (categoryName = '', limit = 1000) =>
  api.get(`/products/v1/categories?categoryName=${categoryName}&limit=${limit}`);

export const createSection = (section: Section) =>
  api.post('/products/v1/categories', section);

export const updateSection = (section: Section) =>
  api.post('/products/v1/categories', section);

export const deleteSection = (id: number | string) =>
  api.delete(`/products/v1/categories/${id}`);

export const getBrands = () =>
  api.get('/master/v1/brands');

